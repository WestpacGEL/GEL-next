import { Container, Grid, Item } from '@westpac/ui';
import { ArrowRightIcon, CubeIcon } from '@westpac/ui/icon';
import NextLink, { LinkProps } from 'next/link';

import { Section } from '../content-blocks/section';
import { Heading } from '../document-renderer/components';

import { RelatedInfoProps } from './related-info.types';

export function RelatedInfo({ relatedComponents = [] }: RelatedInfoProps) {
  return (
    <Section className="bg-white">
      <Container>
        <Heading level={2} className="mb-4 sm:mb-7">
          Related information
        </Heading>
        <Grid>
          <Item span={{ initial: 12, sm: 4 }}>
            <h3 className="typography-body-8 flex items-center justify-between border-b border-neutral pb-3 font-bold">
              Components
              <CubeIcon color="muted" />
            </h3>
            <ul>
              {relatedComponents.map(relatedComponent => {
                const componentURL = relatedComponent.split('/').reverse()[0];
                const componentName = componentURL.split('-').join(' ');
                return (
                  <li key={relatedComponent}>
                    <Link href={`/design-system/components/${componentURL}?brand=wbc`}>{componentName}</Link>
                  </li>
                );
              })}
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
