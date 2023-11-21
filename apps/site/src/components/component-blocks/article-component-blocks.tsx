import { component, fields } from '@keystatic/core';

import { ArticleBodyImage } from './components/article-body-image';
import { LeadingText } from './components/leading-text';

export const ArticleComponentBlocks = {
  // EXAMPLES:
  articleBodyImage: component({
    label: 'Article body image',
    preview: props => (
      <img
        className="w-1/3"
        src={URL.createObjectURL(
          new Blob(
            [props.fields.articleBodyImage.value?.data.buffer || ''],
            { type: `image/${props.fields.articleBodyImage.value?.extension}` } /* (1) */,
          ),
        )}
        alt={props.fields.articleBodyImage.value?.filename}
      />
    ),
    schema: {
      articleBodyImage: fields.image({
        label: 'Image',
        description: 'image',
        directory: 'public/images/articles',
        publicPath: '/images/articles',
      }),
      alt: fields.text({
        label: 'Alt text',
      }),
      title: fields.text({
        label: 'Title',
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
};

export const ArticleComponentBlocksComponents = {
  // EXAMPLES:
  articleBodyImage: ArticleBodyImage,
  leadingText: LeadingText,
};
