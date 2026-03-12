import { DocumentRendererProps } from '@keystatic/core/renderer';

import { Code as InlineCode, Link } from '@/components/content-blocks/typography';
import { Blockquote, Code, Divider, List, Paragraph } from '@/components/document-renderer';

import { Heading } from './heading';
import { Image } from './image';
import { Layout } from './layout';

export const DOCUMENT_RENDERERS: Required<DocumentRendererProps>['renderers'] = {
  block: {
    divider: Divider,
    block: ({ children }) => <>{children}</>,
    paragraph: props => <Paragraph {...props} type="graphik" />,
    code: Code,
    heading: Heading,
    list: props => <List color="blue" fontFamily="graphik" {...props} />,
    blockquote: ({ children }) => (
      <Blockquote
        type="graphik"
        className={`
          mx-0
          sm:-mx-20
        `}
      >
        {children}
      </Blockquote>
    ),
    image: Image,
    layout: Layout,
  },
  inline: {
    code: InlineCode,
    link: props => <Link color="blue" {...props} />,
    underline: props => <span {...props} className="underline" />,
  },
};
