'use client';

import { Grid, GridItem } from '@westpac/ui';
import { useDarkMode } from '@westpac/ui/hook';
import { type BrandKey } from '@westpac/ui/tailwind';
import { useParams } from 'next/navigation';

import { Svg } from '@/components/svg';

import { getColorPalette } from './colors.utils';
import { useEffect, useState } from 'react';
import { useThemeMode } from '@/hooks/theme-mode.hook';

export function Colors({ palette, tab }: { palette: string; tab?: string }) {
  const params = useParams();
  const { getMode } = useDarkMode();
  const { mode: providerMode } = useThemeMode();
  const brand = (params.brand ?? 'wbc') as BrandKey;
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMode(getMode() ?? 'light');
  }, [providerMode]);

  const colorPalette = getColorPalette({ brand: `${brand}-${mode}`, palette });
  return (
    <Grid tag="ul" className="mt-2">
      {palette === 'data_visualisation'
        ? colorPalette.map(color => (
            <GridItem key={color.name} tag="li" span={{ initial: 12, xsl: 6, sm: 4, md: 4 }}>
              <div className="flex flex-row items-center bg-surface-white-pale p-4 xsl:flex-col xsl:items-stretch ">
                <Svg viewBox="0 0 132 132" width={132} height={132}>
                  <circle fill={color.hex} cx="66" cy="66" r="66" />
                </Svg>
                <div className="typography-body-10 ml-4 flex flex-col xsl:ml-0 xsl:mt-2 xsl:px-2">
                  <strong className="mb-0.5">{color.name}</strong>
                  <span className="mb-0.5">{color.hex}</span>
                  <span className={tab === 'code' ? 'mb-0.5' : ''}>{color.rgb}</span>
                  {tab === 'code' && (
                    <>
                      <div className="mb-0.5">
                        <strong>Tailwind class</strong>
                      </div>
                      <span>
                        {color.name.includes('opacity')
                          ? color.name.toLowerCase().replace('-opacity', '-solid/30')
                          : color.name.toLowerCase()}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </GridItem>
          ))
        : colorPalette.map(color => (
            <GridItem key={color.name} tag="li" span={{ initial: 12, xsl: 6, sm: 4, md: 3 }}>
              <div className="flex flex-row items-center bg-surface-white-pale p-4 xsl:flex-col xsl:items-stretch">
                <Svg viewBox="0 0 132 132" width={132} height={132}>
                  <circle fill={color.hex} cx="66" cy="66" r="66" />
                </Svg>
                <div className="typography-body-10 ml-4 flex flex-col xsl:ml-0 xsl:mt-2 xsl:px-2">
                  <strong className="mb-0.5">{color.name}</strong>
                  <span className="mb-0.5">{color.hex}</span>
                  <span className={tab === 'code' ? 'mb-0.5' : ''}>{color.rgb}</span>
                  {tab === 'code' && (
                    <>
                      <div className="mb-0.5">
                        <strong>Tailwind class</strong>
                      </div>
                      <span>{color.name.toLowerCase()}</span>
                    </>
                  )}
                </div>
              </div>
            </GridItem>
          ))}
    </Grid>
  );
}
