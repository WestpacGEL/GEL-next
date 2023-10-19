import { DocumentRendererProps } from '@keystatic/core/renderer';

export type DividerProps = Required<Required<DocumentRendererProps>['renderers']>['block']['divider'];
