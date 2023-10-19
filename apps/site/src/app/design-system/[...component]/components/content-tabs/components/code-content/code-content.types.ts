import { DocumentElement } from '@keystatic/core';

import { RelatedInfoProps } from '@/components/related-info/related-info.types';
import { WestpacUIInfo } from '@/types/westpac-ui-info.types';

export type CodeSectionProps = { content: DocumentElement[]; title: string };

export type CodeContentProps = {
  content: DocumentElement[];
  description?: string;
  relatedComponents?: RelatedInfoProps['relatedComponents'];
  westpacUIInfo?: WestpacUIInfo;
};
