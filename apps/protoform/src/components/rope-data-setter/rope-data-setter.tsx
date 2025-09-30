'use client';

import { ProgressRopeProps } from '@westpac/ui';
import { useEffect } from 'react';

import { useSidebar } from '../sidebar/context';

export function RopeDataSetter({ data }: { data?: ProgressRopeProps['data'] }) {
  const { setRopeData } = useSidebar();

  useEffect(() => {
    setRopeData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}
