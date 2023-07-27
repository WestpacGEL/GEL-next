import { GitHubConfig, LocalConfig, collection, config, fields, singleton } from '@keystatic/core';

import { ComponentBlocks } from './components/component-blocks/component-blocks';

const storage: LocalConfig['storage'] | GitHubConfig['storage'] =
  process.env.NODE_ENV === 'development'
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: {
          owner: process.env.NEXT_PUBLIC_GIT_REPO_OWNER!,
          name: process.env.NEXT_PUBLIC_GIT_REPO_SLUG!,
        },
      };

export default config({
  storage,
  singletons: {
    home: singleton({
      label: 'Home',
      path: 'content/pages/home/',
      schema: {
        heading: fields.document({
          formatting: {
            inlineMarks: {
              bold: true,
            },
          },
          label: 'Heading (note: text that is bolded will show up in red)',
        }),
      },
    }),
    about: singleton({
      label: 'About',
      path: 'content/pages/about/',
      schema: {
        content: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          label: 'Content',
          componentBlocks: ComponentBlocks,
        }),
      },
    }),
  },
  collections: {
    components: collection({
      label: 'Components',
      path: 'content/components/*',
      slugField: 'name',
      schema: {
        name: fields.slug({
          name: {
            label: 'Name',
            validation: {
              length: {
                min: 1,
              },
            },
          },
        }),
        design: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          label: 'Design',
          componentBlocks: ComponentBlocks,
        }),
        accessibility: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          label: 'Accessibility',
          componentBlocks: ComponentBlocks,
        }),
        code: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          label: 'Code',
          componentBlocks: ComponentBlocks,
        }),
      },
    }),
  },
});
