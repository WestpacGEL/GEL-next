'use client';

import { Badge, Grid, GridItem } from '@westpac/ui';
import { useBreakpoint, useDarkMode } from '@westpac/ui/hook';
import { useCallback, useEffect, useState } from 'react';

import { Svg } from '@/components/svg';
import { useThemeMode } from '@/hooks/theme-mode.hook';

import { styles as tokenStyles } from './tokens.styles';
import { processAllBrands, TokenItem, TokensData } from './tokens.utils';

export function Tokens({ title, tokens }: TokensData) {
  const { getBrand } = useDarkMode();
  const [brand, setBrand] = useState('Westpac');
  const breakpoint = useBreakpoint();

  const styles = tokenStyles({ size: breakpoint });

  const { mode } = useThemeMode();
  const convertBrandName = useCallback(() => {
    switch (getBrand()) {
      case 'stg':
        return 'StGeorge';
      case 'bsa':
        return 'Bank SA';
      case 'bom':
        return 'Bank of Melbourne';
      default:
        return 'Westpac';
    }
  }, [getBrand]);

  useEffect(() => {
    setBrand(convertBrandName());
  }, [convertBrandName]);

  const circleToRender = (token: TokenItem) => {
    const fillValue = token.fillColour ? processAllBrands(brand, `${mode}-mode`, token.fillColour) : 'none';
    const strokeValue = token.strokeColour ? processAllBrands(brand, `${mode}-mode`, token.strokeColour) : undefined;
    const textValue = token.textColour ? processAllBrands(brand, `${mode}-mode`, token.textColour) : undefined;
    const borderValue =
      token.circleType === 'border' ? processAllBrands(brand, `${mode}-mode`, token.tokenName) : undefined;
    switch (token.circleType) {
      case 'borderColour':
        return (
          <Svg viewBox="0 0 66 66" width={66} height={66} className="overflow-visible">
            <circle cx="33" cy="33" r="30" fill={fillValue} stroke={strokeValue} strokeWidth="6" />
          </Svg>
        );
      case 'textColour':
        return (
          <>
            <Svg viewBox="0 0 66 66" width={66} height={66} className="overflow-visible">
              <circle cx="33" cy="33" r="30" fill={fillValue} stroke={strokeValue} />
              <text x="34" y="49" textAnchor="middle" fontSize="42" fontWeight={900} fill={textValue}>
                T
              </text>
            </Svg>
          </>
        );
      case 'border':
        return (
          <div
            className={`flex max-h-11 min-h-11 max-w-11 min-w-11 items-center justify-center border border-border-info-mild bg-surface-info-faint ${token.tokenName}`}
          >
            <p className="text-[14px] text-text-info">{borderValue === '999px' ? 'full' : borderValue}</p>
          </div>
        );
      default:
        return (
          <Svg viewBox="0 0 66 66" width={66} height={66} className="overflow-visible">
            <circle cx="33" cy="33" r="33" fill={fillValue} stroke={strokeValue} />
          </Svg>
        );
    }
  };

  return (
    <Grid tag="ul" className={styles.container()}>
      {title && <h3 className="col-span-full pb-3 typography-body-8 font-bold text-text-body">{title}</h3>}
      {tokens &&
        tokens.map(token => {
          return (
            <GridItem
              key={token.tokenName}
              tag="li"
              span={12}
              className="border-b-1 border-border-muted-soft py-4 pr-4 last:border-b-0"
            >
              <div className="flex flex-row gap-3 bg-background-white">
                {circleToRender(token)}
                <div className="flex flex-col gap-1 typography-body-10">
                  <strong className="mb-0.5">{token.tokenName}</strong>
                  <p>{token.description}</p>
                  {(token.restricted || token.new) && (
                    <div className="flex gap-2 pt-1">
                      {token.restricted && <Badge color="muted">Restricted</Badge>}
                      {token.new && <Badge color="info">New</Badge>}
                    </div>
                  )}
                </div>
              </div>
            </GridItem>
          );
        })}
    </Grid>
  );
}
