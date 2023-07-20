import { Select } from '@westpac/ui';
import Head from 'next/head';
import React from 'react';

const SIZES = ['small', 'medium', 'large', 'xlarge'];
const DEFAULT_OPTIONS = ['small', 'medium', 'large', 'xlarge'];

function SelectPage() {
  return (
    <>
      <Head>
        <title>GEL | Select</title>
      </Head>
      <div>
        <section className="border-b-2 border-b-background p-2">
          <h2 className="typography-body-6 pb-2">Select sizes</h2>
          <div className="flex items-end gap-4">
            {SIZES.map(size => (
              <div key={size}>
                <h3 className="typography-body-8">{size}</h3>
                <Select size={size as any}>
                  {DEFAULT_OPTIONS.map(option => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>
            ))}
          </div>
        </section>

        <section className="border-b-2 border-b-background p-2">
          <h2 className="typography-body-6 pb-2">Different status</h2>
          <div className="flex items-end gap-4">
            <div>
              <h3 className="typography-body-8">Disabled</h3>
              <Select disabled>
                {DEFAULT_OPTIONS.map(option => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <h3 className="typography-body-8">Invalid</h3>
              <Select invalid>
                {DEFAULT_OPTIONS.map(option => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default SelectPage;
