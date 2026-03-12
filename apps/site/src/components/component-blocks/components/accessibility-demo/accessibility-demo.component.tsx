'use client';

import { DocumentRenderer } from '@keystatic/core/renderer';
import { Select } from '@westpac/ui';
import { ChangeEvent, useId, useState } from 'react';

import { DOCUMENT_RENDERERS } from '@/app/articles/[article]/components/document-renderer';
import { Code } from '@/components/code';
import { VisionFilter, VisionFilterProps } from '@/components/vision-filter';

import { type AccessibilityDemoProps } from './accessibility-demo.types';

const FILTERS = [
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
] as const;

export const AccessibilityDemo = ({ content }: AccessibilityDemoProps) => {
  const [filter, setFilter] = useState<VisionFilterProps['value']>();
  const id = useId();

  return (
    <>
      <div className="flex items-center bg-surface-muted-faint p-4">
        <label htmlFor={id} className="mr-[1rem] whitespace-nowrap">
          Select filter
        </label>
        <Select
          id={id}
          value={filter}
          width={10}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setFilter(event.target.value as VisionFilterProps['value'])
          }
        >
          {FILTERS.map(filter => (
            <option key={filter.text} value={filter.value}>
              {filter.text}
            </option>
          ))}
        </Select>
      </div>
      <VisionFilter value={filter}>
        <DocumentRenderer
          document={content}
          renderers={{
            ...DOCUMENT_RENDERERS,
            block: {
              ...DOCUMENT_RENDERERS.block,
              code: props => <Code {...props} live showCode={false} className={`my-4`} enableLiveCode={false} />,
            },
          }}
        />
      </VisionFilter>
    </>
  );
};
