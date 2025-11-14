'use client';

import { Outlet } from 'react-router';

import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { CustomFooter } from '@/components/custom-footer/custom-footer';
import { CustomHeader } from '@/components/custom-header/custom-header';

export default function CreditCardsLayout() {
  return (
    <>
      <CustomHeader withSignout />
      <ContentWrapper>
        <div>
          <Outlet />
        </div>
      </ContentWrapper>
      <CustomFooter />
    </>
  );
}
