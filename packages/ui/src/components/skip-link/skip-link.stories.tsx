import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useRef } from 'react';

import { Button } from '../index.js';

import { SkipLink } from './skip-link.component.js';

const meta: Meta<typeof SkipLink> = {
  title: 'Components/SkipLink',
  component: SkipLink,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="p-10">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default = () => {
  const skipLinkRef = useRef<HTMLAnchorElement>();
  return (
    <>
      <SkipLink href="#skiptohere" ref={skipLinkRef}>
        Skip to lower contents{' '}
      </SkipLink>
      <div>
        ‘It was much pleasanter at home’, thought poor Alice, ‘when one wasn’t always growing larger and smaller, and
        being ordered about by mice and rabbits. I almost wish I hadn’t gone down that rabbit-hole — and yet — and yet —
        it’s rather curious, you know, this sort of life! I do wonder what can have happened to me! When I used to read
        fairy-tales, I fancied that kind of thing never happened, and now here I am in the middle of one! There ought to
        be a book written about me, that there ought!’{' '}
        <h3 id="skiptohere" className="typography-body-7 font-bold p-2">
          Will skip to here
        </h3>{' '}
        ‘It was much pleasanter at home’, thought poor Alice, ‘when one wasn’t always growing larger and smaller, and
        being ordered about by mice and rabbits. I almost wish I hadn’t gone down that rabbit-hole — and yet — and yet —
        it’s rather curious, you know, this sort of life! I do wonder what can have happened to me! When I used to read
        fairy-tales, I fancied that kind of thing never happened, and now here I am in the middle of one! There ought to
        be a book written about me, that there ought!’ ‘It was much pleasanter at home’, thought poor Alice, ‘when one
        wasn’t always growing larger and smaller, and being ordered about by mice and rabbits. I almost wish I hadn’t
        gone down that rabbit-hole — and yet — and yet — it’s rather curious, you know, this sort of life! I do wonder
        what can have happened to me! When I used to read fairy-tales, I fancied that kind of thing never happened, and
        now here I am in the middle of one! There ought to be a book written about me, that there ought!’ ‘It was much
        pleasanter at home’, thought poor Alice, ‘when one wasn’t always growing larger and smaller, and being ordered
        about by mice and rabbits. I almost wish I hadn’t gone down that rabbit-hole — and yet — and yet — it’s rather
        curious, you know, this sort of life! I do wonder what can have happened to me! When I used to read fairy-tales,
        I fancied that kind of thing never happened, and now here I am in the middle of one! There ought to be a book
        written about me, that there ought!’
      </div>
      <Button onClick={() => skipLinkRef.current?.focus()}>Open content skipper</Button>
    </>
  );
};
