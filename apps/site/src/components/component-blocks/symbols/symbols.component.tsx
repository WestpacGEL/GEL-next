'use client';

import { Grid, Item } from '@westpac/ui/grid';
import { Input } from '@westpac/ui/input';
import * as AllLogos from '@westpac/ui/symbol';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

export const Symbols = () => {
  const [search, setSearch] = useState('');

  const filteredSymbols = useMemo(() => {
    return Object.entries(AllLogos).reduce(
      (acc: { Logo: React.FC<AllLogos.SymbolProps>; key: string }[], [logoName, Logo]) => {
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
      <div className="mb-4 bg-light p-4">
        <Grid>
          <Item span={{ initial: 12, sm: 6 }}>
            <div className="flex flex-col items-start sm:flex-row sm:items-center">
              <label className="mb-2 mr-[1rem] sm:mb-0" htmlFor="filter-icons">
                Filter by name
              </label>
              <Input id="filter-icon" value={search} onChange={handleOnChange} className="w-full" />
            </div>
          </Item>
        </Grid>
      </div>
      <Grid>
        <Item span={12}>
          <p className="text-right italic text-muted">{foundText}</p>
        </Item>
        {filteredSymbols.map(({ key, Logo }) => (
          <Item key={key} span={{ initial: 12, sm: 6, md: 4, lg: 3 }} className="flex">
            <div className="mb-2 flex grow flex-col items-center justify-center bg-white px-2 pb-3 pt-6 xsl:mb-4">
              <Logo className="mb-6" />
              <span className="text-[0.6875rem] text-muted">{key}</span>
            </div>
          </Item>
        ))}
      </Grid>
    </div>
  );
};
