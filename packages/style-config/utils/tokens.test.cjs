const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const packageRoot = path.resolve(__dirname, '..');
const brands = require('../src/constants/brands.json');

test('exports Android colours with alpha first in both per-brand and combined resources', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'gel-android-opacity-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.cpSync(path.join(packageRoot, 'utils/transformers'), path.join(root, 'utils/transformers'), { recursive: true });
  fs.cpSync(path.join(packageRoot, 'src/constants'), path.join(root, 'src/constants'), { recursive: true });
  fs.symlinkSync(path.join(packageRoot, 'node_modules'), path.join(root, 'node_modules'), 'junction');
  fs.mkdirSync(path.join(root, 'src/tokens'), { recursive: true });
  const input = JSON.parse(fs.readFileSync(path.join(packageRoot, 'src/tokens/GEL-tokens-figma.json'), 'utf8'));
  const primitives = input.find(section => section.Primitives).Primitives;
  // Exercise zero alpha and distinct channels as well as the real translucent colours.
  primitives.color['WBC 26'].pop[500].$value = '#12345600';
  primitives.color['WBC 26'].hero[500].$value = '#990000ff';
  fs.writeFileSync(path.join(root, 'src/tokens/GEL-tokens-figma.json'), JSON.stringify(input));
  execFileSync(process.execPath, [path.join(root, 'utils/transformers/style-dictionary.cjs')], {
    cwd: root,
    stdio: 'pipe',
  });

  const readColors = file => {
    const xml = fs.readFileSync(path.join(root, 'src/tokens/android', file), 'utf8');
    const entries = [...xml.matchAll(/<color name="([^"]+)">([^<]+)<\/color>/g)];
    const values = Object.fromEntries(entries.map(([, name, value]) => [name, value.toLowerCase()]));
    assert.equal(Object.keys(values).length, entries.length, 'resource names must be unique');
    return values;
  };
  const combined = readColors('all-brands/all-colors.xml');
  const wbc26 = readColors('wbc26/values/wbc26_colors.xml');
  assert.equal(wbc26.wbc26DataAOpacity, '#4dff2529');
  assert.equal(combined.westpac2026LightModeDataAOpacity, '#4dff2529');
  const source = input.find(section => section.Tokens).Tokens.modes;
  for (const { themeName, brandCode } of brands) {
    const colors = readColors(`${brandCode}/values/${brandCode}_colors.xml`);
    const tokens = Object.values(source[themeName]['light-mode'].color).flatMap(group => Object.entries(group));
    assert.equal(Object.keys(colors).length, tokens.length);
    for (const [name, token] of tokens) {
      const reference = token.$value.replace(/^\{(?:Primitives\.)?|\}$/g, '');
      const rgba = reference
        .split('.')
        .reduce((value, key) => value[key], primitives)
        .$value.toLowerCase();
      const alpha = rgba.length === 9 ? rgba.slice(7) : 'ff';
      const expected = `#${alpha === 'ff' ? '' : alpha}${rgba.slice(1, 7)}`;
      const suffix = name.replace(/(^|-)([a-z])/g, (_, separator, letter) => letter.toUpperCase());
      assert.equal(colors[brandCode + suffix], expected, `${brandCode} ${name}`);
    }
  }

  // Fixed expectations also guard the two transform configurations independently.
  for (const [suffix, expected] of Object.entries({
    DataBOpacity: '#4d600000',
    DataCOpacity: '#4d990000',
    DataDOpacity: '#4d991ad6',
    DataEOpacity: '#80eb4fd5',
    DataFOpacity: '#4d60a2ff',
    DataASolid: '#00123456',
    BorderHero: '#990000',
    BackgroundWhite: '#ffffff',
  })) {
    assert.equal(wbc26[`wbc26${suffix}`], expected);
    assert.equal(combined[`westpac2026LightMode${suffix}`], expected);
  }
});
