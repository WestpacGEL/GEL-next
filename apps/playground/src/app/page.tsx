'use client';

import Link from 'next/link';

import { Card } from '@/components/card/card.component';
import { useThemeStore } from '@/theme/theme.store';
import { BrandKey } from '@/theme/theme.types';

export default function Home() {
  const { activeThemeKey, setTheme } = useThemeStore();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul className="flex w-1/2 flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-bold">Select brand</label>
          <div className="h-[250px] w-[250px] bg-surface-primary" />
          <select value={activeThemeKey} onChange={e => setTheme(e.target.value as BrandKey)} className="border p-2">
            <option value="wbc">Westpac</option>
            <option value="stg">St. George</option>
            <option value="bom">Bank of Melbourne</option>
            <option value="bsa">BankSA</option>
          </select>
        </div>
        <Link href="/form-focus" className="underline">
          Form focus-on-error test (react-hook-form)
        </Link>
        <Card active />
        <Card brand="wbc" />
        <Card brand="stg" />
        <Card brand="bom" />
        <Card brand="bsa" />
      </ul>
    </main>
  );
}
