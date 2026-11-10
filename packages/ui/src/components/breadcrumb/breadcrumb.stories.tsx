import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { ComponentPropsWithoutRef, forwardRef, useState } from 'react';

import { Breadcrumb } from './breadcrumb.component.js';
import { BreadcrumbItem } from './components/breadcrumb-item/breadcrumb-item.component.js';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  argTypes: {
    className: {
      description: 'String to override base style',
      type: { name: 'string' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    children: [
      <BreadcrumbItem key="one" tag="button" onClick={() => alert('Folder 1')}>
        About us
      </BreadcrumbItem>,
      <BreadcrumbItem key="two" tag="a" href="#nogo">
        Innovation
      </BreadcrumbItem>,
      <BreadcrumbItem key="three" tag="a" href="#loko">
        Principal investments
      </BreadcrumbItem>,
    ],
  },
};

/**
 * > Default usage example
 */
export const DisabledInTheMiddle: Story = {
  args: {
    children: [
      <BreadcrumbItem key="one" tag="button" onClick={() => alert('Folder 1')}>
        About us
      </BreadcrumbItem>,
      <BreadcrumbItem key="two" tag="a" href="#nogo" isDisabled>
        Innovation
      </BreadcrumbItem>,
      <BreadcrumbItem key="three" tag="a" href="#loko">
        Principal investments
      </BreadcrumbItem>,
    ],
  },
};

/**
 * > Renders items as native anchors with `tag="a"`. The last item is automatically marked as the current page and
 * > rendered as text.
 */
export const AnchorTag = () => (
  <Breadcrumb>
    <BreadcrumbItem tag="a" href="#home">
      Home
    </BreadcrumbItem>
    <BreadcrumbItem tag="a" href="#personal">
      Personal
    </BreadcrumbItem>
    <BreadcrumbItem tag="a" href="#credit-cards">
      Credit cards
    </BreadcrumbItem>
  </Breadcrumb>
);

type RouterLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & { to: string };

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(({ to, ...props }, ref) => (
  <a ref={ref} {...props} href={to} />
));

/**
 * > Demonstrates rendering items as a custom routing component (e.g. `tag={NextLink}`) while retaining GEL styling
 * > and behaviour. The component's own props, such as `to`, are type checked against the `tag`.
 */
export const PolymorphicBreadcrumb = () => (
  <Breadcrumb>
    <BreadcrumbItem tag={RouterLink} to="#home">
      Home
    </BreadcrumbItem>
    <BreadcrumbItem tag={RouterLink} to="#personal">
      Personal
    </BreadcrumbItem>
    <BreadcrumbItem tag={RouterLink} to="#credit-cards">
      Credit cards
    </BreadcrumbItem>
  </Breadcrumb>
);

const SpanLink = forwardRef<HTMLSpanElement, ComponentPropsWithoutRef<'span'>>((props, ref) => (
  <span ref={ref} {...props} />
));

/**
 * > Use `elementType` when the custom component does not render an anchor so React Aria applies the correct semantics.
 */
export const PolymorphicNonAnchorBreadcrumb = () => {
  const [lastActivated, setLastActivated] = useState<string>();

  return (
    <div className="flex flex-col items-start gap-2">
      <Breadcrumb>
        <BreadcrumbItem tag={SpanLink} elementType="span" onPress={() => setLastActivated('Home')}>
          Home
        </BreadcrumbItem>
        <BreadcrumbItem tag={SpanLink} elementType="span" onPress={() => setLastActivated('Personal')}>
          Personal
        </BreadcrumbItem>
        <BreadcrumbItem tag={SpanLink} elementType="span">
          Credit cards
        </BreadcrumbItem>
      </Breadcrumb>
      <p aria-live="polite" className="typography-body-10 text-text-body">
        Last activated: {lastActivated ?? 'none'}
      </p>
    </div>
  );
};
