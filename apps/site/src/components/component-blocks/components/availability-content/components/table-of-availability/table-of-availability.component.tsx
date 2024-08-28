'use client';

import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableHeaderRow, TableRow } from '@westpac/ui';
import { CalendarIcon, TickCircleIcon, WarningIcon } from '@westpac/ui/icon';
import React from 'react';

import { styles as TableOfAvailabilityStyles } from './table-of-availability.styles';

interface TableOfAvailabilityProps {
  alternativeGel?: string;
  alternativeLegacyWdp?: string;
  alternativeMesh?: string;
  availableGel: string;
  availableLegacyWdp: string;
  availableMesh: string;
}

const availabilityMap: Record<
  string,
  { color: 'success' | 'warning' | 'info'; icon: React.ElementType; text: string }
> = {
  available: { text: 'Available', icon: TickCircleIcon, color: 'success' },
  unavailable: { text: 'Older version available', icon: WarningIcon, color: 'warning' },
  'in-progress': { text: 'Older version available - Upgrade in backlog', icon: CalendarIcon, color: 'info' },
};

export function TableOfAvailability({
  availableGel,
  availableMesh,
  availableLegacyWdp,
  alternativeGel,
  alternativeMesh,
  alternativeLegacyWdp,
}: TableOfAvailabilityProps) {
  const platforms = [
    { name: 'GEL Design System', status: availableGel, alternative: alternativeGel },
    { name: 'Mesh UI', status: availableMesh, alternative: alternativeMesh },
    { name: 'Legacy WDP', status: availableLegacyWdp, alternative: alternativeLegacyWdp },
  ];

  const styles = TableOfAvailabilityStyles({});

  const hasAlternativeNames = platforms.some(platform => platform.alternative);
  const cellWidth = 200;

  return (
    <Table>
      <TableHeader>
        <TableHeaderRow>
          <TableHeaderCell>Platform</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          {hasAlternativeNames && <TableHeaderCell>Other name</TableHeaderCell>}
        </TableHeaderRow>
      </TableHeader>
      <TableBody>
        {platforms.map(platform => {
          const { text, icon: Icon, color } = availabilityMap[platform.status];
          return (
            <TableRow key={platform.name}>
              <TableCell width={cellWidth}>
                <strong>{platform.name}</strong>
              </TableCell>
              <TableCell width={cellWidth}>
                <div className={styles.text({ color })}>
                  <Icon size="small" look="outlined" className="mr-2" color={color} />
                  {text}
                </div>
              </TableCell>
              {hasAlternativeNames && <TableCell width={cellWidth}>{platform.alternative || ''}</TableCell>}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
