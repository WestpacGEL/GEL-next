import { DocumentRendererProps } from '@keystatic/core/renderer';

export type CodeProps = Required<Required<DocumentRendererProps>['renderers']>['block']['code'];
