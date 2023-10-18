import { DocumentRendererProps } from '@keystatic/core/renderer';

export type ListProps = Required<Required<DocumentRendererProps>['renderers']>['block']['list'];
