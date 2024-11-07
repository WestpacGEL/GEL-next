import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import React from 'react';

import { Symbol } from './symbol.component.js';
import { type Align } from './symbol.types.js';

import { SymbolProps, WBCLogo, WBCMultibrandSmallLogo } from './index.js';
import * as symbols from './index.js';

const meta: Meta<typeof Symbol> = {
  title: 'Foundation/Symbols',
  component: WBCLogo,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {},
};

export const Offset = () => (
  <div>
    <p>Left</p>
    <WBCMultibrandSmallLogo className="box-content border border-dashed" />
    <br />
    <br />
    <p>Center</p>
    <WBCMultibrandSmallLogo align="center" className="box-content border border-dashed" />
    <br />
    <br />
    <p>Right</p>
    <WBCMultibrandSmallLogo align="right" className="box-content border border-dashed" />
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

  const logos = Object.entries(allLogos).reduce(
    (curr, [key, symbol]) => (!key.includes('Multibrand') ? { ...curr, [key]: symbol } : curr),
    {} as { [index: string]: React.FC<SymbolProps> },
  );

  const multibrandLargeLogos = Object.entries(allLogos).reduce(
    (curr, [key, symbol]) => (key.includes('MultibrandLarge') ? { ...curr, [key]: symbol } : curr),
    {} as { [index: string]: React.FC<SymbolProps> },
  );

  const multibrandSmallLogos = Object.entries(allLogos).reduce(
    (curr, [key, symbol]) => (key.includes('MultibrandSmall') ? { ...curr, [key]: symbol } : curr),
    {} as { [index: string]: React.FC<SymbolProps> },
  );

  const align: Align[] = ['left', 'center', 'right'];

  return (
    <>
      <h3 className="typography-body-7 mb-4 font-bold">Logos</h3>
      <div className="grid grid-cols-4 gap-5">
        {Object.entries(logos).map(([key, Logo]) => (
          <div key={key} className=" flex flex-col items-center justify-end">
            <Logo />
            <p className="mt-2">{`<${key} />`}</p>
          </div>
        ))}
      </div>
      <h3 className="typography-body-7 mb-2 mt-6 font-bold">Multi-brand logos</h3>
      <h4 className="typography-body-8 mb-4 font-bold">Large</h4>
      <div className="grid grid-cols-4 gap-5">
        {Object.entries(multibrandLargeLogos).map(([key, Logo]) => (
          <>
            <div key={`${key}-${align}`} className=" flex flex-col items-center justify-end">
              <Logo className="border-border box-content border border-dashed" />
              <p className="mt-2">{`<${key} />`}</p>
            </div>
            {align.map(align => (
              <div key={`${key}-${align}`} className=" flex flex-col items-center justify-end">
                <Logo align={align} className="border-border box-content border border-dashed" />
                <p className="mt-2">{`<${key} align=${align} />`}</p>
              </div>
            ))}
          </>
        ))}
      </div>
      <h4 className="typography-body-8 my-4 font-bold">Small</h4>
      <div className="grid grid-cols-4 gap-5">
        {Object.entries(multibrandSmallLogos).map(([key, Logo]) => (
          <>
            <div key={`${key}-${align}`} className=" flex flex-col items-center justify-end">
              <Logo className="border-border box-content border border-dashed" />
              <p className="mt-2">{`<${key} />`}</p>
            </div>
            {align.map(align => (
              <div key={`${key}-${align}`} className=" flex flex-col items-center justify-end">
                <Logo align={align} className="border-border box-content border border-dashed" />
                <p className="mt-2">{`<${key} align=${align} />`}</p>
              </div>
            ))}
          </>
        ))}
      </div>
    </>
  );
};
