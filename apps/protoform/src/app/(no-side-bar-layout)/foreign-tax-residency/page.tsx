'use client';

import {
  Alert,
  Autocomplete,
  AutocompleteItem,
  ButtonGroup,
  ButtonGroupButton,
  Field,
  Input,
  InputGroup,
  Repeater,
  RepeaterItem,
} from '@westpac/ui';
import { useRouter } from 'next/navigation';
import { Key, useCallback, useState } from 'react';

import { Cta } from '@/components/cta/cta';
import { CustomHeading } from '@/components/custom-heading/custom-heading';

const COUNTRIES = [
  { key: 'afghanistan', name: 'Afghanistan', hasTin: true },
  { key: 'albania', name: 'Albania', hasTin: true },
  { key: 'argentina', name: 'Argentina', hasTin: true },
  { key: 'austria', name: 'Austria', hasTin: true },
  { key: 'bermuda', name: 'Bermuda', hasTin: false },
  { key: 'brazil', name: 'Brazil', hasTin: true },
  { key: 'canada', name: 'Canada', hasTin: true },
  { key: 'china', name: 'China', hasTin: true },
  { key: 'denmark', name: 'Denmark', hasTin: true },
  { key: 'france', name: 'France', hasTin: true },
  { key: 'germany', name: 'Germany', hasTin: true },
  { key: 'india', name: 'India', hasTin: true },
  { key: 'japan', name: 'Japan', hasTin: true },
  { key: 'new-zealand', name: 'New Zealand', hasTin: true },
  { key: 'singapore', name: 'Singapore', hasTin: true },
  { key: 'switzerland', name: 'Switzerland', hasTin: true },
  { key: 'united-kingdom', name: 'United Kingdom', hasTin: true },
  { key: 'united-states', name: 'United States', hasTin: true },
];

type TaxResidencyItem = {
  id: number;
  country: string | null;
  tin: string;
};

export default function ForeignTaxResidency() {
  const router = useRouter();
  const [isTaxResident, setIsTaxResident] = useState<string | undefined>();
  const [items, setItems] = useState<TaxResidencyItem[]>([{ id: 1, country: null, tin: '' }]);

  const handleAdd = useCallback(() => {
    setItems(prev => [...prev, { id: Date.now(), country: null, tin: '' }]);
  }, []);

  const handleRemove = useCallback((id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleCountryChange = useCallback((index: number, key: Key | null) => {
    setItems(prev => prev.map((item, i) => (i === index ? { ...item, country: key as string | null, tin: '' } : item)));
  }, []);

  const handleTinChange = useCallback((index: number, value: string) => {
    setItems(prev => prev.map((item, i) => (i === index ? { ...item, tin: value } : item)));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // eslint-disable-next-line no-console
      console.log('Form submitted:', { isTaxResident, items });
      router.push('/');
    },
    [isTaxResident, items, router],
  );

  const getCountry = (key: string | null) => COUNTRIES.find(c => c.key === key);

  return (
    <div>
      <CustomHeading leadText="As part of our tax obligations, we are required to capture any foreign tax residency information about you.">
        Foreign Tax Residency
      </CustomHeading>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Field
          label="Are you a tax resident in a country other than Australia?"
          hintMessage="You are a foreign tax resident if you're liable to pay tax in another country, even if you don't fill out a tax return"
        >
          <ButtonGroup
            size="large"
            look="hero"
            block={{ initial: true, md: false }}
            onSelectionChange={key => setIsTaxResident(key as string)}
            selectedKeys={isTaxResident}
          >
            <ButtonGroupButton id="Yes">Yes</ButtonGroupButton>
            <ButtonGroupButton id="No">No</ButtonGroupButton>
          </ButtonGroup>
        </Field>

        {isTaxResident === 'Yes' && (
          <Repeater onAdd={handleAdd} addText="Add another" separator>
            {items.map((item, index) => (
              <RepeaterItem
                key={item.id}
                index={index}
                onRemove={items.length > 1 ? () => handleRemove(item.id) : undefined}
              >
                <Field label="Search and select tax residency country">
                  <Autocomplete
                    label="Search and select tax residency country"
                    noOptionsMessage="No countries found"
                    size="large"
                    onSelectionChange={key => handleCountryChange(index, key)}
                  >
                    {COUNTRIES.map(country => (
                      <AutocompleteItem key={country.key}>{country.name}</AutocompleteItem>
                    ))}
                  </Autocomplete>
                </Field>

                {item.country && getCountry(item.country)?.hasTin && (
                  <Field label="Foreign Taxpayer Identification Number (TIN)">
                    <InputGroup size="large">
                      <Input value={item.tin} onChange={e => handleTinChange(index, e.target.value)} />
                    </InputGroup>
                  </Field>
                )}

                {item.country && !getCountry(item.country)?.hasTin && (
                  <Alert look="info">Foreign Tax Identification Number not issued for this country</Alert>
                )}
              </RepeaterItem>
            ))}
          </Repeater>
        )}

        <Cta primaryType="submit" tertiaryOnClick={() => router.push('/')} tertiary="Save and exit">
          Next
        </Cta>
      </form>
    </div>
  );
}
