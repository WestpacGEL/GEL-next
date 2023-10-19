import { DocumentElement } from '@keystatic/core';

import { AccessibilitySectionProps } from './components/accessibility-content/accessibility-content.types';
import { DesignSectionProps } from './components/design-content/design-content.types';

export type ContentTabsProps = {
  accessibilityDemo: DocumentElement[];
  accessibilitySections: AccessibilitySectionProps[];
  code: DocumentElement[];
  description?: string;
  designSections?: DesignSectionProps[];
  pageOfContent?: { title: string }[];
  relatedComponents?: string[];
};
