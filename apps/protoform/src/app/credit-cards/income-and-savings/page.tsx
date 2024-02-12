'use client';

import { Form, FormGroup, FormSection, Input, InputGroup, Repeater, Select } from '@westpac/ui';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import { BackButton } from '@/components/back-button/back-button';
import { Cta } from '@/components/cta/cta';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { useSidebar } from '@/components/sidebar/context';
import { defaultError } from '@/constants/form-contsants';
import { getFormData } from '@/utils/getFormData';

import { useCreditCard } from '../context';

export default function IncomeAndSavings() {
  const { setRopeStep } = useSidebar();
  const { data, setData } = useCreditCard();
  const [incomeError, setIncomeError] = useState('');
  const [freqError, setFreqError] = useState('');
  const [balanceError, setBalanceError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { totalBal, incomeFreq, income } = getFormData(e.currentTarget) as {
      income: string;
      incomeFreq: string;
      totalBal: string;
    };
    if (!totalBal || !incomeFreq || !income) {
      setIncomeError(!income ? defaultError : '');
      setBalanceError(!totalBal ? defaultError : '');
      setFreqError(!incomeFreq ? defaultError : '');
    } else {
      setData({ ...data, totalBal, incomeFreq, income });
      router.push('/credit-cards/loans-and-cards');
    }
  };

  useEffect(() => {
    setRopeStep(1);
  }, [setRopeStep]);

  const router = useRouter();

  return (
    <div>
      <BackButton onClick={() => router.push('/credit-cards')}>Back to Quick contact</BackButton>
      <CustomHeading>Income & savings</CustomHeading>
      <Form id="credit-card" spacing="large" className="pt-6" onSubmit={handleSubmit}>
        <FormSection className="border-none !p-0">
          <FormGroup>
            <Repeater className="mb-5">
              <InputGroup
                label="Income / salary / pension (after tax)"
                hint="Enter a dollar value and choose a frequency"
                errorMessage={incomeError || freqError}
                before="$"
                after={
                  <Select name="incomeFreq" defaultValue={data.incomeFreq} invalid={!!freqError}>
                    <option value="">Select</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Daily">Daily</option>
                  </Select>
                }
                size="large"
              >
                <Input invalid={!!incomeError} name="income" defaultValue={data.income} />
              </InputGroup>
            </Repeater>
          </FormGroup>

          <FormGroup>
            <InputGroup
              size="large"
              label="Total balances in savings / investment accounts (if any)"
              hint="Enter a dollar value"
              errorMessage={balanceError}
              before="$"
            >
              <Input invalid={!!balanceError} name="totalBal" defaultValue={data.totalBal} />
            </InputGroup>
          </FormGroup>
        </FormSection>
        <Cta
          primaryType="submit"
          secondaryOnClick={() => router.push('/credit-cards')}
          secondary="Back"
          tertiaryOnClick={() => router.push('/')}
          tertiary="Cancel"
        >
          Next
        </Cta>
      </Form>
    </div>
  );
}
