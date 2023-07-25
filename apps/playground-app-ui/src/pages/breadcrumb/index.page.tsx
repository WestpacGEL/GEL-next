import { Breadcrumb } from '@westpac/ui';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

function BreadcrumbPage() {
  return (
    <>
      <Head>
        <title>GEL | Breadcrumb</title>
      </Head>
      <div>
        <section className="border-b-2 border-b-background p-2">
          <h2 className="typography-body-6 pb-2">Breadcrumb</h2>
          <Breadcrumb>
            <Link href="#test" passHref legacyBehavior>
              <Breadcrumb.Item tag="a">Anchor item</Breadcrumb.Item>
            </Link>
            <Link href="#another" passHref legacyBehavior>
              <Breadcrumb.Item tag="a">Another anchor item</Breadcrumb.Item>
            </Link>
            <Link href="#another" passHref legacyBehavior>
              <Breadcrumb.Item isDisabled tag="a">
                Disabled item
              </Breadcrumb.Item>
            </Link>
            <Link href="#another" passHref legacyBehavior>
              <Breadcrumb.Item isCurrent tag="a">
                Last item
              </Breadcrumb.Item>
            </Link>
          </Breadcrumb>
        </section>
      </div>
    </>
  );
}

export default BreadcrumbPage;
