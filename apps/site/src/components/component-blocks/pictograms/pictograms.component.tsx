'use client';

import { Button } from '@westpac/ui/button';
import { Grid, GridItem } from '@westpac/ui/grid';
import { DownloadIcon } from '@westpac/ui/icon';
import { Input } from '@westpac/ui/input';
import * as AllPictograms from '@westpac/ui/pictogram';
import { Select } from '@westpac/ui/select';
import { clsx } from 'clsx';
import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';

export const Pictograms = () => {
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState<AllPictograms.PictogramMode>('duo');

  const filteredPictograms = useMemo(() => {
    return Object.entries(AllPictograms).reduce(
      (acc: { Pictogram: FC<AllPictograms.PictogramProps>; key: string }[], [pictogramName, Pictogram]) => {
        if (pictogramName.toUpperCase().indexOf(search.toUpperCase()) === -1 || pictogramName.startsWith('WBC')) {
          return acc;
        }
        return [...acc, { key: pictogramName, Pictogram }];
      },
      [],
    );
  }, [search]);

  const foundText =
    filteredPictograms.length === 1 ? 'Found 1 pictogram' : `Found ${filteredPictograms.length} pictograms`;

  const handleOnChange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setSearch(value);
  }, []);

  const handleModeChange = useCallback(({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    setMode(value as AllPictograms.PictogramMode);
  }, []);

  return (
    <div>
      <div className="mb-4 bg-light p-4">
        <Grid>
          <GridItem span={{ initial: 12, sm: 6 }}>
            <div className="flex flex-col items-start sm:flex-row sm:items-center">
              <label className="mb-2 mr-4 sm:mb-0" htmlFor="filter-pictograms">
                Filter by name
              </label>
              <Input id="filter-pictograms" value={search} onChange={handleOnChange} className="w-full" />
            </div>
          </GridItem>
          <GridItem span={{ initial: 12, sm: 3 }}>
            <div className="flex flex-col items-start sm:flex-row sm:items-center">
              <label className="mb-2 mr-4 sm:mb-0" htmlFor="pictogram-mode">
                Mode
              </label>
              <Select id="pictogram-mode" value={mode} onChange={handleModeChange} className="w-full sm:w-fit">
                <option value="duo">Duo</option>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </Select>
            </div>
          </GridItem>
          <GridItem span={{ initial: 12, sm: 3 }}>
            <input type="hidden" name="asset" value="pictogram" />
            <Button tag="a" look="primary" iconBefore={DownloadIcon} soft href="/assets/GEL_Pictograms.zip" download>
              Download all SVGs
            </Button>
          </GridItem>
        </Grid>
      </div>
      <Grid>
        <GridItem span={12}>
          <p className="text-right italic text-muted">{foundText}</p>
        </GridItem>
        {filteredPictograms.map(({ key, Pictogram }) => (
          <GridItem key={key} span={{ initial: 12, sm: 6, md: 4, lg: 3 }}>
            <div
              className={clsx(
                'mb-2 flex flex-col items-center justify-center pb-3 pt-6 xsl:mb-4',
                mode === 'light' && 'bg-hero',
                mode !== 'light' && 'bg-white',
              )}
            >
              <Pictogram mode={mode} className="mb-6" />
              <span
                className={clsx('text-[0.6875rem]', mode === 'light' && 'text-white', mode !== 'light' && 'text-muted')}
              >
                {key}
              </span>
            </div>
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};
