import { type Meta, StoryFn } from '@storybook/react';

import { GiftIcon, PadlockIcon, TickIcon } from '../icon/index.js';
import { Badge, FlexiCellBody, Grid, GridContainer, GridItem } from '../index.js';

import { FlexiCellAdornment } from './components/flexi-cell-adornment/flexi-cell-adornment.component.js';
import { FlexiCellHint } from './components/flexi-cell-hint/flexi-cell-hint.component.js';
import { FlexiCellLabel } from './components/flexi-cell-label/flexi-cell-label.component.js';
import { FlexiCell } from './flexi-cell.component.js';

const responsiveString = ' (Responsive)';

const meta: Meta<typeof FlexiCell> = {
  title: 'Components/FlexiCell/Patterns',
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

export default meta;

/**
 * > Simple tile (Vertical stack)
 */
export const SimpleTileVerticalStack = () => {
  return (
    <>
      {new Array(3).fill(null).map((_, index) => (
        <FlexiCell key={index} tag="a" href="#" withBorder withArrow>
          <div className="flex flex-row gap-2 md:flex-col">
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

/**
 * > Simple tile (Horizontal stack)
 */
export const SimpleTileHorizontalStack = () => {
  return (
    <GridContainer fixed>
      <Grid>
        {new Array(3).fill(null).map((_, index) => (
          <GridItem span={4} key={index}>
            <FlexiCell className="min-h-[17.5rem]" tag="a" href="#" withBorder>
              <div>
                <div className="flex justify-end">
                  <GiftIcon look="outlined" color="hero" />
                </div>
                <div className="flex flex-col gap-1">
                  <FlexiCellHint tag="h4" className="typography-body-11 mb-2">
                    SUB-LABEL
                  </FlexiCellHint>
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

/**
 * > Edge to edge Image tile (Vertical stack)
 */
export const EdgeToEdgeImageTileVerticalStack = () => {
  return (
    <>
      {new Array(3).fill(null).map((_, index) => (
        <FlexiCell body={false} key={index} tag="a" href="#" withBorder>
          <div className="flex gap-2">
            <img
              src="https://plus.unsplash.com/premium_photo-1681400202759-8b5f70e3c8a4?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="background"
              className="-my-2 -ml-2 block w-[10rem] object-cover"
            />
            <FlexiCellBody>
              <FlexiCellHint className="mb-2">SUB-LABEL</FlexiCellHint>
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

/**
 * > Padded Image tile (Vertical stack)
 */
export const PaddedImageTileVerticalStack = () => {
  return (
    <>
      {new Array(3).fill(null).map((_, index) => (
        <FlexiCell body={false} key={index} tag="a" href="#" withBorder>
          <div className="flex gap-2">
            <img
              src="https://plus.unsplash.com/premium_photo-1681400202759-8b5f70e3c8a4?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="background"
              className="block w-[8rem] object-cover"
            />
            <FlexiCellBody>
              <FlexiCellHint className="mb-2">SUB-LABEL</FlexiCellHint>
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

/**
 * > Padded Image tile (Horizontal stack)
 */
export const PaddedImageTileHorizontalStack = () => {
  return (
    <>
      {new Array(3).fill(null).map((_, index) => (
        <FlexiCell body key={index} tag="a" href="#" withBorder>
          <div className="flex flex-col gap-2">
            <img
              src="https://plus.unsplash.com/premium_photo-1681400202759-8b5f70e3c8a4?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="background"
              className="block h-[8.75rem] w-full object-cover"
            />
            <FlexiCellHint className="mb-2">SUB-LABEL</FlexiCellHint>
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
      ))}
    </>
  );
};

/**
 * > Edge to edge Image tile (Horizontal stack)
 */
export const EdgeToEdgeImageTileHorizontalStack = () => {
  return (
    <>
      {new Array(3).fill(null).map((_, index) => (
        <FlexiCell body={false} key={index} tag="a" href="#" withBorder>
          <div className="flex flex-col gap-2">
            <div className="-mx-2 -mt-2">
              <img
                src="https://plus.unsplash.com/premium_photo-1681400202759-8b5f70e3c8a4?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="background"
                className="block h-[8.75rem] w-full object-cover"
              />
            </div>
            <FlexiCellBody>
              <FlexiCellHint className="mb-2">SUB-LABEL</FlexiCellHint>
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

/**
 * > Status tiles
 */
export const StatusTiles = () => {
  const title = 'Westpac specials and product offers';
  const subtitle = 'Discounts and cashback from select merchants & products offers from Westpac';

  return (
    <>
      {new Array(3).fill(null).map((_, index) => (
        <FlexiCell
          tag="a"
          href="#"
          withBorder
          key={index}
          before={
            <FlexiCellAdornment className="max-sm:hidden">
              <PadlockIcon look="outlined" color="hero" />
            </FlexiCellAdornment>
          }
          after={
            <>
              <Badge className="h-fit w-fit" color="success">
                Completed
              </Badge>
              <TickIcon color="success" />
            </>
          }
          size={{ initial: 'default', sm: 'large' }}
        >
          <PadlockIcon className="mb-1 sm:hidden" look="outlined" color="hero" />
          <FlexiCellLabel className="text-hero" tag="h4">
            {title + responsiveString}
          </FlexiCellLabel>
          <FlexiCellHint>{subtitle}</FlexiCellHint>
        </FlexiCell>
      ))}
    </>
  );
};
