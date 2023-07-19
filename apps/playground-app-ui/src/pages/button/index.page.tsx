import { Button } from '@westpac/ui';
import Head from 'next/head';
import React from 'react';

function ButtonPage() {
  return (
    <>
      <Head>
        <title>GEL | Button</title>
      </Head>
      <div>
        <section className="border-b-2 border-b-background p-2">
          <h2 className="typography-body-6 pb-2">Button sizes</h2>
          <Button color="primary" size="xlarge">
            Extra large: 48px
          </Button>
          &nbsp;
          <Button color="primary" size="large">
            Large: 42px
          </Button>
          &nbsp;
          <Button color="primary" size="medium">
            Medium: 36px
          </Button>
          &nbsp;
          <Button color="primary" size="small">
            Small: 30px
          </Button>
        </section>
        <section className="border-b-2 border-b-background p-2">
          <h2 className="typography-body-6 pb-2">Standard buttons</h2>
          <Button color="primary">Primary standard</Button>&nbsp;
          <Button color="hero">Hero standard</Button>&nbsp;
          <Button color="faint">Faint standard</Button>&nbsp;
          <Button color="link">Link</Button>
        </section>
        <section className="border-b-2 border-b-background p-2">
          <h2 className="typography-body-6 pb-2">Soft buttons</h2>
          <Button color="primary-soft">Primary soft</Button>&nbsp;
          <Button color="hero-soft">Hero soft</Button>&nbsp;
          <Button color="faint-soft">Faint soft</Button>
        </section>
        <section className="border-b-2 border-b-background p-2">
          <h2 className="typography-body-6 pb-2">Responsive buttons</h2>
          <p className="my-1">Medium size button becomes Extra large from the MD breakpoint</p>
          <Button size={{ initial: 'medium', md: 'xlarge' }}>Sample button</Button>
          <p className="my-1">
            Small size button becomes medium at the SM breakpoint, large at the MD breakpoint and Extra large at the LG
            breakpoint
          </p>
          <Button size={{ initial: 'small', md: 'large', lg: 'xlarge' }}>Sample button</Button>
        </section>
      </div>
    </>
  );
}

export default ButtonPage;
