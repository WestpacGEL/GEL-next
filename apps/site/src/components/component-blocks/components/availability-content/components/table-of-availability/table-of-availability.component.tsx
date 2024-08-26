'use client';

import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableHeaderRow, TableRow } from '@westpac/ui';
import { CalendarIcon, TickCircleIcon, WarningIcon } from '@westpac/ui/icon';
import React from 'react';

interface TableOfAvailabilityProps {
  alternativeGel?: string;
  alternativeLegacyWdp?: string;
  alternativeMesh?: string;
  availableGel: string;
  availableLegacyWdp: string;
  availableMesh: string;
}

const availabilityMap: Record<string, { color: string; icon: React.ElementType; text: string }> = {
  available: { text: 'Available', icon: TickCircleIcon, color: 'success' },
  unavailable: { text: 'Older version available', icon: WarningIcon, color: 'warning' },
  'in-progress': { text: 'Older version available - Upgrade in backlog', icon: CalendarIcon, color: 'info' },
};

const renderStatus = (status: string) => {
  const { text, icon: Icon, color } = availabilityMap[status];
  return (
    <div className={`text- typography-body-10${color}`}>
      <Icon size="small" look="outlined" className="mr-2" />
      {text}
    </div>
  );
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
    { name: 'GEL', status: availableGel, alternative: alternativeGel },
    { name: 'Mesh', status: availableMesh, alternative: alternativeMesh },
    { name: 'LegacyWDP', status: availableLegacyWdp, alternative: alternativeLegacyWdp },
  ];

  const hasAlternativeNames = platforms.some(platform => platform.alternative);

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
        {platforms.map(platform => (
          <TableRow key={platform.name}>
            <TableCell>
              <strong>{platform.name}</strong>
            </TableCell>
            <TableCell>{renderStatus(platform.status)}</TableCell>
            {hasAlternativeNames && <TableCell>{platform.alternative || ''}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
