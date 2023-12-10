import { DocumentElement } from '@keystatic/core';
import { ComponentProps } from '@westpac/ui';

import { RelatedInfoLinks } from '@/components/related-info/related-info.types';
import { WestpacUIInfo } from '@/types/westpac-ui-info.types';

import { AccessibilitySectionProps } from './components/accessibility-content/accessibility-content.types';
import { CodeSectionProps } from './components/code-content/code-content.types';
import { DesignSectionProps } from './components/design-content/design-content.types';

export type ContentTabsProps = {
  accessibilityDemo?: DocumentElement[];
  accessibilitySections: AccessibilitySectionProps[];
  codeSections: CodeSectionProps[];
  componentName: string;
  componentProps?: ComponentProps;
  description?: string;
  designSections?: DesignSectionProps[];
  namedExport?: string;
  relatedArticles?: DocumentElement[];
  relatedComponents?: RelatedInfoLinks[];
  subComponentProps: ComponentProps[];
  westpacUIInfo: WestpacUIInfo;
};
