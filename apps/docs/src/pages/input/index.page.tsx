import { Input } from '@westpac/ui';
import Head from 'next/head';
import React from 'react';

const SIZES = ['small', 'medium', 'large', 'xlarge'];
function TypographyPage() {
  return (
    <>
      <Head>
        <title>GEL | Input</title>
      </Head>
      <div>
        <section className="border-b-2 border-b-background p-2">
          <h2 className="typography-body-6 pb-2">Input sizes</h2>
          <div className="flex items-end gap-4">
            {SIZES.map(size => (
              <div key={size}>
                <h3 className="typography-body-8">{size}</h3>
                <Input size={size as any} />
              </div>
            ))}
          </div>
        </section>

        <section className="border-b-2 border-b-background p-2">
          <h2 className="typography-body-6 pb-2">Different status</h2>
          <div className="flex items-end gap-4">
            <div>
              <h3 className="typography-body-8">Disabled</h3>
              <Input disabled />
            </div>
            <div>
              <h3 className="typography-body-8">Read only</h3>
              <Input readOnly />
            </div>
            <div>
              <h3 className="typography-body-8">Invalid</h3>
              <Input invalid />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default TypographyPage;
