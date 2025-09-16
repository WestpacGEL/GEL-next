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

export default function IncomeAndSavings() {
  const { setRopeStep } = useSidebar();
  const { data, setData } = useCreditCard();
  const [otherCardError, setOtherCardError] = useState('');
  const [repaymentsError, setRepaymentsError] = useState('');
  const [repaymentFrequencyError, setRepaymentFrequencyError] = useState('');
  const [totalBalanceError, setTotalBalanceError] = useState('');
  const [otherCards, setOtherCards] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrorType[]>([]);
  const searchParams = useSearchParams();
  const isFlattenRope = searchParams.get('flatten');

  // eslint-disable-next-line sonarjs/cognitive-complexity
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
      setValidationErrors([
        ...(!repaymentFreq ? [{ id: 'repaymentFreq', label: 'Repayment frequency' }] : []),
        ...(!repayments ? [{ id: 'repayments', label: 'Your loan repayments' }] : []),
        ...(otherCards === 'Yes' && !totalBal
          ? [{ id: 'totalBal', label: 'Total balances of non-Westpac cards' }]
          : []),
        ...(!otherCards ? [{ id: 'otherCards', label: 'Do you have any non-Westpac credit cards?' }] : []),
      ]);
    } else {
      setData({ ...data, repaymentFreq, repayments, totalBal, nonWestpacCards: otherCards });
      router.push(`/credit-cards/home-life${isFlattenRope ? '?flatten=true' : ''}`);
    }
  };

  useEffect(() => {
    setRopeStep(2);
  }, [setRopeStep]);

  const router = useRouter();

  return (
    <div>
      <BackButton
        onClick={() => router.push(`/credit-cards/income-and-savings${isFlattenRope ? '?flatten=true' : ''}`)}
      >
        Back to Income and savings
      </BackButton>
      <CustomHeading
        groupHeading="Your finances"
        leadText="Provide the total balances of any non-Westpac loans and credit cards you have."
      >
        Loans & cards
      </CustomHeading>
      {validationErrors.length >= 1 && <ErrorValidationAlert errors={validationErrors} />}
      <Form id="credit-card" spacing="large" onSubmit={handleSubmit}>
        <FormSection className="border-none !p-0">
          <FormGroup>
            <InputGroup
              label="Your loan repayments (if any)"
              hint="For example Home, Investment or Personal loans, overdrafts"
              instanceId="repayments"
              errorMessage={repaymentFrequencyError || repaymentsError}
              before="$"
              width={{ initial: 'full', md: 10 }}
              after={
                <Select
                  name="repaymentFreq"
                  id="repaymentFreq"
                  invalid={!!repaymentFrequencyError}
                  defaultValue={data.repaymentFreq}
                >
                  <option value="">Select</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Fortnightly">Fortnightly</option>
                  <option value="Monthly">Monthly</option>
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
              id="otherCards"
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
                instanceId="totalBal"
                size="large"
                label="Total balances of non-Westpac cards"
                hint="Enter a dollar value"
                errorMessage={totalBalanceError}
                before="$"
                width={{ initial: 'full', md: 10 }}
              >
                <Input invalid={!!totalBalanceError} name="totalBal" defaultValue={data.totalBal} />
              </InputGroup>
            </FormGroup>
          )}
        </FormSection>
        <Cta primaryType="submit" tertiaryOnClick={() => router.push('/')} tertiary="Cancel">
          Next
        </Cta>
      </Form>
    </div>
  );
}
