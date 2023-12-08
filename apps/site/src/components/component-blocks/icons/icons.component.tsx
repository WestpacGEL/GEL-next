'use client';

import { Button } from '@westpac/ui/button';
import { Grid, Item } from '@westpac/ui/grid';
import * as AllIcons from '@westpac/ui/icon';
import { Input } from '@westpac/ui/input';
import { Select } from '@westpac/ui/select';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

export const Icons = () => {
  const [search, setSearch] = useState('');
  const [look, setLook] = useState<AllIcons.IconLook>('filled');
  const filteredIcons = useMemo(() => {
    return Object.entries(AllIcons).reduce(
      (acc: { Icon: React.FC<AllIcons.IconProps>; key: string }[], [iconName, Icon]) => {
        if (iconName.toUpperCase().indexOf(search.toUpperCase()) === -1 || iconName === 'Icon') {
          return acc;
        }
        return [...acc, { key: iconName, Icon }];
      },
      [],
    );
  }, [search]);

  const foundText = filteredIcons.length === 1 ? 'Found 1 icon' : `Found ${filteredIcons.length} icons`;

  const handleOnChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  }, []);

  const handleLookChange = useCallback(({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setLook(value as AllIcons.IconLook);
  }, []);

  return (
    <form action="/api/assets" method="POST">
      <div className="mb-4 flex flex-wrap gap-3 bg-light p-4 align-bottom">
        <div className="flex w-full shrink-0 grow flex-col items-start sm:w-auto sm:flex-row sm:items-center">
          <label className="mb-2 mr-[1rem] sm:mb-0" htmlFor="filter-icons">
            Filter by name
          </label>
          <Input id="filter-icon" value={search} onChange={handleOnChange} className="w-full" />
        </div>
        <div className="flex w-full flex-col items-start xsl:w-auto sm:flex-row sm:items-center">
          <label className="mb-2 mr-[1rem] sm:mb-0" htmlFor="icon-look">
            Look
          </label>
          <Select id="icon-look" value={look} onChange={handleLookChange} className="w-full sm:w-fit">
            <option value="filled">Filled</option>
            <option value="outlined">Outlined</option>
          </Select>
        </div>
        <div className="flex w-full items-end sm:w-auto">
          <input type="hidden" name="asset" value="icon" />
          <Button look="primary" iconBefore={AllIcons.DownloadIcon} soft type="submit">
            Download all SVGs
          </Button>
        </div>
      </div>
      <Grid>
        <Item span={12}>
          <p className="text-right italic text-muted">{foundText}</p>
        </Item>
        {filteredIcons.map(({ key, Icon }) => (
          <Item key={key} span={{ initial: 12, sm: 3, lg: 2 }}>
            <div className="mb-2 flex flex-col items-center justify-center bg-white px-2 pb-3 pt-6 xsl:mb-4">
              <Icon look={look} className="mb-6" color="muted" />
              <span className="text-[0.6875rem] text-muted">{key}</span>
            </div>
          </Item>
        ))}
      </Grid>
    </form>
  );
};
