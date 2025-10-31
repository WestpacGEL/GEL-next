import { Alert, Field, Input, Select, SelectProps } from '@westpac/ui';
import { ChangeEvent, Fragment, HTMLAttributes, useState } from 'react';

import { EmploymentSelect, IndustrySelect } from './employment.demo';

const OccupationSelect = (props: SelectProps) => (
  <Select size="large" {...props}>
    <option>Select</option>
    <option>Accounting clerk / Branch accountant financial institution</option>
    <option>Actuarial clerk</option>
    <option>Articled clerk / Barrister / Solicitor / Legal Officer - corporation</option>
    <option>Booking clerk / TAB clerk / Ticket seller</option>
    <option>Business machine operator/Ledger keeper</option>
    <option>Charity collector / Debt collection clerk</option>
    <option>Clerk / Recordtaker</option>
    <option>Computer operator / Data entry</option>
    <option>Courier / Messenger</option>
    <option>Data processing - specialist manager</option>
    <option>Human resource clerk / Training personnel specialists</option>
    <option>Mail order clerk / Stock and purchasing clerk</option>
    <option>Mail sorter</option>
    <option>Office secretary / Stenographer</option>
    <option>Photocopying clerk</option>
    <option>Postal officer</option>
    <option>Production recording clerk</option>
    <option>Receptionist</option>
    <option>Service counter clerk</option>
    <option>Telephonist</option>
    <option>Transport / Despatch clerk / Customs agent</option>
    <option>Typist</option>
    <option>Word processing operator</option>
  </Select>
);

const Wrapper = (props: HTMLAttributes<HTMLDivElement>) => (
  <div className="border-t-border-muted border-t pt-6" {...props} />
);

export const EmploymentSelectFullPattern = ({ showErrors = false }) => {
  const error = showErrors ? 'Error message goes here if activated' : '';
  const invalid = showErrors;

  const [employment, setEmployment] = useState<string>();
  const [prevEmployment, setPrevEmployment] = useState<string>();
  const [years, setYears] = useState<number>();

  const employed = ['full', 'part', 'casual-seasonal', 'self'];

  return (
    <div className="flex flex-col gap-4">
      <Field label="Employment type">
        <EmploymentSelect value={employment} onChange={e => setEmployment(e.target.value)} />
      </Field>

      {employed.includes(employment || '') && (
        <Fragment>
          <Field label="Occupation category">
            <IndustrySelect className="w-full" />
          </Field>
          <Field label="Occupation">
            <OccupationSelect className="w-full" />
          </Field>
          <Field label={`${employment === 'self' ? 'Company' : 'Employer'}’s legal business name`} errorMessage={error}>
            <Input className="w-full" size="large" invalid={invalid} />
          </Field>
          <Field
            label={`Length of time with this ${employment === 'self' ? 'company' : 'employer'}`}
            errorMessage={error}
          >
            <fieldset className="flex gap-3">
              <Field label="Years" labelSize="small">
                <Select
                  value={years}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setYears(+e.target.value);
                  }}
                  size="large"
                >
                  <option>Select</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </Select>
              </Field>
              <Field label="Months" labelSize="small">
                <Select size="large">
                  <option>Select</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                </Select>
              </Field>
            </fieldset>
          </Field>
        </Fragment>
      )}

      {years === 1 && (
        <Wrapper>
          <Alert>
            As you have only been with your current employer for less than x years, we need to capture your previous
            employment details.
          </Alert>
          <Field label="Previous employment type">
            <EmploymentSelect
              value={prevEmployment}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setPrevEmployment(e.target.value)}
            />
          </Field>
          <Field label="Previous industry category">
            <IndustrySelect />
          </Field>
          <Field label="Previous occupation">
            <Select size="large">
              <option>Select</option>
            </Select>
          </Field>
          <Field label={`${prevEmployment === 'self' ? 'Company' : 'Employer'}’s legal business name`}>
            <Input size="large" />
          </Field>
          <Field
            label={`Length of time with this ${prevEmployment === 'self' ? 'company' : 'employer'}`}
            errorMessage={error}
          >
            <fieldset className="flex gap-3">
              <Field label="Years" labelSize="small">
                <Select size="large">
                  <option>Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </Select>
              </Field>
              <Field label="Months" labelSize="small">
                <Select size="large">
                  <option>Select</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </Select>
              </Field>
            </fieldset>
          </Field>
        </Wrapper>
      )}
    </div>
  );
};
