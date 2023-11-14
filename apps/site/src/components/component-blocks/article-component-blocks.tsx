import { component, fields } from '@keystatic/core';
import { DocumentRenderer } from '@keystatic/core/renderer';

import { JumboImage } from './components/jumbo-image';
import { LeadingText } from './components/leading-text';

export const ArticleComponentBlocks = {
  // EXAMPLES:
  jumboImage: component({
    label: 'Hero Image',
    preview: props => (
      <img
        className="w-1/3"
        src={URL.createObjectURL(
          new Blob(
            [props.fields.jumboImage.value?.data.buffer || ''],
            { type: `image/${props.fields.jumboImage.value?.extension}` } /* (1) */,
          ),
        )}
        alt={props.fields.jumboImage.value?.filename}
      />
    ),
    schema: {
      jumboImage: fields.image({
        label: 'Hero Image',
        description: 'Hero image',
        directory: 'public/images/articles',
        publicPath: '/images/articles',
      }),
      alt: fields.text({
        label: 'Alt text',
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
  jumboImage: JumboImage,
  leadingText: LeadingText,
};
