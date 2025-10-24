import { Alert, Field, Input, Select } from '@westpac/ui';
import { Fragment, useState } from 'react';

import { useBrand } from '@/app/design-system/hooks/use-brand';

export const TaxFileNumberPattern = ({ showPrevious = false, showErrors = false }) => {
  const [value, setValue] = useState<string>();
  const brand = useBrand();

  const error = showErrors ? 'Error message goes here if activated' : '';
  const invalid = showErrors;

  return (
    <div className="flex flex-col gap-4">
      <Field
        label="Tax File Number preference"
        hintMessage="Providing your TFN or TFN exemption is not compulsory. However, if you do not provide it, tax may be withheld at the highest marginal rate plus the Medicare Levy on the interest earned on the account."
        errorMessage={error}
      >
        <Select size="large" value={value} onChange={e => setValue(e.target.value)} invalid={invalid}>
          <option value="">Select</option>
          {showPrevious && <option value="previous">Use my TFN supplied previously</option>}
          <option value="provide-now">I&apos;ll provide my TFN now</option>
          <option value="exemption">I&apos;ve got an exemption reason</option>
          <option value="provide-later">I&apos;ll provide my TFN later</option>
        </Select>
      </Field>

      {value === 'previous' && (
        <Field label="TFN supplied previously">
          <Select size="large">
            <option>Select</option>
            <option value="******777">******777</option>
            <option value="******888">******888</option>
            <option value="******999">******999</option>
          </Select>
        </Field>
      )}

      {value === 'provide-now' && (
        <Field label="Enter your Tax File Number (TFN)">
          <Input size="large" />
        </Field>
      )}

      {value === 'exemption' && (
        <Field label="Exemption reason">
          <Select size="large">
            <option>Select</option>
            <option>Age, service, veterans and invalid pensioners</option>
            <option>Any other pensioners</option>
            <option>No TFN/Exemption to be quoted</option>
          </Select>
        </Field>
      )}
      {value === 'provide-later' && (
        <Alert>
          You can provide your TFN at any time via phone or at a {brand?.label} branch. In the meantime, please note, we
          may need to withhold tax from any interest you earn.
        </Alert>
      )}
    </div>
  );
};
