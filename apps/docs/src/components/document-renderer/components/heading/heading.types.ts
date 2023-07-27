import { DocumentRendererProps } from '@keystatic/core/renderer';

export type HeadingProps = Required<Required<DocumentRendererProps>['renderers']>['block']['heading'];
