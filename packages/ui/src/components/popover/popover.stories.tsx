import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { Field } from '../field/field.component.js';
import { HelpIcon } from '../icon/index.js';
import { Input } from '../input/input.component.js';

import { Popover } from './popover.component.js';

const popoverContent =
  'Small overlays of content for housing secondary information. These are often used to provide explanatory information for complex ideas.';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div>
        <Story />
      </div>
    ),
  ],
  args: {
    content: popoverContent,
    heading: 'Test Heading',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example NOTE: Does not display correctly in story view please check individual story
 */
export const Default: Story = {
  args: {
    children: 'Click Me',
  },
};

/**
 * > Using icon as trigger NOTE: Does not display correctly in story view please check individual story
 */
export const IconTrigger: Story = {
  args: {
    icon: () => <HelpIcon color="hero" />,
  },
};

/**
 * > Default open NOTE: Does not display correctly in story view please check individual story
 */
export const DefaultOpen: Story = {
  args: {
    children: 'Click Me',
    open: true,
  },
};

/**
 * > No heading NOTE: Does not display correctly in story view please check individual story
 */
export const NoHeading: Story = {
  args: {
    children: 'Click Me',
    open: true,
    heading: undefined,
  },
};

/**
 * > Popover trigger as inline link appearance
 */
export const AsInlineLinkAppearance = () => (
  <>
    <h3 className="mb-2 typography-body-7 font-bold text-text-body">Inside paragraph</h3>
    <p className="mb-4 text-text-body">
      {' '}
      This is an example of using a popover that looks like an inline link.{' '}
      <Popover linkStyling heading="Heading" content={popoverContent} size="small">
        Click here.
      </Popover>{' '}
      To test popover.
    </p>
    <h3 className="mb-2 typography-body-7 font-bold text-text-danger">Inside hint</h3>
    <Field
      label="Example with field."
      hintMessage={
        <p className="text-text-body">
          {' '}
          This is an example of using a popover that looks like an inline link.{' '}
          <Popover linkStyling heading="Heading" content={popoverContent} size="small">
            Click here.
          </Popover>
        </p>
      }
    >
      <Input />
    </Field>
  </>
);

/**
 * > Popover trigger as inline link appearance
 */
export const StackingOrderWithPortal = () => (
  <>
    <h3 className="mb-2 typography-body-7 font-bold text-text-body">Inside paragraph</h3>
    <p className="mb-4 text-text-body">
      {' '}
      This is an example of using a popover that looks like an inline link.{' '}
      <Popover portal linkStyling heading="Heading" content={popoverContent} size="small">
        Click here.
      </Popover>{' '}
      To test popover.
    </p>
    <h3 className="mb-2 typography-body-7 font-bold text-text-body">Inside hint</h3>
    <Field
      label="Example with field."
      hintMessage={
        <p>
          {' '}
          This is an example of using a popover that looks like an inline link.{' '}
          <Popover portal linkStyling heading="Heading" content={popoverContent} size="small">
            Click here.
          </Popover>
        </p>
      }
    >
      <Input />
    </Field>
  </>
);

/**
 * > Auto adjustment NOTE: Does not display correctly in story view please check individual story
 */
export const AutoAdjustment = () => (
  <>
    <div className="text-text-body">
      If no placement prop is used the popover will not automatically adjust itself to the top or bottom. It will always
      adjust it self if it is too close to either edge of the screen.
    </div>
    <Popover heading="Heading" content={popoverContent}>
      Auto Bottom Popover
    </Popover>
    <div className="mt-[200px] flex flex-col">
      <div className="flex justify-between">
        <Popover heading="Heading" content={popoverContent}>
          Left Popover
        </Popover>
        <Popover heading="Heading" content={popoverContent}>
          Center Popover
        </Popover>
        <Popover heading="Heading" content={popoverContent}>
          Right Popover
        </Popover>
      </div>
    </div>
  </>
);

/**
 * > Top and bottom popover NOTE: Does not display correctly in story view please check individual story
 */
export const PopoverPlacement = () => (
  <>
    <div className="text-text-body">
      If the placement prop is used the popover will not automatically adjust itself to the top or bottom but will still
      adjust left and right if too close to the edge.
    </div>
    <div className="mt-[200px] flex flex-col space-y-2">
      <div className="flex justify-between">
        <Popover placement="top" heading="Heading" content={popoverContent} open>
          Left Top Popover
        </Popover>
        <Popover placement="top" heading="Heading" content={popoverContent} open>
          Center Top Popover
        </Popover>
        <Popover placement="top" heading="Heading" content={popoverContent} open>
          Right Top Popover
        </Popover>
      </div>
      <div className="flex justify-between">
        <Popover placement="bottom" heading="Heading" content={popoverContent} open>
          Left Bottom Popover
        </Popover>
        <Popover placement="bottom" heading="Heading" content={popoverContent} open>
          Center Bottom Popover
        </Popover>
        <Popover placement="bottom" heading="Heading" content={popoverContent} open>
          Right Bottom Popover
        </Popover>
      </div>
    </div>
  </>
);

/**
 * > Popover trigger as inline link appearance
 */
export const WhenThereIsALongScrollWithPortal = () => (
  <>
    <h3 className="mb-2 typography-body-7 font-bold text-text-body">Inside paragraph</h3>
    {[...Array(20)].map((_, index) => (
      <p key={index} className="text-text-body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident, porro dolor error nemo expedita
        non mollitia est fugiat officiis deleniti harum dignissimos doloribus accusantium maxime optio libero. Ut,
        laboriosam!
      </p>
    ))}
    <p className="mb-4 text-text-body">
      {' '}
      This is an example of using a popover that looks like an inline link.{' '}
      <Popover portal linkStyling heading="Heading" placement="top" content={popoverContent} size="small">
        Click here portal top.
      </Popover>{' '}
      To test popover.
    </p>
    <p className="mb-4 text-text-body">
      {' '}
      This is an example of using a popover that looks like an inline link.{' '}
      <Popover portal linkStyling heading="Heading" placement="bottom" content={popoverContent} size="small">
        Click here portal bottom.
      </Popover>{' '}
      To test popover.
    </p>
    {[...Array(10)].map((_, index) => (
      <p key={index} className="text-text-body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident, porro dolor error nemo expedita
        non mollitia est fugiat officiis deleniti harum dignissimos doloribus accusantium maxime optio libero. Ut,
        laboriosam!
      </p>
    ))}
    <h3 className="mb-2 typography-body-7 font-bold text-text-body">Inside hint</h3>
    <Field
      label="Example with field."
      hintMessage={
        <p className="text-text-body">
          {' '}
          This is an example of using a popover that looks like an inline link.{' '}
          <Popover linkStyling heading="Heading" content={popoverContent} size="small">
            Click here. bottom placement
          </Popover>
        </p>
      }
    >
      <Input />
    </Field>
    {[...Array(10)].map((_, index) => (
      <p className="text-text-body" key={index}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis provident, porro dolor error nemo expedita
        non mollitia est fugiat officiis deleniti harum dignissimos doloribus accusantium maxime optio libero. Ut,
        laboriosam!
      </p>
    ))}
    <h3 className="mb-2 typography-body-7 font-bold text-text-body">Inside hint</h3>
    <Field
      label="Example with field."
      hintMessage={
        <p className="text-text-body">
          {' '}
          This is an example of using a popover that looks like an inline link.{' '}
          <Popover placement="top" linkStyling heading="Heading" content={popoverContent} size="small">
            Click here. top
          </Popover>
        </p>
      }
    >
      <Input />
    </Field>
  </>
);
