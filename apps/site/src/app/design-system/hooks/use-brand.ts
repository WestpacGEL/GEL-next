import { useParams } from 'next/navigation';

import { BANK_OPTIONS } from '@/constants/bank-options';

export function useBrand() {
  const params = useParams();
  const brand = params.brand ?? 'wbc';
  return BANK_OPTIONS.find(({ key }) => key === brand);
}
