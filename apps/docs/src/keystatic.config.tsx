import { GitHubConfig, LocalConfig, collection, config, fields, singleton } from '@keystatic/core';

import { ComponentBlocks } from './components/component-blocks/component-blocks';

const storage: LocalConfig['storage'] | GitHubConfig['storage'] =
  process.env.NODE_ENV === 'development'
    ? { kind: 'local' }
    : {
        kind: 'github',
        repo: {
          owner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER!,
          name: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG!,
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
          layouts: [
            [1, 1],
            [1, 1, 1],
            [2, 1],
            [1, 2, 1],
          ],
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
        content: fields.document({
          formatting: true,
          dividers: true,
          links: true,
          layouts: [
            [1, 1],
            [1, 1, 1],
            [2, 1],
            [1, 2, 1],
          ],
          label: 'Content',
          componentBlocks: ComponentBlocks,
        }),
      },
    }),
    // authors: collection({
    //   label: 'Authors',
    //   path: 'content/authors/*',
    //   slugField: 'name',
    //   schema: {
    //     name: fields.slug({
    //       name: {
    //         label: 'Name',
    //         validation: {
    //           length: {
    //             min: 1,
    //           },
    //         },
    //       },
    //     }),
    //     role: fields.text({ label: 'Role' }),
    //     avatar: fields.image({
    //       label: 'Author avatar',
    //       directory: 'public/images/authors',
    //     }),
    //   },
    // }),
    // posts: collection({
    //   label: 'Posts',
    //   path: 'content/posts/*/',
    //   slugField: 'title',
    //   schema: {
    //     title: fields.slug({
    //       name: {
    //         label: 'Title',
    //       },
    //     }),
    //     summary: fields.text({
    //       label: 'Summary',
    //       validation: { length: { min: 4 } },
    //     }),
    //     publishedDate: fields.date({ label: 'Published Date' }),
    //     coverImage: fields.image({
    //       label: 'Image',
    //       directory: 'public/images/posts',
    //     }),
    //     wordCount: fields.integer({
    //       label: 'Word count',
    //     }),
    //     authors: fields.array(
    //       fields.relationship({
    //         label: 'Post author',
    //         collection: 'authors',
    //       }),
    //       {
    //         label: 'Authors',
    //         validation: { length: { min: 1 } },
    //         itemLabel: props => props.value || 'Please select an author',
    //       },
    //     ),
    //     content: fields.document({
    //       formatting: true,
    //       dividers: true,
    //       links: true,
    //       layouts: [
    //         [1, 1],
    //         [1, 1, 1],
    //         [2, 1],
    //         [1, 2, 1],
    //       ],
    //       label: 'Content',
    //       componentBlocks: ComponentBlocks,
    //     }),
    //   },
    // }),
    // externalArticles: collection({
    //   label: 'External Article',
    //   path: 'content/externalArticles/*/',
    //   slugField: 'title',
    //   schema: {
    //     title: fields.slug({
    //       name: {
    //         label: 'Title',
    //         validation: { length: { min: 4 } },
    //       },
    //     }),
    //     directLink: fields.url({
    //       label: 'Article Link',
    //     }),
    //     source: fields.text({
    //       label: 'Link Source',
    //       defaultValue: 'Read more.',
    //     }),
    //     coverImage: fields.image({
    //       label: 'Cover Image',
    //       directory: 'public/images/external-articles',
    //     }),
    //     summary: fields.text({
    //       label: 'Summary',
    //       validation: { length: { min: 4, max: 200 } },
    //     }),
    //     publishedDate: fields.date({ label: 'Published Date' }),
    //   },
    // }),
  },
});
