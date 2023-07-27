import { DocumentRendererProps } from '@keystatic/core/renderer';

import { Code, Divider, Heading, Paragraph } from './components';

export const DOCUMENT_RENDERERS: Required<DocumentRendererProps>['renderers'] = {
  block: {
    paragraph: Paragraph,
    code: Code,
    divider: Divider,
    heading: Heading,
  },
};
