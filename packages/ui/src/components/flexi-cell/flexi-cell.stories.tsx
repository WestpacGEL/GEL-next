/* eslint-disable @next/next/no-img-element */
import { type Meta, StoryFn } from '@storybook/react-vite';
import NextLinkModule from 'next/link.js';
import { type ComponentPropsWithoutRef, useState } from 'react';

import { Button } from '../button/button.component.js';
import { GiftIcon } from '../icon/index.js';
import { Badge, FlexiCellBody, Grid, GridContainer, GridItem } from '../index.js';

import { FlexiCellHint } from './components/flexi-cell-hint/flexi-cell-hint.component.js';
import { FlexiCellLabel } from './components/flexi-cell-label/flexi-cell-label.component.js';
import { FlexiCell } from './flexi-cell.component.js';

const NextLink = NextLinkModule.default;

const meta: Meta<typeof FlexiCell> = {
  title: 'Components/FlexiCell',
  component: FlexiCell,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  argTypes: {
    after: {
      description: 'Renders an element on the right',
      type: { name: 'string' },
    },
    before: {
      description: 'Renders an element on the left',
      type: { name: 'string' },
    },
    children: {
      description: 'The middle content of FlexiCell',
      type: { name: 'string' },
    },
    href: {
      description: 'href in case it is an "a" tag',
      type: { name: 'string' },
    },
    /**
     * The native tag that flexicell will be rendered
     */
    // tag?: keyof JSX.IntrinsicElements;
    withArrow: {
      description: 'Adds an arrow on top right',
      type: { name: 'boolean' },
    },
    withBorder: {
      description: 'Adds a border radius and a border',
      type: { name: 'boolean' },
    },
  },
};

const imgString = 'https://www.westpac.com.au/content/dam/public/gel/images/house-demo-image.png';

export default meta;

/**
 * > Dual action
 *
 * The body is a native link, while the separate save button performs an independent action.
 * No custom tag is supplied: FlexiCell uses its default div wrapper.
 */
export function DualAction() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <FlexiCell
        dualAction
        href="#account-details"
        withBorder
        after={
          <Button look="link" aria-pressed={saved} onClick={() => setSaved(value => !value)}>
            {saved ? 'Unsave account' : 'Save account'}
          </Button>
        }
      >
        <FlexiCellLabel tag="h3">Everyday account</FlexiCellLabel>
        <FlexiCellHint>View account details</FlexiCellHint>
      </FlexiCell>
      <p role="status" className="typography-body-10 text-text-body">
        {saved ? 'Account saved' : 'Account not saved'}
      </p>
      <div id="account-details" tabIndex={-1} className="rounded-2xl bg-surface-muted-pale p-2">
        <h3 className="typography-body-9 font-medium text-text-body">Account details</h3>
        <p className="typography-body-10 text-text-body">
          The primary link navigates here without changing the saved state.
        </p>
      </div>
    </div>
  );
}
DualAction.storyName = 'Dual action';

/**
 * > NextLink
 *
 * Renders FlexiCell using Next.js Link through the tag prop with NextLink-specific controls.
 * Storybook has no Next.js router, so history, scrolling and prefetch behaviour must be tested in a Next.js app.
 */
export const WithNextLink: StoryFn<ComponentPropsWithoutRef<typeof NextLink>> = args => {
  return (
    <FlexiCell {...args} tag={NextLink} withBorder withArrow>
      <FlexiCellLabel tag="h3">Next.js link</FlexiCellLabel>
      <FlexiCellHint>Rendered using NextLink through the tag prop.</FlexiCellHint>
    </FlexiCell>
  );
};
WithNextLink.storyName = 'NextLink';
WithNextLink.args = {
  href: '#next-link',
  prefetch: false,
  replace: true,
  scroll: false,
};
WithNextLink.argTypes = {
  prefetch: {
    control: 'boolean',
    description: 'Controls Next.js route prefetching. Requires a Next.js router and a production build.',
    table: { category: 'NextLink' },
  },
  replace: {
    control: 'boolean',
    description: 'Replaces the current browser history entry instead of adding a new one during Next.js navigation.',
    table: { category: 'NextLink' },
  },
  scroll: {
    control: 'boolean',
    description: 'Set to false to preserve the scroll position during Next.js navigation.',
    table: { category: 'NextLink' },
  },
};
WithNextLink.parameters = {
  docs: {
    description: {
      story:
        'Use the NextLink controls to configure the props forwarded through FlexiCell. Storybook has no Next.js router; verify history, scrolling and prefetch behaviour in a Next.js app.',
    },
  },
};

