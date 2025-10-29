'use client';

import { Button } from '@westpac/ui/button';
import { Grid, GridItem } from '@westpac/ui/grid';
import * as AllIcons from '@westpac/ui/icon';
import { Input } from '@westpac/ui/input';
import { Select } from '@westpac/ui/select';
import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';

export const Icons = () => {
  const [search, setSearch] = useState('');
  const [look, setLook] = useState<AllIcons.IconLook>('filled');
  const filteredIcons = useMemo(() => {
    return Object.entries(AllIcons).reduce((acc: { Icon: FC<AllIcons.IconProps>; key: string }[], [iconName, Icon]) => {
      if (iconName.toUpperCase().indexOf(search.toUpperCase()) === -1 || iconName === 'Icon') {
        return acc;
      }
      return [...acc, { key: iconName, Icon }];
    }, []);
  }, [search]);

  const foundText = filteredIcons.length === 1 ? 'Found 1 icon' : `Found ${filteredIcons.length} icons`;

  const handleOnChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  }, []);

  const handleLookChange = useCallback(({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setLook(value as AllIcons.IconLook);
  }, []);

  return (
    <div>
      <div className="border-border-muted-soft bg-background-white-pale mb-4 flex flex-wrap gap-3 rounded-2xl border p-4 align-bottom">
        <div className="flex w-full shrink-0 grow flex-col items-start sm:w-auto sm:flex-row sm:items-center">
          <label className="mr-[1rem] mb-2 sm:mb-0" htmlFor="filter-icons">
            Filter by name
          </label>
          <Input id="filter-icon" value={search} onChange={handleOnChange} className="w-full" />
        </div>
        <div className="xsl:w-auto flex w-full flex-col items-start sm:flex-row sm:items-center">
          <label className="mr-[1rem] mb-2 sm:mb-0" htmlFor="icon-look">
            Look
          </label>
          <Select id="icon-look" value={look} onChange={handleLookChange} className="w-full sm:w-fit">
            <option value="filled">Filled</option>
            <option value="outlined">Outlined</option>
          </Select>
        </div>
        <div className="flex w-full items-end sm:w-auto">
          <input type="hidden" name="asset" value="icon" />
          <Button tag="a" look="primary" iconBefore={AllIcons.DownloadIcon} soft href="/assets/GEL_Icons.zip" download>
            Download all SVGs
          </Button>
        </div>
      </div>
      <Grid>
        <GridItem span={12}>
          <p className="text-text-muted text-right italic">{foundText}</p>
        </GridItem>
        {filteredIcons.map(({ key, Icon }) => (
          <GridItem key={key} span={{ initial: 12, sm: 3, lg: 3, xl: 2 }} className="flex flex-col">
            <div className="border-border-muted-soft bg-background-white-pale xsl:mb-4 mb-2 flex flex-1 flex-col items-center justify-center rounded-2xl border px-2 pt-6 pb-3">
              <Icon look={look} className="mb-6" color="muted" />
              <span className="text-text-muted w-full max-w-full text-[0.6875rem] break-words whitespace-normal text-center">
                {key}
              </span>
            </div>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};
