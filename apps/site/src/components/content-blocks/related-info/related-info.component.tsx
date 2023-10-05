import { Container, Grid, Item } from '@westpac/ui';
import { ArrowRightIcon, CubeIcon } from '@westpac/ui/icon';
import NextLink, { LinkProps } from 'next/link';

import { Section } from '../section';
import { Heading } from '../typography';

export function RelatedInfo() {
  return (
    <Section className="bg-white">
      <Container>
        <Heading className="mb-4 sm:mb-7">Related information</Heading>
        <Grid>
          <Item span={{ initial: 12, sm: 4 }}>
            <h3 className="typography-body-8 flex items-center justify-between border-b border-neutral pb-3 font-bold">
              Components
              <CubeIcon color="muted" />
            </h3>
            <ul>
              <li>
                <Link href="#">Colours</Link>
              </li>
              <li>
                <Link href="#">Icons</Link>
              </li>
            </ul>
          </Item>
        </Grid>
      </Container>
    </Section>
  );
}

function Link({ children, ...props }: React.PropsWithChildren<LinkProps>) {
  return (
    <NextLink
      className="typography-body-10 flex min-h-[3.4375rem] items-center justify-between border-b border-border py-1 hover:text-primary hover:underline"
      {...props}
    >
      {children}
      <ArrowRightIcon color="primary" />
    </NextLink>
  );
}
