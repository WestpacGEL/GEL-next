import { ReactNode } from 'react';

import { Code as CodeComponent } from '../../../code/code.component';

import { type CodeProps } from './code.types';

export const Code: CodeProps = ({ children, ...props }) => {
  return (
    <CodeComponent className="my-3" live>
      {children as ReactNode}
    </CodeComponent>
  );
};
