import { NotEditable, component, fields } from '@keystatic/core';

const availabilityOptions = [
  { label: 'Available', value: 'available' },
  { label: 'Not Available', value: 'unavailable' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Older Version Available', value: 'older-version-available' },
];

export const availabilityContent = component({
  preview: () => (
    <NotEditable>
      <div>Platform Availability</div>
    </NotEditable>
  ),
  label: 'Content Availability',
  schema: {
    availableGel: fields.select({
      label: 'GEL Availability',
      options: availabilityOptions,
      defaultValue: 'available',
    }),
    availableMesh: fields.select({
      label: 'Mesh Availability',
      options: availabilityOptions,
      defaultValue: 'available',
    }),
    availableLegacyWdp: fields.select({
      label: 'Legacy WDP Availability',
      options: availabilityOptions,
      defaultValue: 'available',
    }),
    alternativeMesh: fields.text({
      label: 'Mesh Alternative Name',
      multiline: false,
      defaultValue: undefined,
    }),
    alternativeLegacyWdp: fields.text({
      label: 'Legacy WDP Alternative Name',
      multiline: false,
      defaultValue: undefined,
    }),
  },
});
