import { type Meta, StoryFn } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Foundation/Borders',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;

const borderRadii = [
  { label: 'none', className: 'rounded-none' },
  { label: 'sm', className: 'rounded-sm' },
  { label: 'md', className: 'rounded-md' },
  { label: 'lg', className: 'rounded-lg' },
  { label: 'xl', className: 'rounded-xl' },
  { label: '2xl', className: 'rounded-2xl' },
  { label: '3xl', className: 'rounded-3xl' },
  { label: '4xl', className: 'rounded-4xl' },
  { label: '5xl', className: 'rounded-5xl' },
  { label: 'full', className: 'rounded-full' },
];

export const BorderRadius = () => (
  <div className="flex flex-wrap gap-6">
    {borderRadii.map(({ label, className }) => (
      <div key={label} className="flex min-w-[100px] flex-col items-center">
        <div className={`h-16 w-16 border-2 border-border-muted-mild bg-surface-muted-faint ${className} mb-2`} />
        <code className="typography-body-10">{className}</code>
      </div>
    ))}
  </div>
);
