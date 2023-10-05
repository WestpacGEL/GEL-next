'use client';

import { Container, Grid, Item, Select } from '@westpac/ui';
import { useId, useMemo, useState } from 'react';

import { AlertBoxDemo } from '../demos';
import { Section } from '../section';
import { Heading, Link, Text } from '../typography';

import { FILTER_HTML } from './vision-filter.utils';

const filters = [
  { text: 'No filter', value: '' },
  { text: 'Achromatomaly', value: 'achromatomaly' },
  { text: 'Achromatopsia', value: 'achromatopsia' },
  { text: 'Deuteranomaly', value: 'deuteranomaly' },
  { text: 'Deuteranopia', value: 'deuteranopia' },
  { text: 'Protanomaly', value: 'protanomaly' },
  { text: 'Protanopia', value: 'protanopia' },
  { text: 'Tritanomaly', value: 'tritanomaly' },
  { text: 'Tritanopia', value: 'tritanopia' },
  { text: 'Low contrast', value: 'low-contrast' },
];

export function VisionFilter() {
  const [filter, setFilter] = useState<string>();
  const _id = useId();
  const id = useMemo(() => `vision-filter-${_id}`, [_id]);

  if (typeof document !== 'undefined' && !document.getElementById('vision-filters')) {
    const filterContainer = document.createElement('div');
    filterContainer.innerHTML = FILTER_HTML.trim();
    filterContainer.style.height = '0';
    document.body.append(filterContainer);
  }

  return (
    <Section paddingTop="large">
      <Container>
        <Heading className="mb-4 sm:mb-7">Colour impairment demonstration</Heading>
        <Grid>
          <Item span={{ initial: 12, xsl: 11, sm: 8, md: 7, lg: 9 }}>
            <Text>
              All components are designed and tested to ensure colour contrast ratios comply with the WCAG 2.1 AA
              specification. Select a filter from the list below to see how this component would appear to someone with
              a: <Link href="#">colour vision impairment</Link>.
            </Text>
          </Item>
        </Grid>
        <div className="mb-4 flex items-center bg-light p-4">
          <label htmlFor={id} className="mr-[1rem]">
            Select filter
          </label>
          <Select id={id} value={filter} onChange={event => setFilter(event.target.value)}>
            {filters.map(filter => (
              <option key={filter.text} value={filter.value}>
                {filter.text}
              </option>
            ))}
          </Select>
        </div>
        <div style={{ filter: filter ? `url(#filter-${filter})` : 'none' }}>
          <AlertBoxDemo />
        </div>
      </Container>
    </Section>
  );
}
