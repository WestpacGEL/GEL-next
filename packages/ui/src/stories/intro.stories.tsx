import { type Meta, StoryFn } from '@storybook/react-vite';

import { Link } from '../components/index.js';

const meta: Meta = {
  title: 'Attention',
  tags: ['dev'],
  decorators: [(Story: StoryFn) => <Story />],
};
export default meta;

export const Attention = () => (
  <div className="p-4">
    <p className="typography-body-1">
      This is a development environment only. Not all the components in this site are approved and ready for use. If you
      are looking for components that are approved by brand, UX, accessibility and GEL please see the{' '}
      <Link href="https://gel.westpacgroup.com.au/design-system/wbc?b=WBC" type="inline">
        Gel Design system
      </Link>
    </p>
  </div>
);
