import { DocumentRendererProps } from '@keystatic/core/renderer';

import { Code as InlineCode, Link } from '@/components/content-blocks/typography';
import { Blockquote, Code, Divider, List, Paragraph } from '@/components/document-renderer';

import { Heading } from './heading';
import { Image } from './image';

export const DOCUMENT_RENDERERS: Required<DocumentRendererProps>['renderers'] = {
  block: {
    divider: Divider,
    paragraph: Paragraph,
    code: Code,
    heading: Heading,
    list: props => <List color="blue" {...props} />,
    blockquote: ({ children }) => <Blockquote className="mx-0 sm:-mx-20">{children}</Blockquote>,
    image: Image,
  },
  inline: {
    code: InlineCode,
    link: props => <Link color="blue" {...props} />,
  },
};
