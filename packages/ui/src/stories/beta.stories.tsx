import { type Meta, StoryFn } from '@storybook/react-vite';

const meta: Meta = {
  title: '** THIS IS A PRE-RELEASE BUILD OF GEL-NEXT **',
  tags: ['dev'],
  decorators: [(Story: StoryFn) => <Story />],
};
export default meta;

export const PreRelease = () => (
  <div className="p-4">
    <p className="typography-body-1 text-text-body">
      ** THIS IS A PRE-RELEASE BUILD OF GEL-NEXT, THINGS WILL CHANGE **
    </p>
  </div>
);
