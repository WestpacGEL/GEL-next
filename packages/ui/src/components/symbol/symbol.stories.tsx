import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import React from 'react';

import { SymbolProps, WBCLogo, WBCMultibrandSmallLogo } from './index.js';
import * as symbols from './index.js';

const meta: Meta<typeof Symbol> = {
  title: 'Foundation/Symbols',
  component: WBCLogo,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {},
};

export const Offset = () => (
  <div>
    <p>Left</p>
    <WBCMultibrandSmallLogo className="border border-dashed" />
    <br />
    <br />
    <p>Center</p>
    <WBCMultibrandSmallLogo align="center" className="border border-dashed" />
    <br />
    <br />
    <p>Right</p>
    <WBCMultibrandSmallLogo align="right" className="border border-dashed" />
  </div>
);

export const AllSymbols = () => {
  const allSymbols = Object.entries(symbols).reduce(
    (curr, [key, symbol]) => (key.includes('Symbol') ? { ...curr, [key]: symbol } : curr),
    {} as { [index: string]: React.FC<SymbolProps> },
  );

  return (
    <div className="grid grid-cols-4 gap-5">
      {Object.entries(allSymbols).map(([key, Symbol]) => (
        <div key={key} className=" flex flex-col items-center justify-end">
          <Symbol />
          <p className="mt-2">{key}</p>
        </div>
      ))}
    </div>
  );
};

export const AllLogos = () => {
  const allLogos = Object.entries(symbols).reduce(
    (curr, [key, symbol]) => (key.includes('Logo') ? { ...curr, [key]: symbol } : curr),
    {} as { [index: string]: React.FC<SymbolProps> },
  );

  return (
    <div className="grid grid-cols-4 gap-5">
      {Object.entries(allLogos).map(([key, Logo]) => (
        <div key={key} className=" flex flex-col items-center justify-end">
          <Logo />
          <p className="mt-2">{key}</p>
        </div>
      ))}
    </div>
  );
};
