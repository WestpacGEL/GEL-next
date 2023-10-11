import { type Meta, StoryFn } from '@storybook/react';

const meta: Meta = {
  title: 'Foundation/Typography',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

/**
 * Brand fonts
 */
export const BrandFont = () => {
  const typographyBrandScale = [
    { className: 'typography-brand-1', size: '60' },
    { className: 'typography-brand-2', size: '54' },
    { className: 'typography-brand-3', size: '48' },
    { className: 'typography-brand-4', size: '42' },
    { className: 'typography-brand-5', size: '36' },
    { className: 'typography-brand-6', size: '30' },
    { className: 'typography-brand-7', size: '24' },
    { className: 'typography-brand-8', size: '18' },
    { className: 'typography-brand-9', size: '16' },
    { className: 'typography-brand-10', size: '14' },
  ];
  return typographyBrandScale.map(i => (
    <div key={i.size} className="pb-1">
      <p className={i.className}>Type size: {i.size}</p>
    </div>
  ));
};

/**
 * Body fonts
 */
export const BodyFont = () => {
  const typographyBodyScale = [
    { className: 'typography-body-1', size: '60' },
    { className: 'typography-body-2', size: '54' },
    { className: 'typography-body-3', size: '48' },
    { className: 'typography-body-4', size: '42' },
    { className: 'typography-body-5', size: '36' },
    { className: 'typography-body-6', size: '30' },
    { className: 'typography-body-7', size: '24' },
    { className: 'typography-body-8', size: '18' },
    { className: 'typography-body-9', size: '16' },
    { className: 'typography-body-10', size: '14' },
  ];
  return typographyBodyScale.map(i => (
    <div key={i.size} className="pb-1">
      <p className={i.className}>Type size: {i.size}</p>
    </div>
  ));
};
