import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { ArrowRightIcon, PdfFileIcon } from '../icon/index.js';

import { Link } from './link.component.js';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    children: "Look, I'm a default link",
    href: '#',
  },
};

const SIZES = ['xsmall', 'small', 'medium', 'large', 'xlarge'] as const;

/**
 * > Standalone link with iconSizes, arrowRight is default but can be overridden.
 * > If no icon is passed it defaults to ArrowRightIcon in the iconBefore position
 */
export const Standalone = () => (
  <div className="space-y-1">
    <h1 className="font-bold text-text-body">Default</h1>
    <Link href="#">Look I&#39;m a standalone link</Link>
    <h1 className="font-bold text-text-body">Icon Before override</h1>
    <Link href="#" iconBefore={PdfFileIcon}>
      Look I&#39;m a standalone link
    </Link>
    <h1 className="font-bold text-text-body">Icon Before override</h1>
    <Link href="#" iconAfter={ArrowRightIcon}>
      Look I&#39;m a standalone link
    </Link>
  </div>
);

/**
 * > Inline link example
 */
export const Inline = () => (
  <div className="space-y-1">
    <p className="typography-body-10 text-text-body">
      Lorem ipsum dolor{' '}
      <Link href="#" type="inline">
        look, I&#39;m an inline link
      </Link>{' '}
      sit amet consectetur, adipisicing elit. Libero facilis odit voluptate reprehenderit laborum numquam ex optio
      doloribus magni repudiandae vero fugiat iusto tempora debitis sunt laboriosam nobis, ut voluptatum?
    </p>
    <p className="typography-body-10 text-text-body">
      Lorem ipsum dolor{' '}
      <Link href="#" type="inline" underline={false}>
        look, I&#39;m an inline link with no underline
      </Link>{' '}
      sit amet consectetur, adipisicing elit. Libero facilis odit voluptate reprehenderit laborum numquam ex optio
      doloribus magni repudiandae vero fugiat iusto tempora debitis sunt laboriosam nobis, ut voluptatum?
    </p>
    <p className="typography-body-10 text-text-body">
      Lorem ipsum dolor{' '}
      <Link href="#" type="inline" iconBefore={PdfFileIcon}>
        look, I&#39;m an inline link
      </Link>{' '}
      sit amet consectetur, adipisicing elit. Libero facilis odit voluptate reprehenderit laborum numquam ex optio
      doloribus magni repudiandae vero fugiat iusto tempora debitis sunt laboriosam nobis, ut voluptatum?
    </p>
    <p className="typography-body-10 text-text-body">
      Lorem ipsum dolor{' '}
      <Link href="#" type="inline" iconAfter={PdfFileIcon}>
        look, I&#39;m an inline link
      </Link>{' '}
      sit amet consectetur, adipisicing elit. Libero facilis odit voluptate reprehenderit laborum numquam ex optio
      doloribus magni repudiandae vero fugiat iusto tempora debitis sunt laboriosam nobis, ut voluptatum?
    </p>
    <Link href="#" type="inline" iconBefore={PdfFileIcon}>
      look, I&#39;m an inline link
    </Link>
  </div>
);

/**
 * > example of icon sizes
 */
export const IconSizes = () => (
  <div className="space-y-1">
    {SIZES.map(size => (
      <div key={size}>
        <h1 className="font-bold">{size}</h1>
        <Link href="#" iconSize={size} iconBefore={PdfFileIcon} iconAfter={PdfFileIcon}>
          Look I&#39;m a standalone link
        </Link>
        <p className="typography-body-10 text-text-body">
          Lorem ipsum dolor{' '}
          <Link href="#" type="inline" iconSize={size} iconBefore={PdfFileIcon} iconAfter={PdfFileIcon}>
            look, I&#39;m an inline link
          </Link>{' '}
          sit amet consectetur, adipisicing elit. Libero facilis odit voluptate reprehenderit laborum numquam ex optio
          doloribus magni repudiandae vero fugiat iusto tempora debitis sunt laboriosam nobis, ut voluptatum?
        </p>
      </div>
    ))}
  </div>
);
