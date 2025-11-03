import { Autocomplete, AutocompleteItem, type AutocompleteProps, Field, Select, SelectProps } from '@westpac/ui';
import { Fragment, useState } from 'react';

export const EmploymentSelect = (props: SelectProps) => (
  <Select size="large" {...props}>
    <option>Select</option>
    <option value="full">Full time</option>
    <option value="part">Part time</option>
    <option value="casual-seasonal">Casual/Seasonal</option>
    <option value="self">Self employed</option>
    <option value="retired">Retired</option>
    <option value="home-duties">Home duties</option>
    <option value="social-security">Social Security</option>
    <option value="unemployed">Unemployed</option>
  </Select>
);

export const IndustrySelect = (props: SelectProps) => (
  <Select size="large" {...props}>
    <option>Select</option>
    <option value="">Arts / Entertainment / Sport / Leisure</option>
    <option value="">Business Professional / Consultant</option>
    <option value="">Catering / Hospitality / Food Production</option>
    <option value="">Clerical</option>
    <option value="">Construction / Mechanical &amp; Transport</option>
    <option value="">Education / Knowledge</option>
    <option value="">Farm / Garden / Rural Services</option>
    <option value="">Finance / Retail Sales / Real Estate</option>
    <option value="">Machine Operation / Process Work</option>
    <option value="">Medical / Health</option>
    <option value="">Personal Services / Miscellaneous</option>
    <option value="">Public Services / Legal / Emergency &amp; Security</option>
    <option value="">Retired / Unpaid / Welfare recipients</option>
    <option value="">Science / Engineering/ Technology</option>
    <option value="">Trades</option>
  </Select>
);

const OccupationAutocomplete = (props: Omit<AutocompleteProps<any>, 'children'>) => (
  <Autocomplete size="large" noOptionsMessage="None found" {...props}>
    {[
      {
        value: 'Accounting clerk / Branch accountant financial institution',
        label: 'Accounting clerk / Branch accountant financial institution',
      },
      { value: 'Actuarial clerk', label: 'Actuarial clerk' },
      {
        value: 'Articled clerk / Barrister / Solicitor / Legal Officer - corporation',
        label: 'Articled clerk / Barrister / Solicitor / Legal Officer - corporation',
      },
      { value: 'Booking clerk / TAB clerk / Ticket seller', label: 'Booking clerk / TAB clerk / Ticket seller' },
      { value: 'Business machine operator/Ledger keeper', label: 'Business machine operator/Ledger keeper' },
      { value: 'Charity collector / Debt collection clerk', label: 'Charity collector / Debt collection clerk' },
      { value: 'Clerk / Recordtaker', label: 'Clerk / Recordtaker' },
      { value: 'Computer operator / Data entry', label: 'Computer operator / Data entry' },
      { value: 'Courier / Messenger', label: 'Courier / Messenger' },
      { value: 'Data processing - specialist manager', label: 'Data processing - specialist manager' },
      {
        value: 'Human resource clerk / Training personnel specialists',
        label: 'Human resource clerk / Training personnel specialists',
      },
      {
        value: 'Mail order clerk / Stock and purchasing clerk',
        label: 'Mail order clerk / Stock and purchasing clerk',
      },
      { value: 'Mail sorter', label: 'Mail sorter' },
      { value: 'Office secretary / Stenographer', label: 'Office secretary / Stenographer' },
      { value: 'Photocopying clerk', label: 'Photocopying clerk' },
      { value: 'Postal officer', label: 'Postal officer' },
      { value: 'Production recording clerk', label: 'Production recording clerk' },
      { value: 'Receptionist', label: 'Receptionist' },
      { value: 'Service counter clerk', label: 'Service counter clerk' },
      { value: 'Telephonist', label: 'Telephonist' },
      { value: 'Transport / Despatch clerk / Customs agent', label: 'Transport / Despatch clerk / Customs agent' },
      { value: 'Typist', label: 'Typist' },
      { value: 'Word processing operator', label: 'Word processing operator' },
    ].map(({ value, label }) => (
      <AutocompleteItem key={value}>{label}</AutocompleteItem>
    ))}
  </Autocomplete>
);

export const EmploymentAutocompletePattern = () => {
  const [employment, setEmployment] = useState<string>();

  const employed = ['full', 'part', 'casual-seasonal', 'self'];

  return (
    <div className="flex flex-col gap-4">
      <Field label="Employment type">
        <EmploymentSelect value={employment} onChange={e => setEmployment(e.target.value)} />
      </Field>

      {employed.includes(employment || '') && (
        <Fragment>
          <Field label="Occupation category">
            <IndustrySelect />
          </Field>

          <Field label="Search for your occupation">
            <OccupationAutocomplete />
          </Field>
        </Fragment>
      )}
    </div>
  );
};
