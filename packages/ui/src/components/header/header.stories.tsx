import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { Button } from '../index.js';

import { Header } from './header.component.js';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {},
  argTypes: {
    brand: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  // for underscored property

  render: ({ brand: _, ...rest }, { globals: { theme } }) => {
    const brand = theme ? theme.toLowerCase() : 'wbc';
    return (
      <>
        <Header brand={brand === 'btfg' ? 'wbc' : brand} {...rest} />
      </>
    );
  },
};

/**
 * > Example of header with no logo link
 */
export const NoLogoLink: Story = {
  render: ({ brand: _, ...rest }, { globals: { theme } }) => {
    const brand = theme ? theme.toLowerCase() : 'wbc';
    return (
      <>
        <Header disableLogoLink brand={brand === 'btfg' ? 'wbc' : brand} {...rest} />
      </>
    );
  },
};

/**
 * > Example with a button on the right
 */
export const RightButton: Story = {
  // for underscored property

  render: ({ brand: _, ...rest }, { globals: { theme } }) => {
    const brand = theme ? theme.toLowerCase() : 'wbc';
    return (
      <>
        <Header brand={brand === 'btfg' ? 'wbc' : brand} {...rest}>
          <Button look="faint" size={{ initial: 'small', sm: 'medium' }} soft onClick={() => alert('clicked')}>
            Sign Out
          </Button>
        </Header>
      </>
    );
  },
};

/**
 * > Example of logo centering when XSL
 */
export const CenterAtXS: Story = {
  // for underscored property

  render: ({ brand: _, ...rest }, { globals: { theme } }) => {
    const brand = theme ? theme.toLowerCase() : 'wbc';
    return (
      <>
        <Header logoCenter brand={brand === 'btfg' ? 'wbc' : brand} {...rest} />
      </>
    );
  },
};

/**
 * > Example of logo with onClick
 */
export const LogoOnClick: Story = {
  // for underscored property

  render: ({ brand: _, ...rest }, { globals: { theme } }) => {
    const brand = theme ? theme.toLowerCase() : 'wbc';
    return (
      <>
        {/* eslint-disable-next-line no-console */}
        <Header logoOnClick={() => console.log('clicked')} brand={brand === 'btfg' ? 'wbc' : brand} {...rest} />
      </>
    );
  },
};

/**
 * > Example of header with skiplink
 */
export const LogoWithSkipLink: Story = {
  // for underscored property

  render: ({ brand: _, ...rest }, { globals: { theme } }) => {
    const brand = theme ? theme.toLowerCase() : 'wbc';
    return (
      <>
        <Header skipToContentId="#" brand={brand === 'btfg' ? 'wbc' : brand} {...rest} />
      </>
    );
  },
};

/**
 * > Example fixed header. Does not show correctly in Docs view as it will show how it looks when scrolled, check specifc story for non-scrolled view
 */
export const Fixed: Story = {
  // for underscored property

  render: ({ brand: _, ...rest }, { globals: { theme } }) => {
    const brand = theme ? theme.toLowerCase() : 'wbc';
    return (
      <div className="h-10">
        <Header fixed brand={brand === 'btfg' ? 'wbc' : brand} {...rest} />
      </div>
    );
  },
};

/**
 * > Example of header with arrow button
 */
export const WithArrow: Story = {
  // for underscored property

  render: ({ brand: _, ...rest }, { globals: { theme } }) => {
    const brand = theme ? theme.toLowerCase() : 'wbc';
    return (
      <>
        <Header leftIcon="arrow" brand={brand === 'btfg' ? 'wbc' : brand} {...rest} />
      </>
    );
  },
};

/**
 * > Example of header with arrow button with onClick
 */
export const WithArrowOnClick: Story = {
  // for underscored property

  render: ({ brand: _, ...rest }, { globals: { theme } }) => {
    const brand = theme ? theme.toLowerCase() : 'wbc';
    return (
      <>
        <Header
          leftIcon="arrow"
          // eslint-disable-next-line no-console
          leftOnClick={() => console.log('clicked')}
          brand={brand === 'btfg' ? 'wbc' : brand}
          {...rest}
        />
      </>
    );
  },
};

/**
 * > Example of header with hamburger (only visible below xsl)
 */
export const WithHamburger: Story = {
  // for underscored property

  render: ({ brand: _, ...rest }, { globals: { theme } }) => {
    const brand = theme ? theme.toLowerCase() : 'wbc';
    return (
      <>
        <Header leftIcon="hamburger" brand={brand === 'btfg' ? 'wbc' : brand} {...rest} />
        <p>NOTE: Hamburger button only shows in sm breakpoint or smaller</p>
      </>
    );
  },
};

/**
 * > Example of header with hamburger (only visible below xsl) with onClick
 */
export const WithHamburgerOnClick: Story = {
  // for underscored property

  render: ({ brand: _, ...rest }, { globals: { theme } }) => {
    const brand = theme ? theme.toLowerCase() : 'wbc';
    return (
      <>
        <Header
          leftIcon="hamburger"
          // eslint-disable-next-line no-console
          leftOnClick={() => console.log('clicked')}
          brand={brand === 'btfg' ? 'wbc' : brand}
          {...rest}
        />
        <p>NOTE: Hamburger button only shows in sm breakpoint or smaller</p>
      </>
    );
  },
};
