'use client';

import { Button } from '@westpac/ui/button';
import { Grid, GridItem } from '@westpac/ui/grid';
import { DownloadIcon } from '@westpac/ui/icon';
import { Input } from '@westpac/ui/input';
import * as AllLogos from '@westpac/ui/symbol';
import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';

export const Logos = () => {
  const [search, setSearch] = useState('');

  const filteredLogos = useMemo(() => {
    return Object.entries(AllLogos).reduce(
      (acc: { Logo: FC<AllLogos.SymbolProps>; key: string }[], [logoName, Logo]) => {
        if (logoName.toUpperCase().indexOf(search.toUpperCase()) === -1 || logoName.includes('Symbol')) {
          return acc;
        }
        return [...acc, { key: logoName, Logo }];
      },
      [],
    );
  }, [search]);

  const foundText = filteredLogos.length === 1 ? 'Found 1 logo' : `Found ${filteredLogos.length} logos`;

  const handleOnChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  }, []);

  return (
    <div>
      <div
        className={`
          mb-4 rounded-2xl border border-border-muted-soft
          bg-background-white p-4
        `}
      >
        <Grid>
          <GridItem span={{ initial: 12, sm: 6 }}>
            <div
              className={`
                flex flex-col items-start
                sm:flex-row sm:items-center
              `}
            >
              <label
                className={`
                  mr-[1rem] mb-2
                  sm:mb-0
                `}
                htmlFor="filter-icons"
              >
                Filter by name
              </label>
              <Input id="filter-icon" value={search} onChange={handleOnChange} className={`w-full`} />
            </div>
          </GridItem>
          <GridItem span={{ initial: 12, sm: 6 }}>
            <input type="hidden" name="asset" value="logo" />
            {/* TODO: It has to change to GEL_Logos afterwards */}
            <Button tag="a" look="primary" iconBefore={DownloadIcon} soft href="/assets/GEL_Logos_Symbols.zip" download>
              Download all SVGs
            </Button>
          </GridItem>
        </Grid>
      </div>
      <Grid>
        <GridItem span={12}>
          <p className="text-right text-text-muted italic">{foundText}</p>
        </GridItem>
        {filteredLogos.map(({ key, Logo }) => (
          <GridItem key={key} span={{ initial: 12, sm: 6, md: 4, lg: 3 }} className={`flex`}>
            <div
              className={`
                mb-2 flex w-full grow flex-col items-center justify-center
                rounded-2xl border border-border-muted-soft
                bg-background-white px-2 pt-6 pb-3
                xsl:mb-4
              `}
            >
              <Logo className="mb-6 max-w-full grow" />
              <span className="text-[0.6875rem] text-text-muted">{key}</span>
            </div>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};
