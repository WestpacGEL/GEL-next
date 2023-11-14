import { component, fields } from '@keystatic/core';
import { DocumentRenderer } from '@keystatic/core/renderer';

import { HeroImage } from './components/hero-image';
import { LeadingText } from './components/leading-text';

export const ArticleComponentBlocks = {
  // EXAMPLES:
  heroImage: component({
    label: 'Hero Image',
    preview: props => (
      <img
        className="w-1/3"
        src={URL.createObjectURL(
          new Blob(
            [props.fields.heroImage.value?.data.buffer || ''],
            { type: `image/${props.fields.heroImage.value?.extension}` } /* (1) */,
          ),
        )}
        alt={props.fields.heroImage.value?.filename}
      />
    ),
    schema: {
      heroImage: fields.image({
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
  heroImage: HeroImage,
  leadingText: LeadingText,
};
