/* eslint-disable sonarjs/no-duplicate-string */
import { GitHubConfig, LocalConfig, collection, config, fields, singleton } from '@keystatic/core';

import { ArticleComponentBlocks } from '@/components/component-blocks/article-component-blocks';
import { foundationBlocks } from '@/components/component-blocks/foundation-blocks';
import { logs } from '@/components/component-blocks/logs/logs.preview';

const IS_VERCEL_BUILD =
  typeof process.env.NEXT_PUBLIC_GIT_REPO_OWNER === 'string' && process.env.NEXT_PUBLIC_GIT_REPO_OWNER !== '';

// storage option for Keystatic.
const storage: LocalConfig['storage'] | GitHubConfig['storage'] = IS_VERCEL_BUILD
  ? {
      kind: 'github',
      pathPrefix: 'apps/site',
      repo: {
        owner: process.env.NEXT_PUBLIC_GIT_REPO_OWNER!,
        name: process.env.NEXT_PUBLIC_GIT_REPO_SLUG!,
      },
    }
  : { kind: 'local' };

export default config({
  storage,
  singletons: {
    homePage: singleton({
      label: 'Home page config',
      path: 'src/content/home-page/',
      schema: {
        articleRows: fields.array(
          fields.object({
            layout: fields.select({
              label: 'Layout',
              description: 'Layout to display the article row',
              options: [
                { label: '1x1:   [_____][_____]', value: '1x1' },
                { label: '2x1:   [_______][___]', value: '2x1' },
                { label: '1x2:   [___][_______]', value: '1x2' },
                { label: '1x1x1: [___][___][___]', value: '1x1x1' },
              ],
              defaultValue: '1x1',
            }),
            articles: fields.array(
              fields.relationship({
                label: 'Related articles',
                description: 'A list of articles',
                collection: 'articles',
              }),
              {
                label: 'Articles',
                itemLabel: props => props.value || '',
              },
            ),
          }),
          {
            label: 'Article Rows',
            itemLabel: props =>
              `Articles: [${props.fields.articles.elements.map(element => element.value).join(', ')}] (${
                props.fields.layout.value
              })`,
          },
        ),
      },
    }),
    url: singleton({
      label: 'URLs',
      path: 'src/content/urls/',
      schema: {
        guidelines: fields.url({
          label: 'Master Brand Guidelines',
        }),
        gelEmail: fields.text({
          label: 'GEL team contact email',
        }),
      },
    }),
    westpacUIInfo: singleton({
      label: 'Westpac UI Info',
      path: 'src/content/westpac-ui-info/',
      schema: {
        changelog: fields.url({
          label: 'Changelog link',
        }),
        currentVersion: fields.text({
          label: 'current gel version',
        }),
      },
    }),
    logs: singleton({
      label: 'System Logs',
      path: 'src/content/logs/',
      schema: {
        document: fields.document({
          label: 'Logs',
          componentBlocks: { logs },
        }),
      },
    }),
  },
  collections: {
    designSystem: collection({
      label: 'Design System',
      path: 'src/content/design-system/**/',
      previewUrl: `/preview/start?branch={branch}&to=/design-system/{slug}`,
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
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        namedExport: fields.conditional(fields.checkbox({ label: 'Define custom named export', defaultValue: false }), {
          true: fields.object({
            name: fields.text({ label: 'Custom named export of the component' }),
          }),
          false: fields.empty(),
        }),
        excludeFromNavbar: fields.checkbox({ label: 'Exclude from navigation bar' }),
        design: fields.array(
          fields.object({
            title: fields.slug({
              name: {
                label: 'Title',
                validation: {
                  length: {
                    min: 1,
                  },
                },
              },
            }),
            noTitle: fields.checkbox({ label: 'No title' }),
            noDemo: fields.checkbox({ label: 'No Demo' }),
            content: fields.document({
              formatting: {
                inlineMarks: {
                  bold: true,
                  italic: true,
                  strikethrough: true,
                  code: true,
                  underline: true,
                },
                listTypes: {
                  ordered: true,
                  unordered: true,
                },
                headingLevels: [1, 2, 3, 4, 5, 6],
                blockTypes: {
                  blockquote: true,
                  code: true,
                },
                softBreaks: true,
              },
              dividers: true,
              links: true,
              images: true,
              layouts: [[6, 6]],
              label: 'Design',
              componentBlocks: foundationBlocks,
            }),
          }),
          {
            label: 'Design sections',
            itemLabel: props => props.fields.title.value.name,
            slugField: 'title',
          },
        ),
        accessibility: fields.array(
          fields.object({
            title: fields.slug({
              name: {
                label: 'Title',
                validation: {
                  length: {
                    min: 1,
                  },
                },
              },
            }),
            content: fields.document({
              formatting: {
                inlineMarks: {
                  bold: true,
                  italic: true,
                  strikethrough: true,
                  code: true,
                  underline: true,
                },
                listTypes: {
                  ordered: true,
                  unordered: true,
                },
                headingLevels: [1, 2, 3, 4, 5, 6],
                blockTypes: {
                  blockquote: true,
                  code: true,
                },
                softBreaks: true,
              },
              dividers: true,
              links: true,
              label: 'Design',
              componentBlocks: foundationBlocks,
            }),
          }),
          {
            label: 'Accessibility sections',
            itemLabel: props => props.fields.title.value.name,
            slugField: 'title',
          },
        ),
        accessibilityDemo: fields.document({
          formatting: {
            inlineMarks: {
              bold: true,
              italic: true,
              strikethrough: true,
              code: true,
              underline: true,
            },
            listTypes: {
              ordered: true,
              unordered: true,
            },
            headingLevels: [1, 2, 3, 4, 5, 6],
            blockTypes: {
              blockquote: true,
              code: true,
            },
            softBreaks: true,
          },
          dividers: true,
          links: true,
          label: 'Accessibility Demo',
        }),
        relatedComponents: fields.array(
          fields.object({
            title: fields.text({
              label: 'Related Components',
            }),
            slug: fields.url({
              label: 'Slug',
            }),
          }),
          {
            label: 'Related Components',
            itemLabel: props => props.fields.title.value || '',
          },
        ),
        relatedArticles: fields.document({
          formatting: {
            inlineMarks: {
              bold: true,
              italic: true,
              strikethrough: true,
              code: true,
              underline: true,
            },
            listTypes: {
              ordered: true,
              unordered: true,
            },
            headingLevels: [1, 2, 3, 4, 5, 6],
            blockTypes: {
              blockquote: true,
              code: true,
            },
            softBreaks: true,
          },
          dividers: true,
          links: true,
          label: 'Related Articles',
        }),
        code: fields.array(
          fields.object({
            title: fields.slug({
              name: {
                label: 'Title',
                validation: {
                  length: {
                    min: 1,
                  },
                },
              },
            }),
            noTitle: fields.checkbox({ label: 'No title' }),
            content: fields.document({
              formatting: {
                inlineMarks: {
                  bold: true,
                  italic: true,
                  strikethrough: true,
                  code: true,
                  underline: true,
                },
                listTypes: {
                  ordered: true,
                  unordered: true,
                },
                headingLevels: [1, 2, 3, 4, 5, 6],
                blockTypes: {
                  blockquote: true,
                  code: true,
                },
                softBreaks: true,
              },
              dividers: true,
              links: true,
              images: true,
              layouts: [[6, 6]],
              label: 'Code',
              componentBlocks: foundationBlocks,
            }),
          }),
          {
            label: 'Code sections',
            itemLabel: props => props.fields.title.value.name,
            slugField: 'title',
          },
        ),
      },
    }),
    articles: collection({
      label: 'Articles',
      path: 'src/content/articles/*',
      previewUrl: `/preview/start?branch={branch}&to=/articles/{slug}`,
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
        cardTitle: fields.text({
          label: 'Card title on the home page',
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        thumbnail: fields.cloudImage({
          label: 'Thumbnail image',
        }),
        smallDescription: fields.text({
          label: 'Small description',
          multiline: true,
        }),
        image: fields.cloudImage({
          label: 'Main Image',
        }),
        author: fields.text({
          label: 'Author name',
        }),
        publishedAt: fields.datetime({
          label: 'Published at',
          defaultValue: {
            kind: 'now',
          },
        }),
        content: fields.document({
          formatting: {
            inlineMarks: {
              bold: true,
              italic: true,
              strikethrough: true,
              code: true,
              underline: true,
            },
            listTypes: {
              ordered: true,
              unordered: true,
            },
            headingLevels: [1, 2, 3, 4, 5, 6],
            blockTypes: {
              blockquote: true,
              code: true,
            },
            softBreaks: true,
          },
          dividers: true,
          links: true,
          label: 'Design',
          componentBlocks: ArticleComponentBlocks,
          layouts: [
            [4, 4],
            [5, 5],
          ],
          images: {
            directory: 'public/images/articles/content',
            publicPath: '/images/articles/content',
          },
        }),
      },
    }),
    shortCodes: collection({
      label: 'Short Codes',
      path: 'src/content/short-codes/*',
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
        content: fields.document({
          formatting: {
            inlineMarks: {
              bold: true,
              italic: true,
              strikethrough: true,
              code: true,
              underline: true,
            },
            listTypes: {
              ordered: true,
              unordered: true,
            },
            headingLevels: [1, 2, 3, 4, 5, 6],
            blockTypes: {
              blockquote: true,
              code: true,
            },
            softBreaks: true,
          },
          dividers: true,
          links: true,
          label: 'Design',
          componentBlocks: foundationBlocks,
          layouts: [
            [4, 4],
            [5, 5],
          ],
        }),
      },
    }),
  },
});
