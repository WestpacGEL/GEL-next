import { component, fields } from '@keystatic/core';
import Image from 'next/image';

import { ArticleBodyImage } from './components/article-body-image';
import { ArticleImage } from './components/article-image';
import { LeadingText } from './components/leading-text';
import { ArticleLinkList } from './components/link-list';
import { linkList } from './components/link-list/link-list.preview';

export const ArticleComponentBlocks = {
  // EXAMPLES:
  articleBodyImage: component({
    label: 'Article body image',
    preview: ({ fields: { image, title } }) => (
      <figure>
        {image.fields.src.value && (
          <Image src={image.fields.src.value} alt={image.fields.alt.value} height={150} width={300} />
        )}
        {title && <figcaption>{title.value}</figcaption>}
      </figure>
    ),
    schema: {
      image: fields.cloudImage({
        label: 'Article Body Image',
      }),
      title: fields.text({
        label: 'Title',
      }),
      type: fields.select({
        label: 'Image width',
        options: [
          { label: 'Body', value: 'body' },
          { label: 'Body Wide', value: 'bodyWide' },
        ],
        defaultValue: 'body',
      }),
    },
  }),
  leadingText: component({
    label: 'Leading Text',
    preview: props => <>{props.fields.text.value || ''}</>,
    schema: {
      text: fields.text({
        label: 'Leading Text',
        multiline: true,
      }),
    },
  }),
  articleImage: component({
    label: 'Article Image',
    preview: ({ fields: { image, caption } }) => {
      return (
        <figure>
          {image.fields.src.value && (
            <Image src={image.fields.src.value} alt={image.fields.alt.value} height={150} width={150} />
          )}
          {caption && <figcaption>{caption.value}</figcaption>}
        </figure>
      );
    },
    schema: {
      image: fields.cloudImage({
        label: 'Image',
      }),
      caption: fields.text({
        label: 'Caption',
      }),
      spacing: fields.select({
        label: 'Image spacing',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Reduced', value: 'reduced' },
        ],
        defaultValue: 'default',
      }),
    },
  }),
  linkList,
};

export const ArticleComponentBlocksComponents = {
  // EXAMPLES:
  articleBodyImage: ArticleBodyImage,
  leadingText: LeadingText,
  articleImage: ArticleImage,
  linkList: ArticleLinkList,
};
