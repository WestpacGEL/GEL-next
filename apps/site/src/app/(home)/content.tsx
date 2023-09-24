'use client';

import { Container, Grid } from '@westpac/ui';
import { ArrowRightIcon } from '@westpac/ui/icon';
import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

// temp: importing directly to work with next image, app hangs when using public directory url for some reason..
import testImage from '../../../public/imgs/lego.png';

const Tile = ({ className }: { className?: string }) => (
  <Link href="/articles/test" className="group flex h-full flex-col">
    <Image
      src={testImage}
      alt=""
      className={clsx(
        'aspect-[1092/563] w-full object-cover transition-[border-radius] duration-200 ease-[cubic-bezier(0.13,0.00,0.11,1.00)] group-hover:rounded-[200px] group-hover:transition-[border-radius] group-hover:duration-300 group-hover:ease-[cubic-bezier(0.13,0.00,0.11,1.00)]',
        className,
      )}
    />
    <div className="flex grow flex-col border-[#CFD8DC] pl-1 pt-4 xsl:border-r xsl:pt-7">
      <h4 className="typography-body-9 mb-2 uppercase leading-[1.12]">Test Article</h4>
      <p className="typography-body-9 mb-2 mr-4">I am an article description</p>
      <ArrowRightIcon className="ml-auto mt-auto block text-[#1976D2] xsl:mr-1" />
    </div>
  </Link>
);

export function Content() {
  return (
    <Container className="mb-8 mt-5 xsl:mt-6 sm:mt-8 md:mt-9 lg:mt-10">
      <Grid>
        {/* 2x6 */}
        <div className="col-span-12 xsl:col-span-6">
          <Tile />
        </div>
        <div className="col-span-12 xsl:col-span-6">
          <Tile />
        </div>
        {/* 3x4 */}
        <div className="col-span-12 xsl:col-span-4">
          <Tile className="xsl:aspect-[708/559]" />
        </div>
        <div className="col-span-12 xsl:col-span-4">
          <Tile className="xsl:aspect-[708/559]" />
        </div>
        <div className="col-span-12 xsl:col-span-4">
          <Tile className="xsl:aspect-[708/559]" />
        </div>
        {/* 1x8 - 1x4 */}
        <div className="col-span-12 xsl:col-span-8">
          <Tile className="xsl:aspect-[484/185]" />
        </div>
        <div className="col-span-12 xsl:col-span-4">
          <Tile className="xsl:aspect-[708/559]" />
        </div>
      </Grid>
    </Container>
  );
}