/**
 * > Symbol - Horizontal
 *
 * This tile has a responsive content layout:
 *
 * - Xs - Sm: Symbol is stacked above labels, tile padding 12px
 * - Md +: Symbol is inline to the left of the labels tile padding 18px
 *
 * Change the preview size of this screen to demonstrate.
 */
export const SymbolHorizontal = () => {
  return (
    <>
      {new Array(3).fill(null).map((_, index) => (
        <FlexiCell key={index} tag="a" href="#" withBorder withArrow size={{ initial: 'default', md: 'large' }}>
          <div className="flex flex-col gap-2 md:flex-row">
            <GiftIcon look="outlined" color="hero" />
            <div className="flex flex-col gap-1">
              <FlexiCellLabel tag="h3">Label</FlexiCellLabel>
              <FlexiCellHint>Descriptive information</FlexiCellHint>
            </div>
          </div>
        </FlexiCell>
      ))}
    </>
  );
};
SymbolHorizontal.storyName = 'Symbol - Horizontal';

/**
 * > Symbol - Vertical
 *
 * This tile has a responsive content layout:
 *
 * - Xs - Sm: Tile padding 12px
 * - Md +: Tile padding 18px
 *
 * Change the preview size of this screen to demonstrate.
 */
export const SymbolVertical = () => {
  return (
    <GridContainer fixed>
      <Grid>
        {new Array(3).fill(null).map((_, index) => (
          <GridItem span={4} key={index}>
            <FlexiCell
              className="min-h-[17.5rem]"
              tag="a"
              href="#"
              withBorder
              size={{ initial: 'default', md: 'large' }}
            >
              <div>
                <div className="mb-2 flex justify-start md:mb-3">
                  <GiftIcon look="outlined" color="hero" />
                </div>
                <div className="flex flex-col">
                  <FlexiCellLabel tag="h3" className="mb-1">
                    Title
                  </FlexiCellLabel>
                  <FlexiCellHint>Description</FlexiCellHint>
                </div>
              </div>
            </FlexiCell>
          </GridItem>
        ))}
      </Grid>
    </GridContainer>
  );
};
SymbolVertical.storyName = 'Symbol - Vertical';

/**
 * > Image bleed - Horizontal
 *
 * This tile has a responsive content layout:
 *
 * - Xs - Sm: Tile padding 12px
 * - Md +: Tile padding 18px
 *
 * Change the preview size of this screen to demonstrate.
 */
export const ImageBleedHorizontal = () => {
  return (
    <>
      {new Array(3).fill(null).map((_, index) => (
        <FlexiCell
          body={false}
          key={index}
          tag="a"
          href="#"
          withBorder
          size={{ initial: 'default', md: 'large' }}
          className="overflow-hidden"
        >
          <div className="flex gap-2">
            <img
              src={imgString}
              alt="background"
              className="-my-2 -ml-2 block w-[10rem] object-cover md:-my-3 md:-ml-3"
            />
            <FlexiCellBody>
              <FlexiCellLabel tag="h3">Title</FlexiCellLabel>
              <FlexiCellHint>Description</FlexiCellHint>
              <div className="mt-3 flex gap-1">
                <Badge color="hero">Label</Badge>
                <Badge color="faint" soft>
                  Label
                </Badge>
              </div>
            </FlexiCellBody>
          </div>
        </FlexiCell>
      ))}
    </>
  );
};
ImageBleedHorizontal.storyName = 'Image bleed - Horizontal';

/**
 * > Image padded - Horizontal
 *
 * This tile has a responsive content layout:
 *
 * - Xs - Sm: Tile padding 12px
 * - Md +: Tile padding 18px
 *
 * Change the preview size of this screen to demonstrate.
 */
export const ImagePaddedHorizontal = () => {
  return (
    <>
      {new Array(3).fill(null).map((_, index) => (
        <FlexiCell body={false} key={index} tag="a" href="#" withBorder size={{ initial: 'default', md: 'large' }}>
          <div className="flex gap-2">
            <img src={imgString} alt="background" className="block w-[8rem] object-cover" />
            <FlexiCellBody>
              <FlexiCellLabel tag="h3">Title</FlexiCellLabel>
              <FlexiCellHint>Description</FlexiCellHint>
              <div className="mt-3 flex gap-1">
                <Badge color="hero">Label</Badge>
                <Badge color="faint" soft>
                  Label
                </Badge>
              </div>
            </FlexiCellBody>
          </div>
        </FlexiCell>
      ))}
    </>
  );
};
ImagePaddedHorizontal.storyName = 'Image padded - Horizontal';

