export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  // create your generators here
  plop.setGenerator('basics', {
    description: 'this is a skeleton plopfile',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'type component name please in PascalCase',
      },
    ],
    actions: [
      {
        type: 'add',
        path: './src/components/{{kebabCase name}}/index.ts',
        templateFile: './scaffold/component/scaffold.index.hbs',
      },
      {
        type: 'add',
        path: './src/components/{{kebabCase name}}/{{kebabCase name}}.component.tsx',
        templateFile: './scaffold/component/scaffold.component.hbs',
      },
      {
        type: 'add',
        path: './src/components/{{kebabCase name}}/{{kebabCase name}}.spec.tsx',
        templateFile: './scaffold/component/scaffold.spec.hbs',
      },
      {
        type: 'add',
        path: './src/components/{{kebabCase name}}/{{kebabCase name}}.stories.tsx',
        templateFile: './scaffold/component/scaffold.stories.hbs',
      },
      {
        type: 'add',
        path: './src/components/{{kebabCase name}}/{{kebabCase name}}.styles.tsx',
        templateFile: './scaffold/component/scaffold.styles.hbs',
      },
      {
        type: 'add',
        path: './src/components/{{kebabCase name}}/{{kebabCase name}}.types.tsx',
        templateFile: './scaffold/component/scaffold.types.hbs',
      },
    ],
  });
}
