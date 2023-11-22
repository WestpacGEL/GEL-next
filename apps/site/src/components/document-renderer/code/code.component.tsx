import { ReactNode } from 'react';

import { Code as CodeComponent } from '../../code/code.component';

import { type CodeProps } from './code.types';

export const Code = ({ children, showCode, ...props }: CodeProps) => {
  return (
    <CodeComponent className="my-3" showCode={showCode} live {...props}>
      {children as ReactNode}
    </CodeComponent>
  );
};
