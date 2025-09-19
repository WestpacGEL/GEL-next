'use client';

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

type CreditCardFormData = {
  address: string;
  cardLimit?: string;
  creditLimitType: string;
  dependants: string;
  dobDay?: number;
  dobMonth?: number;
  dobYear?: number;
  email: string;
  expenseFreq: string;
  expenses: string;
  familyName: string;
  givenName: string;
  housing: string;
  housingLength?: number;
  income: string;
  incomeFreq: string;
  middleName?: string;
  mobileNumber: string;
  name: string;
  nonWestpacCards: string;
  repaymentFreq: string;
  repayments: string;
  sharedExpenses: string;
  title: string;
  totalBal: string;
  totalBalNonWestpac?: string;
};

type CreditCardContextType = {
  data: CreditCardFormData;
  setData: Dispatch<SetStateAction<CreditCardFormData>>;
};

const CreditCardContext = createContext<CreditCardContextType | null>(null);

export const useCreditCard = () => {
  const context = useContext(CreditCardContext);

  if (!context) {
    throw new Error('Cannot call useCreditCard from outside of CreditCardContextProvider');
  }

  return context;
};

export function CreditCardContextProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CreditCardFormData>({
    address: '',
    creditLimitType: '',
    dependants: '',
    dobDay: undefined,
    dobMonth: undefined,
    dobYear: undefined,
    email: '',
    expenseFreq: 'Monthly',
    expenses: '',
    familyName: '',
    givenName: '',
    housing: '',
    housingLength: undefined,
    income: '',
    incomeFreq: 'Monthly',
    mobileNumber: '',
    name: '',
    nonWestpacCards: '',
    repaymentFreq: 'Monthly',
    repayments: '',
    sharedExpenses: '',
    totalBal: '',
    title: '',
  });

  return <CreditCardContext.Provider value={{ data, setData }}>{children}</CreditCardContext.Provider>;
}
