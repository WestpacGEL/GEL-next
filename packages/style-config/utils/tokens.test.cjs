const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');
const postcss = require('postcss');

const packageRoot = path.resolve(__dirname, '..');
const brands = require('../src/constants/brands.json');

function declarations(css, selector) {
  const values = {};
  postcss.parse(css).walkRules(rule => {
    if (rule.selector === selector) {
      rule.walkDecls(declaration => {
        values[declaration.prop] = declaration.value;
      });
    }
  });
  return values;
}

function resources(xml, tag) {
  const entries = [...xml.matchAll(new RegExp(`<${tag} name="([^"]+)">([^<]+)</${tag}>`, 'g'))];
  const values = Object.fromEntries(entries.map(([, name, value]) => [name, value]));
  assert.equal(Object.keys(values).length, entries.length, 'resource names must be unique');
  return values;
}

function swiftMembers(swift, enumName) {
  const body = swift.match(new RegExp(`public enum ${enumName} \\{([^}]+)\\}`))?.[1];
  assert.ok(body, `missing populated enum ${enumName}`);
  const entries = [...body.matchAll(/public static let (\w+) = ([^\n]+)/g)];
  const values = Object.fromEntries(entries.map(([, name, value]) => [name, value.trim()]));
  assert.equal(Object.keys(values).length, entries.length, 'Swift members must be unique');
  return values;
}

