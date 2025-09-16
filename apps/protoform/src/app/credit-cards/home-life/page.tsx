'use client';

import { ButtonGroup, Form, FormGroup, FormSection, Input, InputGroup, Select } from '@westpac/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import { BackButton } from '@/components/back-button/back-button';
import { Cta } from '@/components/cta/cta';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { ErrorValidationAlert, ValidationErrorType } from '@/components/error-validation-alert/error-validation-alert';
import { useSidebar } from '@/components/sidebar/context';
import { defaultError } from '@/constants/form-contsants';
import { getFormData } from '@/utils/getFormData';

import { useCreditCard } from '../context';

export default function HomeLife() {
  const { setRopeStep } = useSidebar();
  const { data, setData } = useCreditCard();
  const [dependantsError, setdependantsError] = useState('');
  const [expenseFreqError, setExpenseFreqError] = useState('');
  const [expensesError, setExpensesError] = useState('');
  const [housingError, setHousingError] = useState('');
  const [sharedExpensesError, setSharedExpensesError] = useState('');
  const [sharedExpenses, setSharedExpenses] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrorType[]>([]);

  const searchParams = useSearchParams();
  const isFlattenRope = searchParams.get('flatten');

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { housing, dependants, expenseFreq, expenses } = getFormData(e.currentTarget) as {
      dependants: string;
      expenseFreq: string;
      expenses: string;
      housing: string;
    };

    if (!housing || !dependants || !expenseFreq || !expenses || !sharedExpenses) {
      setHousingError(!housing ? defaultError : '');
      setdependantsError(!dependants ? defaultError : '');
      setExpenseFreqError(!expenseFreq ? defaultError : '');
      setExpensesError(!expenses ? defaultError : '');
      setSharedExpensesError(!sharedExpenses ? defaultError : '');
      setValidationErrors([
        ...(!housing ? [{ id: 'housing', label: 'Housing situation' }] : []),
        ...(!dependants ? [{ id: 'dependants', label: 'Dependants' }] : []),
        ...(!expenseFreq ? [{ id: 'expenseFreq', label: 'Expense frequency' }] : []),
        ...(!expenses ? [{ id: 'expenses', label: 'Expenses' }] : []),
        ...(!sharedExpenses ? [{ id: 'sharedExpenses', label: 'Shared expenses' }] : []),
      ]);
    } else {
      setData({ ...data, housing, dependants, expenseFreq, expenses, sharedExpenses });
      router.push(`/credit-cards/credit-limit${isFlattenRope ? '?flatten=true' : ''}`);
    }
  };

  useEffect(() => {
    setRopeStep(3);
  }, [setRopeStep]);

  const router = useRouter();

  return (
    <div>
      <BackButton onClick={() => router.push(`/credit-cards/loans-and-cards${isFlattenRope ? '?flatten=true' : ''}`)}>
        Back to Loans and cards
      </BackButton>
      <CustomHeading
        groupHeading="Your finances"
        leadText="Tell us more about your general expenses and living situation."
      >
        Home life
      </CustomHeading>
      {validationErrors.length >= 1 && <ErrorValidationAlert errors={validationErrors} />}
      <Form id="credit-card" spacing="large" onSubmit={handleSubmit}>
        <FormSection className="border-none !p-0">
          <FormGroup>
            <InputGroup
              instanceId="housing"
              label="What is your current housing situation?"
              errorMessage={housingError}
              size="large"
              width={{ initial: 'full', md: 9 }}
            >
              <Select name="housing" defaultValue={data.housing} invalid={!!housingError}>
                <option value="">Select</option>
                <option value="Renting">Renting</option>
                <option value="OwnerOccupied">Owner occupied</option>
              </Select>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <ButtonGroup
              label="Do you share household expenses?"
              hintMessage="For example utility bills"
              id="sharedExpenses"
              errorMessage={sharedExpensesError}
              defaultValue={data.sharedExpenses}
              size="large"
              block={{ initial: true, md: false }}
              buttons={[
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
              ]}
              onChange={setSharedExpenses}
            />
          </FormGroup>

          <FormGroup>
            <InputGroup
              label="How many dependants do you have?"
              hint="Excluding spouse"
              instanceId="dependants"
              errorMessage={dependantsError}
              size="large"
              width={{ initial: 'full', md: 3 }}
            >
              <Select name="dependants" invalid={!!dependantsError} defaultValue={data.dependants}>
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Select>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup
              size="large"
              label="All other expenses"
              hint="For example Food, regular bills. transport, Insurance, Child support. Enter a dollar value and choose a frequency"
              errorMessage={expensesError || expenseFreqError}
              instanceId="expenses"
              before="$"
              width={{ initial: 'full', md: 10 }}
              after={
                <Select
                  name="expenseFreq"
                  id="expenseFreq"
                  invalid={!!expenseFreqError}
                  defaultValue={data.expenseFreq}
                >
                  <option value="">Select</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Fortnightly">Fortnightly</option>
                  <option value="Monthly">Monthly</option>
                </Select>
              }
            >
              <Input invalid={!!expensesError} name="expenses" defaultValue={data.expenses} />
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
