import {
  ButtonGroup,
  Field,
  Form,
  FormGroup,
  Selector,
  SelectorCheckbox,
  SelectorHint,
  SelectorLabel,
} from '@westpac/ui';
import { Controller, useForm } from 'react-hook-form';

import { defaultError } from '@/constants/form-contsants';

import { Cta } from '../cta/cta';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'AUD',
});

const ACCOUNTS = [
  {
    accountName: 'Westpac Choice',
    balance: 2978.54,
    accountNumber: '032-532 836595',
  },
  {
    accountName: 'Rocket Repay Home Loan',
    balance: -1200837.93,
    accountNumber: '032-532 000173',
  },
  {
    accountName: 'Altitude Black World Mastercard',
    balance: -747.23,
    accountNumber: 'xxxx xxxx xx03 6284',
  },
  {
    accountName: '55 Day Mastercard',
    balance: -874.1,
    accountNumber: 'xxxx xxxx xx03 4499',
  },
];

export type AccountSelectionFormData = {
  accountType: 'closed' | 'active';
  accounts: string[];
};

export function AccountSelectionForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (formData: AccountSelectionFormData) => unknown;
  onCancel?: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountSelectionFormData>();

  return (
    <Form id="credit-card" spacing="large" className="p-0" onSubmit={event => void handleSubmit(onSubmit)(event)}>
      <FormGroup>
        <Field aria-label="Account type" errorMessage={errors.accountType?.message}>
          <Controller
            control={control}
            name="accountType"
            rules={{ required: defaultError }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ButtonGroup
                aria-label="Account type"
                size="large"
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched/blur
                value={value}
                block={{ initial: true, md: false }}
                errorMessage={errors.accountType?.message}
                buttons={[
                  { value: 'active', label: 'Active' },
                  { value: 'closed', label: 'Closed' },
                ]}
              />
            )}
          />
        </Field>
      </FormGroup>
      <FormGroup>
        <Field aria-label="Accounts" errorMessage={errors.accounts?.message}>
          <Controller
            control={control}
            name="accounts"
            rules={{ required: defaultError }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Selector type="checkbox" onChange={onChange} onBlur={onBlur} value={value} aria-label="Accounts">
                {ACCOUNTS.map(({ accountName, accountNumber, balance }) => (
                  <SelectorCheckbox
                    key={accountNumber}
                    value={accountNumber}
                    after={<SelectorLabel>{formatter.format(balance).replace('A', '')}</SelectorLabel>}
                  >
                    <SelectorLabel>{accountName}</SelectorLabel>
                    <SelectorHint>{accountNumber}</SelectorHint>
                  </SelectorCheckbox>
                ))}
              </Selector>
            )}
          />
        </Field>
      </FormGroup>
      <Cta primaryType="submit" tertiaryOnClick={onCancel} tertiary="Cancel">
        Continue
      </Cta>
    </Form>
  );
}
