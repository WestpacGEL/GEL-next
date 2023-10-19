import { DocumentElement } from '@keystatic/core';

export type AccessibilitySectionProps = { content: DocumentElement[]; title: string };

export type AccessibilityContentProps = {
  accessibilityDemo?: DocumentElement[];
  accessibilitySections?: AccessibilitySectionProps[];
};
