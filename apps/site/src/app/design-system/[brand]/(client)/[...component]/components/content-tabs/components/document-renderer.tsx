import { DocumentRendererProps } from '@keystatic/core/renderer';

import { Code as InlineCode, Link } from '@/components/content-blocks/typography';
import { Code, Divider, Heading, Image, List, Paragraph } from '@/components/document-renderer';
import { Layout } from '@/components/document-renderer/layout';

export const DOCUMENT_RENDERERS: Required<DocumentRendererProps>['renderers'] = {
  block: {
    divider: () => (
      <Divider
        className={`
          w-full
          sm:w-9/12
        `}
      />
    ),
    paragraph: props => (
      <Paragraph
        {...props}
        className={`
          w-full
          sm:w-9/12
        `}
      />
    ),
    code: props => (
      <Code
        className={`
          mt-1 mb-5
          sm:mt-2 sm:mb-8
        `}
        {...props}
        showCode
      />
    ),
    heading: Heading,
    list: props => <List {...props} className="sm:w-9/12" />,
    layout: Layout,
    image: props => (
      <Image
        {...props}
        className={`
          mb-5
          last:mb-0
        `}
      />
    ),
    blockquote: ({ children }) => (
      <blockquote className="mx-6.5 my-2.5 typography-body-9 font-light">{children}</blockquote>
    ),
    table: ({ head, body }) => {
      return (
        <table className='table'>
          <thead>
            <tr>
              {head?.map((headItem) => <th colSpan={headItem.colSpan} rowSpan={headItem.rowSpan} className='text-left text-text-body p-2 font-bold border-b border-border-muted-soft'>{headItem.children}</th>)}
            </tr>
          </thead>
          <tbody>
            {body.map((tr, index) => (
              <tr key={index}>
                {tr.map((td) => (
                  <td colSpan={td.colSpan} rowSpan={td.rowSpan} className='text-left text-text-body p-2 border-y border-border-muted-soft' >{td.children}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  },
  inline: {
    code: InlineCode,
    link: Link,
    underline: props => <span {...props} className="underline" />,
  },
};
