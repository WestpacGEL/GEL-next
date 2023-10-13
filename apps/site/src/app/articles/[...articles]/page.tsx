'use client';

import { Container, Grid } from '@westpac/ui';
import Image from 'next/image';

import testImage from '../../../../public/imgs/lego.png';

export default function ComponentPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-white from-25% to-gel-background">
        <Container className=" pt-8 xsl:pt-10 sm:pt-11">
          <Grid className="gap-y-5 xsl:gap-y-6 sm:gap-y-8">
            <div className="col-span-12">
              <h1 className="typography-body-6 mb-2 tracking-[-1px] xsl:typography-body-3 xsl:mb-3">Article Title</h1>
              <p className="text-gel-muted">Article Author</p>
            </div>
            <div className="col-span-12 mb-7 xsl:mb-9">
              <Image alt="" src={testImage} className="block h-auto w-full" />
            </div>
          </Grid>
        </Container>
      </div>
      <Container>
        <Grid>
          <div className="col-span-12 h-screen">Article content goes here</div>
        </Grid>
      </Container>
    </>
  );
}
