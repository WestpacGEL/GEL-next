import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { clsx } from 'clsx';

import { Pictogram } from './pictogram.component.js';

import * as AllPictograms from './index.js';
import { PictogramProps, WBCBankCardPictogram } from './index.js';

const AllPictogramsExample = (props: PictogramProps) => {
  const { mode } = props;
  const informativePictograms = Object.entries(AllPictograms).reduce(
    (curr, [key, symbol]) => (!key.startsWith('WBC') ? { ...curr, [key]: symbol } : curr),
    {} as { [index: string]: React.FC<PictogramProps> },
  );
  return (
    <div className={clsx('grid grid-cols-5 gap-5', mode === 'light' && 'bg-hero text-white')}>
      {Object.entries(informativePictograms).map(([key, Pictogram]) => (
        <div key={key} className="flex flex-col items-center justify-end">
          <Pictogram {...props} />
          <p className="mt-2">{key}</p>
        </div>
      ))}
    </div>
  );
};

const meta: Meta<typeof Pictogram> = {
  title: 'Foundation/Pictograms',
  component: AllPictogramsExample,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  argTypes: {
    mode: {
      description: 'mode',
      type: { name: 'enum', value: ['duo', 'dark', 'light'] },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {},
};

export const Decorative = () => <WBCBankCardPictogram />;
