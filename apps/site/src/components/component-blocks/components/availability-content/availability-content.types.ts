import { DocumentElement } from '@keystatic/core';

export type AvailabilitySectionProps = { content: DocumentElement[]; title: string };

export type AvailabilityContentProps = {
  alternativeGel?: string;
  alternativeLegacyWdp?: string;
  alternativeMesh?: string;
  availableGel: string;
  availableLegacyWdp: string;
  availableMesh: string;
};