/**
 * > Image bleed - Vertical
 *
 * This tile has a responsive content layout:
 *
 * - Xs - Sm: Tile padding 12px
 * - Md +: Tile padding 18px
 *
 * Change the preview size of this screen to demonstrate.
 */
export const ImageBleedVertical = () => {
  return (
    <GridContainer>
      <Grid>
        {new Array(3).fill(null).map((_, index) => (
          <GridItem key={index} span={4}>
            <FlexiCell
              className="overflow-hidden"
              body={false}
              key={index}
              tag="a"
              href="#"
              withBorder
              size={{ initial: 'default', md: 'large' }}
            >
              <div className="flex flex-col gap-2">
                <div className="-mx-2 -mt-2 md:-mx-3 md:-mt-3">
                  <img src={imgString} alt="background" className="block h-[8.75rem] w-full object-cover" />
                </div>
                <FlexiCellBody>
                  <FlexiCellLabel tag="h3">Title</FlexiCellLabel>
                  <FlexiCellHint>Description</FlexiCellHint>
                  <div className="mt-3 flex gap-1">
                    <Badge color="hero">Label</Badge>
                    <Badge color="faint" soft>
                      Label
                    </Badge>
                  </div>
                </FlexiCellBody>
              </div>
            </FlexiCell>
          </GridItem>
        ))}
      </Grid>
    </GridContainer>
  );
};
ImageBleedVertical.storyName = 'Image bleed - Vertical';

/**
 * > Image padded - Vertical
 *
 * This tile has a responsive content layout:
 *
 * - Xs - Sm: Tile padding 12px
 * - Md +: Tile padding 18px
 *
 * Change the preview size of this screen to demonstrate.
 */
export const ImagePaddedVertical = () => {
  return (
    <GridContainer>
      <Grid>
        {new Array(3).fill(null).map((_, index) => (
          <GridItem key={index} span={4}>
            <FlexiCell body tag="a" href="#" withBorder size={{ initial: 'default', md: 'large' }}>
              <div className="flex flex-col gap-2">
                <img src={imgString} alt="background" className="block h-[8.75rem] w-full object-cover" />
                <FlexiCellLabel tag="h3">Title</FlexiCellLabel>
                <FlexiCellHint>Description</FlexiCellHint>
                <div className="mt-3 flex gap-1">
                  <Badge color="hero">Label</Badge>
                  <Badge color="faint" soft>
                    Label
                  </Badge>
                </div>
              </div>
            </FlexiCell>
          </GridItem>
        ))}
      </Grid>
    </GridContainer>
  );
};
ImagePaddedVertical.storyName = 'Image padded - Vertical';

export const EventInferenceCheck = () => {
  return (
    <>
      <FlexiCell
        tag="a"
        href="#test"
        withBorder
        onClick={event => {
          const anchor: HTMLAnchorElement = event.currentTarget;
          console.log(anchor.href);
        }}
      >
        <FlexiCellLabel tag="span">Native anchor</FlexiCellLabel>
        <FlexiCellHint tag="span">Click to log the destination URL</FlexiCellHint>
      </FlexiCell>

      <FlexiCell
        tag="button"
        withBorder
        className="w-full text-left"
        onClick={event => {
          const button: HTMLButtonElement = event.currentTarget;
          console.log(button.disabled);
        }}
      >
        <FlexiCellLabel tag="span">Native button</FlexiCellLabel>
        <FlexiCellHint tag="span">Click to log whether the button is disabled</FlexiCellHint>
      </FlexiCell>

      <FlexiCell
        withBorder
        onClick={event => {
          const div: HTMLDivElement = event.currentTarget;
          console.log(div);
        }}
      >
        <FlexiCellLabel tag="span">Default div</FlexiCellLabel>
        <FlexiCellHint tag="span">Click to log the div element</FlexiCellHint>
      </FlexiCell>

      <FlexiCell
        tag={NextLink}
        href="#test"
        withBorder
        onClick={event => {
          const anchor: HTMLAnchorElement = event.currentTarget;
          console.log(anchor.href);
        }}
      >
        <FlexiCellLabel tag="span">NextLink</FlexiCellLabel>
        <FlexiCellHint tag="span">Click to log the NextLink destination URL</FlexiCellHint>
      </FlexiCell>
    </>
  );
};
