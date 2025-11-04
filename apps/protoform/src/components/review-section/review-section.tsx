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
    <div key={i} className="border-b border-b-border-muted-soft py-5">
      <h3 className="pb-5 typography-body-7 font-bold text-text-heading">{section.sectionName}</h3>
      <div className="flex flex-col gap-5">
        {section.items.map((item, j) => (
          <div key={j} className="flex flex-col gap-1">
            <p className="typography-body-10 text-text-muted">{item.label}</p>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
      <Button
        type="button"
        size="small"
        look="primary"
        soft
        iconAfter={EditIcon}
        onClick={() => router.push(`${baseEditRoute}${section.sectionPath}`)}
        className="mt-5"
      >
        Edit {section.sectionName.toLowerCase()}
      </Button>
    </div>
  ));
}