test('generates brand-specific light and opt-in dark tokens for web and native consumers', t => {
  // Generate from source in an empty output tree, so stale checked-in files cannot make this pass.
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'gel-tokens-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.cpSync(path.join(packageRoot, 'utils'), path.join(root, 'utils'), { recursive: true });
  fs.cpSync(path.join(packageRoot, 'src/constants'), path.join(root, 'src/constants'), { recursive: true });
  fs.symlinkSync(path.join(packageRoot, 'node_modules'), path.join(root, 'node_modules'), 'junction');
  for (const directory of ['src/tokens', 'src/css/themes', 'src/css/shared']) {
    fs.mkdirSync(path.join(root, directory), { recursive: true });
  }
  const input = JSON.parse(fs.readFileSync(path.join(packageRoot, 'src/tokens/GEL-tokens-figma.json'), 'utf8'));
  const sourceModes = input.find(section => section.Tokens).Tokens.modes;
  const primitives = input.find(section => section.Primitives).Primitives;
  // Real radii currently match across modes. Make the fixture asymmetric to catch light-only dimensions.
  sourceModes.Westpac['dark-mode'].border.radius['rounded-md'].$value = '{border.radius.8px}';
  fs.writeFileSync(path.join(root, 'src/tokens/GEL-tokens-figma.json'), JSON.stringify(input));
  for (const script of ['style-dictionary.cjs', 'css.cjs']) {
    execFileSync(process.execPath, [path.join(root, 'utils/transformers', script)], { cwd: root, stdio: 'pipe' });
  }
  const read = file => fs.readFileSync(path.join(root, 'src', file), 'utf8');
  const resolve = token => {
    const reference = token.$value.replace(/^\{(?:Primitives\.)?|\}$/g, '');
    return reference.split('.').reduce((value, key) => value[key], primitives).$value;
  };
  const allBrands = JSON.parse(read('tokens/w3c/all-brands.json'));

  for (const { themeName, brandCode: brand } of brands) {
    const enumName = brand.toUpperCase();
    const w3c = JSON.parse(read(`tokens/w3c/${brand}.json`));
    const theme = read(`css/themes/theme-${brand}.css`);
    const standalone = read(`tokens/css/${brand}/style.css`);
    const allCSS = read('tokens/css/all-brands/vars.css');
    const swift = read(`tokens/ios/${brand}/${brand}-colors.swift`);
    const dimensions = read(`tokens/ios/${brand}/${brand}-dimensions.swift`);
    const dayColors = resources(read(`tokens/android/${brand}/values/${brand}_colors.xml`), 'color');
    const nightColors = resources(read(`tokens/android/${brand}/values-night/${brand}_colors.xml`), 'color');
    const dayDimensions = resources(read(`tokens/android/${brand}/values/${brand}_dimens.xml`), 'dimen');
    const nightDimensions = resources(read(`tokens/android/${brand}/values-night/${brand}_dimens.xml`), 'dimen');
    assert.deepEqual(Object.keys(dayColors), Object.keys(nightColors));
    assert.deepEqual(Object.keys(dayDimensions), Object.keys(nightDimensions));
    assert.deepEqual(
      Object.keys(swiftMembers(swift, `${enumName}LightColors`)),
      Object.keys(swiftMembers(swift, `${enumName}DarkColors`)),
    );

    for (const mode of ['light', 'dark']) {
      const source = sourceModes[themeName][`${mode}-mode`];
      const nativeColors = mode === 'light' ? dayColors : nightColors;
      const nativeDimensions = mode === 'light' ? dayDimensions : nightDimensions;
      const swiftMode = mode === 'light' ? 'Light' : 'Dark';
      const members = swiftMembers(swift, `${enumName}${swiftMode}Colors`);
      const radii = swiftMembers(dimensions, `${enumName}${swiftMode}Dimensions`);
      const selector = `[data-brand="${brand}"]${mode === 'dark' ? '[data-theme="dark"]' : ''}`;
      assert.deepEqual(w3c.Tokens[`${mode}-mode`], allBrands.Tokens[themeName][`${mode}-mode`]);
      assert.equal(
        Object.keys(nativeColors).length,
        Object.values(source.color).flatMap(group => Object.keys(group)).length,
      );
      assert.equal(Object.keys(nativeDimensions).length, Object.keys(source.border.radius).length);
      assert.equal(Object.keys(members).length, Object.keys(nativeColors).length);

      // Android's alpha byte precedes RGB, unlike CSS #RRGGBBAA.
      const opacity = resolve(source.color.data['data-a-opacity']).toLowerCase();
      assert.match(opacity, /^#[0-9a-f]{8}$/);
      assert.equal(nativeColors[`${brand}DataAOpacity`], `#${opacity.slice(7)}${opacity.slice(1, 7)}`);

      // Neutral, hero and focus tokens catch swapped brands or modes.
      for (const [group, name] of [
        ['background', 'background-white'],
        ['background', 'background-hero'],
        ['border', 'border-focus'],
      ]) {
        const expected = resolve(source.color[group][name]).toLowerCase();
        const nativeName = name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        assert.equal(
          nativeColors[brand + nativeName[0].toUpperCase() + nativeName.slice(1)],
          `#ff${expected.slice(1)}`,
        );
        const channels = expected
          .slice(1)
          .match(/../g)
          .map(hex => parseInt(hex, 16) / 255);
        const actualChannels = [...members[nativeName].matchAll(/(?:red|green|blue): ([\d.]+)/g)].map(match =>
          Number(match[1]),
        );
        assert.equal(actualChannels.length, 3);
        channels.forEach((channel, index) => assert.ok(Math.abs(channel - actualChannels[index]) < 0.00051));

        for (const css of [theme, standalone, allCSS]) {
          assert.doesNotMatch(css, /prefers-color-scheme/);
          const scoped = declarations(css, selector);
          const globals = {
            ...declarations(css, ':root, :host'),
            ...declarations(css, `[data-brand="${brand}"]`),
            ...scoped,
          };
          const value = scoped[`--${css === theme ? '' : 'color-'}${name}`];
          assert.ok(value, `${brand} ${mode}: missing CSS ${name}`);
          const resolved = value.replace(/var\((--[^)]+)\)/g, (_, property) => globals[property]);
          assert.equal(resolved.toLowerCase(), expected);
        }
      }

      const expectedRadius = resolve(source.border.radius['rounded-md']);
      assert.equal(nativeDimensions[`${brand}BorderRoundedMd`], `${expectedRadius}dp`);
      assert.equal(Number(radii.BorderRoundedMd), expectedRadius);
    }
  }
});
