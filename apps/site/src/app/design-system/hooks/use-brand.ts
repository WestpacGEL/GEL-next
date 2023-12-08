import { useSearchParams } from 'next/navigation';

import { BANK_OPTIONS } from '@/constants/bank-options';

export function useBrand() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand') ?? 'wbc';
  return BANK_OPTIONS.find(({ key }) => key === brand);
}
