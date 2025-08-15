import { DocumentRenderer } from '@keystatic/core/renderer';
import { useMemo } from 'react';

import { DOCUMENT_RENDERERS } from '@/app/design-system/[brand]/(client)/[...component]/components/content-tabs/components/document-renderer';

import { foundationBlocksComponents } from '../../foundation-blocks';

import { type ShortCodeProps } from './short-code.types';

export const ShortCode = ({ name, shortCodes }: ShortCodeProps) => {
  const shortCode = useMemo(() => shortCodes.find(shortCode => shortCode.slug === name), [name, shortCodes]);

  return shortCode?.content ? (
    <DocumentRenderer
      document={shortCode.content}
      renderers={DOCUMENT_RENDERERS}
      componentBlocks={foundationBlocksComponents}
    />
  ) : null;
};
