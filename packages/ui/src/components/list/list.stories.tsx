import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { AndroidIcon } from '../icon/index.js';

import { List } from './list.component.js';

import { ListItem } from './index.js';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

const LOOKS = ['primary', 'hero', 'neutral', 'success', 'danger', 'link'] as const;
const TYPES = ['bullet', 'link', 'tick', 'cross', 'unstyled', 'icon', 'ordered'] as const;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    children: [
      <ListItem key="one">Styled list</ListItem>,
      <ListItem key="two">Styled list</ListItem>,
      <ListItem key="three">Styled list</ListItem>,
    ],
  },
};

/**
 * > Type of list
 */
export const Types = () =>
  TYPES.map(type => (
    <div className="mb-2" key={type}>
      <h1 className="typography-body-8">{type}</h1>
      <List type={type} icon={type === 'icon' ? AndroidIcon : undefined}>
        <ListItem href={type === 'link' ? '#' : undefined}>Styled {type} list</ListItem>
        <ListItem href={type === 'link' ? '#' : undefined}>Styled {type} list</ListItem>
        <ListItem href={type === 'link' ? '#' : undefined}>Styled {type} list</ListItem>
        <List icon={type === 'link' ? AndroidIcon : undefined}>
          <ListItem>Styled {type} list</ListItem>
          <ListItem>Styled {type} list</ListItem>
          <ListItem>Styled {type} list</ListItem>
        </List>
        <ListItem>Styled {type} list</ListItem>
      </List>
    </div>
  ));

/**
 * > Type of list
 */
export const Looks = () =>
  LOOKS.map(look => (
    <div className="mb-2" key={look}>
      <h1 className="typography-body-8">{look}</h1>
      <List look={look} type="bullet">
        <ListItem>Styled {look} list</ListItem>
        <ListItem>Styled {look} list</ListItem>
        <ListItem>Styled {look} list</ListItem>
        <List icon={look === 'link' ? AndroidIcon : undefined}>
          <ListItem>Styled {look} list</ListItem>
          <ListItem>Styled {look} list</ListItem>
          <ListItem>Styled {look} list</ListItem>
        </List>
        <ListItem>Styled {look} list</ListItem>
      </List>
    </div>
  ));

/**
 * Nested list
 */
export const Nested = () => (
  <div>
    <List type="bullet" assistiveText="test">
      <ListItem>Styled list</ListItem>
      <ListItem>Styled list</ListItem>
      <ListItem>Styled list</ListItem>
      <List>
        <ListItem>Styled list</ListItem>
        <ListItem>Styled list</ListItem>
        <ListItem>Styled list</ListItem>
        <List nested={0}>
          <ListItem>Styled list</ListItem>
          <ListItem>Styled list</ListItem>
          <ListItem>Styled list</ListItem>
          <List>
            <ListItem>Styled list</ListItem>
            <ListItem>Styled list</ListItem>
            <ListItem>Styled list</ListItem>
          </List>
        </List>
      </List>
    </List>
  </div>
);

/**
 * List spacing
 */
export const Spacing = () => (
  <div>
    <h1 className="typography-body-10 mb-2">Medium</h1>
    <List type="bullet" className="mb-4" spacing="medium">
      <ListItem>Styled bullet list</ListItem>
      <ListItem>Styled bullet list</ListItem>
      <ListItem>Styled bullet list</ListItem>
    </List>
    <h1 className="typography-body-10 mb-2">Large</h1>
    <List type="bullet" className="mb-4" spacing="large">
      <ListItem>Styled bullet list</ListItem>
      <ListItem>Styled bullet list</ListItem>
      <ListItem>Styled bullet list</ListItem>
    </List>
  </div>
);

const CustomLink = (props: any) => {
  // eslint-disable-next-line no-console
  console.info('TEST');
  return <a {...props}>{props.children}</a>;
};

/**
 * Custom Component
 */
export const CustomComponent = () => (
  <div>
    <h1 className="typography-body-10 mb-2">Title</h1>
    <List type="link" className="mb-4" spacing="medium">
      <ListItem linkTag={CustomLink} href="#href1">
        Styled bullet list
      </ListItem>
      <ListItem linkTag={CustomLink} href="#href2">
        Styled bullet list
      </ListItem>
      <ListItem linkTag={CustomLink} href="#href3">
        Styled bullet list
      </ListItem>
    </List>
  </div>
);
