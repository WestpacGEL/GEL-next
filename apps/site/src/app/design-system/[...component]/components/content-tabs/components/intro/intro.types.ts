import { TableOfContentsProps } from './components/table-of-contents/table-of-contents.types';

export type IntroProps = {
  description: string;
  sectionNames: TableOfContentsProps['contents'];
};
