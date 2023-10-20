import { DocumentElement } from '@keystatic/core';
import { ComponentProps } from '@westpac/ui';

import { RelatedInfoProps } from '@/components/related-info/related-info.types';
import { WestpacUIInfo } from '@/types/westpac-ui-info.types';

export type CodeSectionProps = { content: DocumentElement[]; title: string };

export type CodeContentProps = {
  componentProps: ComponentProps;
  content: DocumentElement[];
  description?: string;
  relatedComponents?: RelatedInfoProps['relatedComponents'];
  subComponentProps?: ComponentProps[];
  westpacUIInfo?: WestpacUIInfo;
};
