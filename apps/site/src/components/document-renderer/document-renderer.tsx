import { DocumentRendererProps } from '@keystatic/core/renderer';

import { Code as InlineCode, Link } from '../content-blocks/typography';

import { Code, Divider, Heading, List, Paragraph } from './components';

export const DOCUMENT_RENDERERS: Required<DocumentRendererProps>['renderers'] = {
  block: {
    divider: Divider,
    paragraph: Paragraph,
    code: Code,
    heading: Heading,
    list: List,
  },
  inline: {
    code: InlineCode,
    link: Link,
  },
};
