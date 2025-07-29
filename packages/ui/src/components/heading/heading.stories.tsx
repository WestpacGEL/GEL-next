import { type Meta, StoryFn } from '@storybook/react-vite';

import { Heading } from './heading.component.js';
import { HeadingProps } from './heading.types.js';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/**
 * > Default usage example
 */
export const Default = () => {
  return sizes.map(size => (
    <Heading key={size} size={size as HeadingProps['size']}>
      Heading size: {size}
    </Heading>
  ));
};

/**
 * > With tag prop
 */
export const WithTag = () => {
  return sizes.map(size => (
    <Heading key={size} tag={size > 1 ? 'h1' : 'h2'} size={size as HeadingProps['size']}>
      Heading tag:{size > 1 ? ' h1' : ' h2'} size: {size}
    </Heading>
  ));
};

/**
 * > Brand usage example
 */
export const Brand = () => {
  return sizes.map(size => (
    <Heading key={size} size={size as HeadingProps['size']} brandHeading>
      Heading size: {size}
    </Heading>
  ));
};

/**
 * > With tag and brand prop
 */
export const WithTagAndBrand = () => {
  return sizes.map(size => (
    <Heading key={size} tag={size > 1 ? 'h1' : 'h2'} size={size as HeadingProps['size']} brandHeading>
      Heading tag:{size > 1 ? ' h1' : ' h2'} size: {size}
    </Heading>
  ));
};

/**
 * > Uppercase usage example
 */
export const Uppercase = () => {
  return sizes.map(size => (
    <Heading key={size} size={size as HeadingProps['size']} uppercase>
      Heading size: {size}
    </Heading>
  ));
};

/**
 * > Responsive usage example
 */
export const Responsive = () => {
  return (
    <>
      <Heading size={{ xsl: 10, sm: 8, md: 6, lg: 4, xl: 2 }}>
        Heading size: [xsl: 10, sm: 8, md: 6, lg: 4, xl: 2 ]
      </Heading>
      <Heading size={{ xsl: 10, xl: 2 }}>Heading size: [xsl: 10, xl: 2]</Heading>
    </>
  );
};

/**
 * > Responsive with tag usage example
 */
export const ResponsiveWithTag = () => {
  return (
    <>
      <Heading tag="h2" size={{ xsl: 10, sm: 8, md: 6, lg: 4, xl: 2 }}>
        Heading tag: h2 size: [xsl: 10, sm: 8, md: 6, lg: 4, xl: 2 ]
      </Heading>
      <Heading tag="h2" size={{ xsl: 10, xl: 2 }}>
        Heading tag: h2 size: [xsl: 10, xl: 2]
      </Heading>
    </>
  );
};
