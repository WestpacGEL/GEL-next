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
    <p className="typography-body-1 text-primary underline">Warning:</p>
    <p className="typography-body-1 text-primary pb-6">
      This Storybook is for version 0.x of GEL. It is highly recommended to upgrade to {'>'}=1.0.0 at the earliest
      opportunity.
    </p>
    <p className="typography-body-7">
      This is a development environment only. Not all the components in this site are approved and ready for use. If you
      are looking for components that are approved by brand, UX, accessibility and GEL please see the{' '}
      <Link href="https://gel-next-site-git-version-0x-westpacgel.vercel.app/design-system/wbc" type="inline">
        Gel Design system
      </Link>
    </p>
  </div>
);
