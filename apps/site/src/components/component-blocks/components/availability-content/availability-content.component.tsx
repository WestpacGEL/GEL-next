'use client';

import React from 'react';

import { styles as AvailabilityContentStyles } from './availability-content.styles';
import { TableOfAvailability } from './components/table-of-availability';

import { AvailabilityContentProps } from '.';

export function AvailabilityContent({
  availableGel,
  availableMesh,
  availableLegacyWdp,
  alternativeGel,
  alternativeMesh,
  alternativeLegacyWdp,
}: AvailabilityContentProps) {
  const styles = AvailabilityContentStyles({});
  return (
    <div className={styles.contentContainer({})}>
      <div className={styles.tableContainer({})}>
        <TableOfAvailability
          availableGel={availableGel}
          availableMesh={availableMesh}
          availableLegacyWdp={availableLegacyWdp}
          alternativeGel={alternativeGel}
          alternativeMesh={alternativeMesh}
          alternativeLegacyWdp={alternativeLegacyWdp}
        ></TableOfAvailability>
      </div>
    </div>
  );
}
