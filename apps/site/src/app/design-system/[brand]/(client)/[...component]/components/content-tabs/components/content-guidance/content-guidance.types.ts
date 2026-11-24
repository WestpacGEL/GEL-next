import { type DocumentElement } from '@keystatic/core';

import { type ShortCode } from '@/types/short-code.types';

export type ContentSectionProps = {
  title: string;
  content: DocumentElement[];
  noTitle?: boolean;
  noDemo?: boolean;
};

export type ContentGuidanceProps = {
  contentSections: ContentSectionProps[];
  shortCodes?: ShortCode[];
};
