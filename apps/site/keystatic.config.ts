import { GitHubConfig, LocalConfig, collection, config, fields, singleton } from '@keystatic/core';

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
    url: singleton({
      label: 'URLs',
      path: 'content/urls/',
      schema: {
        guidelines: fields.url({
          label: 'Master Brand Guidelines',
        }),
        gelEmail: fields.text({
          label: 'GEL team contact email',
        }),
      },
    }),
  },
  collections: {
    designSystem: collection({
      label: 'Design System',
      path: 'content/design-system/**/',
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
        }),
        accessibility: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          label: 'Accessibility',
        }),
        code: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          label: 'Code',
        }),
      },
    }),
  },
});
