const fs = require('fs');
const path = require('path');

const { glob } = require('glob');
const docgen = require('react-docgen-typescript');

const components = path.join('src', 'components', '**/*.component.tsx');
const outputFolder = path.join((process.cwd(), 'dist'));
const outputFile = path.join(outputFolder, 'component-type.json');

const tsConfigParser = docgen.withCustomConfig('./tsconfig.json', {
  propFilter: {
    skipPropsWithName: ['className', 'key'],
  },
  skipChildrenPropWithoutDoc: false,
  savePropValueAsString: true,
  shouldRemoveUndefinedFromOptional: true,
});

const TYPES_TO_BE_IGNORED = [
  'DOMAttributes',
  'HTMLAttributes',
  'AriaAttributes',
  'SVGAttributes',
  'TextareaHTMLAttributes',
];

(async () => {
  const results = await glob(components);

  const data = Object.fromEntries(
    tsConfigParser.parse(results).reduce((acc, { displayName, description, props, tags }) => {
      if (tags.private !== undefined) {
        return acc;
      }

      return [
        ...acc,
        [
          displayName,
          {
            displayName,
            description,
            // Sort the required props before the non-required props, then sort alphabetically
            props: Object.fromEntries(
              Object.values(props)
                .sort((a, b) => {
                  if (a.required !== b.required) {
                    if (a.required) return -1;
                    return 1;
                  }
                  return a.name.localeCompare(b.name);
                })
                .filter(a => {
                  if (a.name === 'children' && a.description) {
                    return true;
                  }
                  if (TYPES_TO_BE_IGNORED.includes(a.parent ? a.parent.name : '')) {
                    return false;
                  }
                  return true;
                })
                .map(a => {
                  if (a.name === 'tag' && a.type.name.indexOf('more ...') !== -1) {
                    return [a.name, { ...a, type: { ...a.type, name: 'keyof IntrinsicElements' } }];
                  }
                  return [a.name, a];
                }),
            ),
          },
        ],
      ];
    }, []),
  );

  // Create the output folder if it doesn't exist
  if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder);

  // Write the output from react-docgen-typescript to the output file
  fs.writeFileSync(outputFile, JSON.stringify(data));
})();
