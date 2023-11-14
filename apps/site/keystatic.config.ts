import { GitHubConfig, LocalConfig, collection, config, fields, singleton } from '@keystatic/core';

import { ArticleComponentBlocks } from '@/components/component-blocks/article-component-blocks';

const storage: LocalConfig['storage'] | GitHubConfig['storage'] =
  process.env.NODE_ENV === 'development'
    ? { kind: 'local' }
    : {
        kind: 'github',
        pathPrefix: 'apps/site',
        repo: {
          owner: process.env.NEXT_PUBLIC_GIT_REPO_OWNER!,
          name: process.env.NEXT_PUBLIC_GIT_REPO_SLUG!,
        },
      };

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
  },
  collections: {
    designSystem: collection({
      label: 'Design System',
      path: 'src/content/design-system/**/',
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
        design: fields.array(
          fields.object({
            title: fields.text({ label: 'Name' }),
            noTitle: fields.checkbox({ label: 'No title' }),
            content: fields.document({
              formatting: true,
              dividers: true,
              links: true,
              images: true,
              layouts: [[6, 6]],
              label: 'Design',
            }),
          }),
          {
            label: 'Design sections',
            itemLabel: props => props.fields.title.value,
            slugField: 'title',
          },
        ),
        accessibility: fields.array(
          fields.object({
            title: fields.text({ label: 'Name' }),
            content: fields.document({
              formatting: true,
              dividers: true,
              links: true,
              label: 'Design',
            }),
          }),
          {
            label: 'Accessibility sections',
            itemLabel: props => props.fields.title.value,
            slugField: 'title',
          },
        ),
        accessibilityDemo: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          label: 'Accessibility Demo',
        }),
        relatedInformation: fields.array(
          fields.relationship({
            label: 'Related components',
            description: 'A list of related components',
            collection: 'designSystem',
          }),
          {
            label: 'Related Components',
            itemLabel: props => props.value || '',
          },
        ),
        code: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          label: 'Code',
        }),
      },
    }),
    authors: collection({
      label: 'Authors',
      path: 'src/content/authors/*',
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
      },
    }),
    articles: collection({
      label: 'Articles',
      path: 'src/content/articles/*',
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
        thumbnail: fields.image({
          label: 'Thumbnail image',
          description: 'Thumbnail image',
          directory: 'public/images/articles',
          publicPath: '/images/articles',
        }),
        smallDescription: fields.image({
          label: 'Small description',
          description: 'Small description that goes along with the thumbnail',
          directory: 'public/images/articles',
          publicPath: '/images/articles',
        }),
        image: fields.image({
          label: 'Main Image',
          description: 'Main image',
          directory: 'public/images/articles',
          publicPath: '/images/articles',
        }),
        author: fields.relationship({
          label: 'Author',
          description: 'Author of this article',
          collection: 'authors',
        }),
        publishedAt: fields.datetime({
          label: 'Published at',
          defaultValue: {
            kind: 'now',
          },
        }),
        content: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          label: 'Design',
          componentBlocks: ArticleComponentBlocks,
          layouts: [[6, 6]],
          images: {
            directory: 'public/images/articles/content',
            publicPath: '/images/articles/content',
          },
        }),
      },
    }),
  },
});
