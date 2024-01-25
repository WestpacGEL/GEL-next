import { DocumentElement } from '@keystatic/core';

import { RelatedInfoProps } from '@/components/related-info/related-info.types';
import { ShortCode } from '@/types/short-code.types';

export type DesignSectionProps = { content: DocumentElement[]; noTitle?: boolean; title: string };

export type DesignContentProps = {
  description?: string;
  designSections?: DesignSectionProps[];
  relatedArticles?: RelatedInfoProps['relatedArticles'];
  relatedComponents?: RelatedInfoProps['relatedComponents'];
  shortCodes?: ShortCode[];
};
