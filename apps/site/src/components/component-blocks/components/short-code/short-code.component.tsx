import { DocumentRenderer } from '@keystatic/core/renderer';
import { useMemo } from 'react';

import { DOCUMENT_RENDERERS } from '@/app/design-system/[...component]/components/content-tabs/components/document-renderer';

import { ArticleComponentBlocksComponents } from '../../article-component-blocks';

import { type ShortCodeProps } from './short-code.types';

export const ShortCode = ({ name, shortCodes }: ShortCodeProps) => {
  const shortCode = useMemo(() => shortCodes.find(shortCode => shortCode.name === name), [name, shortCodes]);

  return shortCode?.content ? (
    <DocumentRenderer
      document={shortCode.content}
      renderers={DOCUMENT_RENDERERS}
      componentBlocks={{}}
    />
  ) : null;
};
