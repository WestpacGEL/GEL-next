import { DocumentElement } from '@keystatic/core';

import { ShortCode } from '@/types/short-code.types';

export type AccessibilitySectionProps = { content: DocumentElement[]; title: string };

export type AccessibilityContentProps = {
  accessibilityDemo?: DocumentElement[];
  accessibilitySections?: AccessibilitySectionProps[];
  shortCodes?: ShortCode[];
};
