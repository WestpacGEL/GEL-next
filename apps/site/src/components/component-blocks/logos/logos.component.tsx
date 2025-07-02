/* eslint-disable sonarjs/todo-tag */
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
      <div className="mb-4 bg-light p-4">
        <Grid>
          <GridItem span={{ initial: 12, sm: 6 }}>
            <div className="flex flex-col items-start sm:flex-row sm:items-center">
              <label className="mb-2 mr-[1rem] sm:mb-0" htmlFor="filter-icons">
                Filter by name
              </label>
              <Input id="filter-icon" value={search} onChange={handleOnChange} className="w-full" />
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
          <p className="text-right italic text-muted">{foundText}</p>
        </GridItem>
        {filteredLogos.map(({ key, Logo }) => (
          <GridItem key={key} span={{ initial: 12, sm: 6, md: 4, lg: 3 }} className="flex">
            <div className="mb-2 flex grow flex-col items-center justify-center bg-white px-2 pb-3 pt-6 xsl:mb-4">
              <Logo className="mb-6 grow" />
              <span className="text-[0.6875rem] text-muted">{key}</span>
            </div>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};
