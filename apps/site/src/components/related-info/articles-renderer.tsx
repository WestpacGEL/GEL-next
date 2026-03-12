import { DocumentRendererProps } from '@keystatic/core/renderer';

import { Link } from '@/components/content-blocks/typography';
import { Divider, Heading, Paragraph } from '@/components/document-renderer';
import { Layout } from '@/components/document-renderer/layout';

export const DOCUMENT_RENDERERS: Required<DocumentRendererProps>['renderers'] = {
  block: {
    divider: Divider,
    paragraph: props => (
      <Paragraph
        {...props}
        className={`
          w-full
          last:mb-2
        `}
      />
    ),
    heading: Heading,
    layout: Layout,
  },
  inline: {
    link: Link,
    underline: props => <span {...props} className="underline" />,
  },
};
