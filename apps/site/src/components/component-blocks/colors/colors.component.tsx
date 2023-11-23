'use client';

import { Grid, Item } from '@westpac/ui';
import { type BrandKey } from '@westpac/ui/tailwind';
import { useSearchParams } from 'next/navigation';

import { Svg } from '@/components/svg';

import { getColorPalette } from './colors.utils';

export function Colors({ palette }: { palette: string }) {
  const searchParams = useSearchParams();
  const brand = (searchParams.get('brand') ?? 'wbc') as BrandKey;
  const colorPalette = getColorPalette({ brand, palette });
  return (
    <Grid tag="ul" className="mt-2">
      {colorPalette.map(color => (
        <Item key={color.name} tag="li" span={{ intial: 12, xsl: 6, sm: 4, md: 3 }}>
          <div className="flex flex-row items-center bg-white p-4 xsl:flex-col xsl:items-stretch">
            <Svg viewBox="0 0 132 132" width={132} height={132}>
              <circle fill={color.hex} cx="66" cy="66" r="66" />
            </Svg>
            <div className="typography-body-10 ml-4 flex flex-col xsl:ml-0 xsl:mt-2 xsl:px-2">
              <strong className="mb-0.5">{color.name}</strong>
              <span className="mb-0.5">{color.hex}</span>
              <span>{color.rgb}</span>
            </div>
          </div>
        </Item>
      ))}
    </Grid>
  );
}
