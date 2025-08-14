import { Grid, GridItem } from '@westpac/ui/grid';
import { AtmIcon, BusinessPersonIcon, EftposIcon, PadlockIcon, SecurityIcon, VerifiedIcon } from '@westpac/ui/icon';
import { Fragment, ReactNode } from 'react';

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
          <Item>
            <AtmIcon size={s.size} />
          </Item>
          <Item>
            <EftposIcon size={s.size} />
          </Item>
          <Item>
            <PadlockIcon size={s.size} />
          </Item>
          <Item>
            <BusinessPersonIcon size={s.size} />
          </Item>
          <Item>
            <SecurityIcon size={s.size} />
          </Item>
          <Item>
            <VerifiedIcon size={s.size} />
          </Item>
        </Fragment>
      ))}
    </Grid>
  );
}

function Item({ children }: { children: ReactNode }) {
  return <GridItem className="justify-self-center text-text-muted">{children}</GridItem>;
}
