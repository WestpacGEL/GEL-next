import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Foundation/Focus Outline',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Example of how focus outlines should look
 */
export const FocusOutline: Story = {
  render: () => (
    <div className="p-10">
      <p className="typography-body-7">
        When creating a custom component that isn't part of the GEL library or using an HTML tag you should include the
        following style. This is needed to create a consistent accessibility experience <br />
        <br />
        <code className="border border-border bg-background">focus-visible:focus-outline</code>
      </p>
      <h1 className="typography-body-9 pb-2 pt-4">
        No <code className="border border-border bg-background">focus-visible:focus-outline</code> example
      </h1>
      <a href="#" className="underline">
        This is a link without the correct styling focus outline
      </a>
      <h1 className="typography-body-9 pb-2 pt-4">
        <code className="border border-border bg-background">focus-visible:focus-outline</code> example
      </h1>
      <a href="#" className="underline focus-visible:focus-outline">
        This is a link without the correct styling focus outline
      </a>
    </div>
  ),
};
