import { Autocomplete, AutocompleteItem, Field, Input, Select, SelectProps } from '@westpac/ui';
import { useState } from 'react';

const AddressManualComplexPattern = ({ property = 'house' }) => {
  let propertyStr;
  let extraStreetNum = false;

  switch (property) {
    case 'house':
    case 'villa':
      propertyStr = 'Street number';
      break;
    case 'townhouse':
    case 'unit':
      propertyStr = 'Unit number';
      extraStreetNum = true;
      break;
    case 'duplex':
      propertyStr = 'Unit number (if applicable)';
      extraStreetNum = true;
      break;
    case 'land':
      propertyStr = 'Lot number';
      break;
    default:
      break;
  }

  return (
    <div className="flex flex-col gap-4">
      <Field label={propertyStr}>
        <Input size="large" className="w-full sm:w-3/12" />
      </Field>
      {extraStreetNum && (
        <Field label="Street number">
          <Input size="large" className="w-full sm:w-3/12" />
        </Field>
      )}
      <Field label="Street name">
        <Input size="large" className="w-full sm:w-8/12" />
      </Field>

      <Field label="Street type">
        <Autocomplete size="large" className="w-full sm:w-5/12">
          <AutocompleteItem key="select">Select</AutocompleteItem>
          <AutocompleteItem key="street">Street</AutocompleteItem>
          <AutocompleteItem key="road">Road</AutocompleteItem>
          <AutocompleteItem key="avenue">Avenue</AutocompleteItem>
        </Autocomplete>
      </Field>

      <Field label="Suburb">
        <Input size="large" className="w-full sm:w-8/12" autoComplete="address-level2" />
      </Field>

      <Field label="State">
        <Select size="large" className="w-full sm:w-5/12" autoComplete="address-level1">
          <option>Select</option>
          <option>NSW</option>
          <option>VIC</option>
          <option>QLD</option>
          <option>ACT</option>
          <option>SA</option>
          <option>WA</option>
          <option>NT</option>
        </Select>
      </Field>

      <Field label="Postcode">
        <Input size="large" className="w-full sm:w-2/12" autoComplete="postal-code" />
      </Field>
    </div>
  );
};

const PropertySelect = (props: SelectProps) => (
  <Select size="large" {...props}>
    <option value="">Select</option>
    <option value="house">House</option>
    <option value="duplex">Duplex</option>
    <option value="townhouse">Townhouse</option>
    <option value="unit">Unit</option>
    <option value="land">Land</option>
    <option value="villa">Villa</option>
  </Select>
);

export const ComplexAddressDemo = () => {
  const [property, setProperty] = useState<string>();

  return (
    <form>
      <Field label="Property type" hintMessage="Must be a residential address">
        <PropertySelect value={property} onChange={e => setProperty(e.target.value)} />
      </Field>
      {property && <AddressManualComplexPattern property={property} />}
    </form>
  );
};
