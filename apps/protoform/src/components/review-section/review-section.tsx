'use client';

import { Button } from '@westpac/ui';
import { EditIcon } from '@westpac/ui/icon';
import { useRouter } from 'next/navigation';

export function ReviewSection({
  sections,
  baseEditRoute,
}: {
  baseEditRoute: string;
  sections: { items: { label: string; value: string }[]; sectionName: string; sectionPath: string }[];
}) {
  const router = useRouter();
  return sections.map((section, i) => (
    <div key={i} className="border-b border-b-border py-5">
      <h3 className="typography-body-7 pb-5 font-bold text-heading">{section.sectionName}</h3>
      {section.items.map((item, j) => (
        <div key={j} className="flex flex-row justify-between pb-5 max-md:flex-col">
          <p className="typography-body-10 pb-1 text-muted">{item.label}</p>
          <p>{item.value}</p>
        </div>
      ))}
      <Button
        type="button"
        size="small"
        look="primary"
        soft
        iconAfter={EditIcon}
        onClick={() => router.push(`${baseEditRoute}${section.sectionPath}`)}
      >
        Edit {section.sectionName.toLowerCase()}
      </Button>
    </div>
  ));
}
