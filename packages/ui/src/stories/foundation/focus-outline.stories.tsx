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
        <code className="border border-border-muted-mild bg-background-pale-faint">focus-visible:focus-outline</code>
      </p>
      <h1 className="pt-4 pb-2 typography-body-9">
        No <code className="border border-border-muted-mild bg-background-pale-faint">focus-visible:focus-outline</code>{' '}
        example
      </h1>
      <a href="#" className="underline">
        This is a link without the correct styling focus outline
      </a>
      <h1 className="pt-4 pb-2 typography-body-9">
        <code className="border border-border-muted-mild bg-background-pale-faint">focus-visible:focus-outline</code>{' '}
        example
      </h1>
      <a href="#" className="underline focus-visible:focus-outline">
        This is a link without the correct styling focus outline
      </a>
      <p className="pt-4 typography-body-7 text-text-warning">Notice with Tailwind 4 Upgrade</p>
      <p className="py-2 typography-body-9">
        There may be situations where you will need to use{' '}
        <code className="border border-border-muted-mild bg-background-pale-faint">!focus-outline</code> to override
        some styling due to a change in Tailwind 4 that added outline-color to transition styling. This will be most
        common if you are using the{' '}
        <code className="border border-border-muted-mild bg-background-pale-faint">form-control</code> styling and
        should be handled in components exported by GEL already.
      </p>
    </div>
  ),
};
