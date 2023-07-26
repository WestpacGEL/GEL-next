import { DocumentRendererProps } from '@keystatic/core/renderer';

export type ParagraphProps = Required<Required<DocumentRendererProps>['renderers']>['block']['paragraph'];
