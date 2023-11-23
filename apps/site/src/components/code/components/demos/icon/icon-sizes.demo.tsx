import { Grid, Item } from '@westpac/ui/grid';
import { AtmIcon, BusinessPersonIcon, EftposIcon, PadlockIcon, SecurityIcon, VerifiedIcon } from '@westpac/ui/icon';
import { Fragment } from 'react';

type IconSize = {
  size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  text: string;
};

export function IconSizesDemo() {
  const sizes: IconSize[] = [
    { text: 'Extra small - 12px', size: 'xsmall' },
    { text: 'Small - 18px', size: 'small' },
    { text: 'Medium - 24px', size: 'medium' },
    { text: 'Large - 36px', size: 'large' },
    { text: 'Extra large - 48px', size: 'xlarge' },
  ];
  return (
    <Grid className="auto-rows-fr grid-cols-[repeat(7,_1fr)] items-center">
      {sizes.map(s => (
        <Fragment key={s.size}>
          <Item>{s.text}</Item>
          <GridItem>
            <AtmIcon size={s.size} />
          </GridItem>
          <GridItem>
            <EftposIcon size={s.size} />
          </GridItem>
          <GridItem>
            <PadlockIcon size={s.size} />
          </GridItem>
          <GridItem>
            <BusinessPersonIcon size={s.size} />
          </GridItem>
          <GridItem>
            <SecurityIcon size={s.size} />
          </GridItem>
          <GridItem>
            <VerifiedIcon size={s.size} />
          </GridItem>
        </Fragment>
      ))}
    </Grid>
  );
}

function GridItem({ children }: { children: React.ReactNode }) {
  return <Item className="justify-self-center text-muted">{children}</Item>;
}
