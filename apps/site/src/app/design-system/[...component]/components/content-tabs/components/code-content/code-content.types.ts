import { DocumentElement } from '@keystatic/core';
import { ComponentProps } from '@westpac/ui';

import { RelatedInfoProps } from '@/components/related-info/related-info.types';
import { ShortCode } from '@/types/short-code.types';
import { WestpacUIInfo } from '@/types/westpac-ui-info.types';

export type CodeSectionProps = { content: DocumentElement[]; noTitle?: boolean; title: string };

export type CodeContentProps = {
  codeSections?: CodeSectionProps[];
  componentName: string;
  componentProps?: ComponentProps;
  description?: string;
  namedExport?: string;
  relatedComponents?: RelatedInfoProps['relatedComponents'];
  shortCodes?: ShortCode[];
  subComponentProps?: ComponentProps[];
  westpacUIInfo?: WestpacUIInfo;
};
