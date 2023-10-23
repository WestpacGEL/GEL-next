import { DocumentRendererProps } from '@keystatic/core/renderer';

import { Code as InlineCode, Link } from '@/components/content-blocks/typography';
import { Code, Divider, Heading, List, Paragraph } from '@/components/document-renderer';

export const DOCUMENT_RENDERERS: Required<DocumentRendererProps>['renderers'] = {
  block: {
    divider: Divider,
    paragraph: props => <Paragraph {...props} className="sm:w-9/12" />,
    code: props => <Code className="my-4" {...props} />,
    heading: Heading,
    list: props => <List {...props} className="sm:w-9/12" />,
  },
  inline: {
    code: InlineCode,
    link: Link,
  },
};
