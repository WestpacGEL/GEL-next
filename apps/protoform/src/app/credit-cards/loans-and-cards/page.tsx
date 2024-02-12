'use client';

import { ButtonGroup, Form, FormGroup, FormSection, Input, InputGroup, Select } from '@westpac/ui';
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
  const [otherCardError, setOtherCardError] = useState('');
  const [repaymentsError, setRepaymentsError] = useState('');
  const [repaymentFrequencyError, setRepaymentFrequencyError] = useState('');
  const [totalBalanceError, setTotalBalanceError] = useState('');
  const [otherCards, setOtherCards] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { repaymentFreq, repayments, totalBal } = getFormData(e.currentTarget) as {
      repaymentFreq: string;
      repayments: string;
      totalBal: string;
    };
    if (!repaymentFreq || !repayments || (otherCards === 'Yes' && !totalBal) || !otherCards) {
      setRepaymentFrequencyError(!repaymentFreq ? defaultError : '');
      setRepaymentsError(!repayments ? defaultError : '');
      setTotalBalanceError(otherCards === 'Yes' && !totalBal ? defaultError : '');
      setOtherCardError(!otherCards ? defaultError : '');
    } else {
      setData({ ...data, repaymentFreq, repayments, totalBal, nonWestpacCards: otherCards });
      router.push('/credit-cards/home-life');
    }
  };

  useEffect(() => {
    setRopeStep(2);
  }, [setRopeStep]);

  const router = useRouter();

  return (
    <div>
      <BackButton onClick={() => router.push('/credit-cards/income-and-savings')}>
        Back to Income and savings
      </BackButton>
      <CustomHeading>Loans & cards</CustomHeading>
      <Form id="credit-card" spacing="large" className="pt-6" onSubmit={handleSubmit}>
        <FormSection className="border-none !p-0">
          <FormGroup>
            <InputGroup
              label="Your loan repayments (if any)"
              hint="For example Home, Investment or Personal loans, overdrafts"
              errorMessage={repaymentFrequencyError || repaymentsError}
              before="$"
              after={
                <Select name="repaymentFreq" invalid={!!repaymentFrequencyError} defaultValue={data.repaymentFreq}>
                  <option value="">Select</option>
                  <option value="Yearly">Yearly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Daily">Daily</option>
                </Select>
              }
              size="large"
            >
              <Input invalid={!!repaymentsError} name="repayments" defaultValue={data.repayments} />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <ButtonGroup
              label="Do you have any non-Westpac credit cards?"
              hintMessage="Including store and charge cards, lines of credit"
              size="large"
              block={{ initial: true, md: false }}
              errorMessage={otherCardError}
              defaultValue={data.nonWestpacCards}
              buttons={[
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' },
              ]}
              onChange={setOtherCards}
            />
          </FormGroup>
          {otherCards === 'Yes' && (
            <FormGroup>
              <InputGroup
                size="large"
                label="Total balances of non-Westpac cards"
                hint="Enter a dollar value"
                errorMessage={totalBalanceError}
                before="$"
              >
                <Input invalid={!!totalBalanceError} name="totalBal" defaultValue={data.totalBal} />
              </InputGroup>
            </FormGroup>
          )}
        </FormSection>
        <Cta
          primaryType="submit"
          secondaryOnClick={() => router.push('/credit-cards/income-and-savings')}
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
