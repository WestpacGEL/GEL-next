import { Autocomplete, AutocompleteItem, Field, Input, Link } from '@westpac/ui';
import { Fragment, RefObject, useLayoutEffect, useMemo, useRef, useState } from 'react';

const StreetHint = ({ manual, onClick }: { manual?: boolean; onClick: (manual: boolean) => any }) => (
  <Fragment>
    Not a PO Box
    {manual !== undefined && (
      <Fragment>
        <br />
        <Link
          type="inline"
          onClick={e => {
            e.preventDefault();
            onClick(manual);
          }}
        >
          {manual ? 'Search for your address instead' : 'Enter manually instead'}
        </Link>
      </Fragment>
    )}
  </Fragment>
);

const Footer = ({ manual, onClick }: { manual: boolean; onClick: (manual: boolean) => any }) => (
  <Fragment>
    Can&apos;t find your address?{' '}
    <Link
      type="inline"
      onClick={e => {
        e.preventDefault();
        onClick(manual);
      }}
    >
      Enter it manually
    </Link>
  </Fragment>
);

export function ManualAddress({
  streetLegendRef,
  manual,
  onClick,
  withError,
}: {
  manual: boolean;
  onClick: (manual: boolean) => any;
  streetLegendRef: RefObject<HTMLInputElement>;
  withError?: boolean;
}) {
  const errorMessage = useMemo(() => (withError ? 'Error message goes here if activated' : undefined), [withError]);

  return (
    <div className="flex flex-col gap-4">
      <Field
        errorMessage={errorMessage}
        label="Street"
        hintMessage={
          <StreetHint
            manual={manual}
            onClick={() => {
              onClick(manual);
            }}
          />
        }
      >
        <Input size="large" invalid={withError} className="w-full" ref={streetLegendRef} />
      </Field>

      <Field>
        <Input size="large" className="w-full" />
      </Field>

      <Field errorMessage={errorMessage} label="Suburb">
        <Input
          size="large"
          invalid={withError}
          className={`
            w-full
            sm:w-8/12
          `}
        />
      </Field>

      <Field errorMessage={errorMessage} label="State">
        <Input size="large" invalid={withError} />
      </Field>

      <Field errorMessage={errorMessage} label="Postcode">
        <Input
          size="large"
          invalid={withError}
          className={`
            w-full
            sm:w-2/12
          `}
        />
      </Field>
    </div>
  );
}

const COUNTRIES = [
  { value: 'United States', label: 'United States' },
  { value: 'China', label: 'China' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Germany', label: 'Germany' },
  { value: 'India', label: 'India' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'France', label: 'France' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Russia', label: 'Russia' },
  { value: 'South Korea', label: 'South Korea' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Spain', label: 'Spain' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Indonesia', label: 'Indonesia' },
  { value: 'Netherlands', label: 'Netherlands' },
  { value: 'Saudi Arabia', label: 'Saudi Arabia' },
  { value: 'Turkey', label: 'Turkey' },
  { value: 'Switzerland', label: 'Switzerland' },
  { value: 'Poland', label: 'Poland' },
  { value: 'Thailand', label: 'Thailand' },
  { value: 'Sweden', label: 'Sweden' },
  { value: 'Belgium', label: 'Belgium' },
  { value: 'Nigeria', label: 'Nigeria' },
];
export function InternationalAddress({
  streetLegendRef,
  manual,
  onClick,
  withError,
}: {
  manual: boolean;
  onClick: (manual: boolean) => any;
  streetLegendRef: RefObject<HTMLInputElement>;
  withError?: boolean;
}) {
  const errorMessage = useMemo(() => (withError ? 'Error message goes here if activated' : undefined), [withError]);

  return (
    <div className="flex flex-col gap-4">
      <Field errorMessage={errorMessage} label="Street">
        <Input invalid={withError} className="w-full" ref={streetLegendRef} />
      </Field>

      <Field>
        <Input className="w-full" />
      </Field>

      <Field errorMessage={errorMessage} label="City, town or suburb">
        <Input
          invalid={withError}
          className={`
            w-full
            sm:w-8/12
          `}
        />
      </Field>

      <Field errorMessage={errorMessage} label="State, province or region">
        <Input
          invalid={withError}
          className={`
            w-full
            sm:w-8/12
          `}
        />
      </Field>

      <Field errorMessage={errorMessage} label="Postcode or Zip code">
        <Input
          invalid={withError}
          className={`
            w-full
            sm:w-2/12
          `}
        />
      </Field>

      <Field
        errorMessage={withError ? 'Invalid country. Start typing and select your country from the list' : undefined}
        label="Search for your country"
        hintMessage="Start typing your country and select from the list"
      >
        <Autocomplete
          size="large"
          invalid={withError}
          footer={
            <Fragment>
              Can&apos;t find your country?{' '}
              <Link
                type="inline"
                onClick={e => {
                  e.preventDefault();
                  onClick(manual);
                }}
              >
                Enter it manually
              </Link>
            </Fragment>
          }
          noOptionsMessage="None found"
        >
          {COUNTRIES.map(country => (
            <AutocompleteItem key={country.value}>{country.value}</AutocompleteItem>
          ))}
        </Autocomplete>
      </Field>
    </div>
  );
}

export function AutoAddressDemo({ errorMessage }: { errorMessage?: string }) {
  const [manual, setManual] = useState(false);
  const streetLegendRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (manual) {
      setTimeout(() => streetLegendRef.current?.focus());
    }
  }, [manual, streetLegendRef]);

  return (
    <div
      className={`
        w-full
        sm:w-7/12
      `}
    >
      {manual ? (
        <ManualAddress manual={manual} onClick={() => setManual(manual => !manual)} streetLegendRef={streetLegendRef} />
      ) : (
        <Field
          label="Search for your home address"
          hintMessage={<StreetHint manual={manual} onClick={() => setManual(manual => !manual)} />}
          errorMessage={errorMessage}
        >
          <Autocomplete
            size="large"
            footer={<Footer manual={manual} onClick={() => setManual(manual => !manual)} />}
            noOptionsMessage="None found"
          >
            <AutocompleteItem key="1">123 Sesame Street, Hornsby, NSW, 2077</AutocompleteItem>
            <AutocompleteItem key="2">742 Evergreen Terrace , Chatswood, NSW, 2067</AutocompleteItem>
            <AutocompleteItem key="3">42 Wallaby Way, Sydney, NSW, 2000</AutocompleteItem>
            <AutocompleteItem key="4">124 Conch Street, Marrickville, NSW, 2204</AutocompleteItem>
          </Autocomplete>
        </Field>
      )}
    </div>
  );
}
