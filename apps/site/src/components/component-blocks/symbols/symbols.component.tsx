'use client';

import { Grid, GridItem } from '@westpac/ui/grid';
import { Input } from '@westpac/ui/input';
import * as AllLogos from '@westpac/ui/symbol';
import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';

export const Symbols = () => {
  const [search, setSearch] = useState('');

  const filteredSymbols = useMemo(() => {
    return Object.entries(AllLogos).reduce(
      (acc: { Logo: FC<AllLogos.SymbolProps>; key: string }[], [logoName, Logo]) => {
        if (logoName.toUpperCase().indexOf(search.toUpperCase()) === -1 || !logoName.includes('Symbol')) {
          return acc;
        }
        return [...acc, { key: logoName, Logo }];
      },
      [],
    );
  }, [search]);

  const foundText = filteredSymbols.length === 1 ? 'Found 1 symbol' : `Found ${filteredSymbols.length} symbols`;

  const handleOnChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  }, []);

  return (
    <div>
      <div className="border-border-muted-soft bg-background-white-pale mb-4 rounded-2xl border p-4">
        <Grid>
          <GridItem span={{ initial: 12, sm: 6 }}>
            <div className="flex flex-col items-start sm:flex-row sm:items-center">
              <label className="mr-[1rem] mb-2 sm:mb-0" htmlFor="filter-icons">
                Filter by name
              </label>
              <Input id="filter-icon" value={search} onChange={handleOnChange} className="w-full" />
            </div>
          </GridItem>
        </Grid>
      </div>
      <Grid>
        <GridItem span={12}>
          <p className="text-text-muted text-right italic">{foundText}</p>
        </GridItem>
        {filteredSymbols.map(({ key, Logo }) => (
          <GridItem key={key} span={{ initial: 12, sm: 6, md: 4, lg: 3 }} className="flex">
            <div className="border-border-muted-soft bg-background-white-pale xsl:mb-4 mb-2 flex w-full grow flex-col items-center justify-center rounded-2xl border px-2 pt-6 pb-3">
              <Logo className="mb-6 max-w-full grow" />
              <span className="text-text-muted text-[0.6875rem]">{key}</span>
            </div>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};
