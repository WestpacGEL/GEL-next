import { Field, Selector, SelectorCheckbox, SelectorHint, SelectorLabel } from '@westpac/ui';
import { Controller, useForm } from 'react-hook-form';

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
    <form id="credit-card" onSubmit={event => void handleSubmit(onSubmit)(event)}>
      <Field aria-label="Accounts" errorMessage={errors.accounts?.message} label="Select accounts">
        <Controller
          control={control}
          name="accounts"
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
      <Cta primaryType="submit" tertiaryOnClick={onCancel} tertiary="Cancel">
        Continue
      </Cta>
    </form>
  );
}
