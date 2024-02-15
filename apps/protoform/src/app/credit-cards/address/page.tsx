'use client';

import { Autocomplete, AutocompleteItem, Form, FormGroup, FormSection, InputGroup, Select } from '@westpac/ui';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import { BackButton } from '@/components/back-button/back-button';
import { Cta } from '@/components/cta/cta';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { ErrorValidationAlert, ValidationErrorType } from '@/components/error-validation-alert/error-validation-alert';
import { useSidebar } from '@/components/sidebar/context';
import { defaultError } from '@/constants/form-contsants';
import { getFormData } from '@/utils/getFormData';

import { useCreditCard } from '../context';

export default function Address() {
  const { setRopeStep } = useSidebar();
  const { data, setData } = useCreditCard();
  const [addressError, setAddressError] = useState('');
  const [housingLengthError, setHousingLengthError] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrorType[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { housingLength, address } = getFormData(e.currentTarget) as { address: string; housingLength: string };
    if (!address || !housingLength) {
      setAddressError(!address ? defaultError : '');
      setHousingLengthError(!housingLength ? defaultError : '');
      setValidationErrors([
        ...(!address ? [{ id: 'address', label: 'Address' }] : []),
        ...(!housingLength ? [{ id: 'housingLength', label: 'Housing length' }] : []),
      ]);
    } else {
      setData({ ...data, address, housingLength });
      router.push('/credit-cards/review-and-submit');
    }
  };

  useEffect(() => {
    setRopeStep(6);
  }, [setRopeStep]);

  const router = useRouter();

  return (
    <div>
      <BackButton onClick={() => router.push('/credit-cards/name-and-contact')}>Back to Name & contact</BackButton>
      <CustomHeading groupHeading="Your details" leadText="[Dummy lead text to be replaced later]">
        Address
      </CustomHeading>
      {validationErrors.length >= 1 && <ErrorValidationAlert errors={validationErrors} />}
      <Form id="credit-card" spacing="large" onSubmit={handleSubmit}>
        <FormSection className="border-none !p-0">
          <FormGroup>
            <InputGroup size="large" errorMessage={addressError} instanceId="address">
              <Autocomplete
                noOptionsMessage="No options found"
                label="Search for you residential address"
                hintMessage="Can’t be a PO Box. Start typing your address and select from the list or enter your address manually"
                footer="Can't see your address? Enter it manually."
                defaultInputValue={data.address}
                invalid={!!addressError}
                name="address"
              >
                <AutocompleteItem>123 Fake Street</AutocompleteItem>
              </Autocomplete>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup
              label="What is your current housing situation?"
              instanceId="housingLength"
              errorMessage={housingLengthError}
              size="large"
            >
              <Select name="housingLength" defaultValue={data.housingLength} invalid={!!housingLengthError}>
                <option value="">Select</option>
                <option value="1">1 Year</option>
              </Select>
            </InputGroup>
          </FormGroup>
        </FormSection>
        <Cta primaryType="submit" tertiaryOnClick={() => router.push('/')} tertiary="Cancel">
          Next
        </Cta>
      </Form>
    </div>
  );
}
