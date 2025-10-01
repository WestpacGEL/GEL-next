import { Badge, Table, TableBody, TableCaption, TableCell, TableHeader, TableHeaderCell, TableRow } from '@westpac/ui';
import { clsx } from 'clsx';

import { type ComponentPropsTableProps } from './component-props-table.types';

export function ComponentPropsTable({ className, componentProps, ...props }: ComponentPropsTableProps) {
  return (
    <div className="xsl:-mx-5 xsl:px-5 -mx-2 overflow-x-auto px-2 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 lg:-mx-10 lg:px-10">
      <Table bordered striped {...props} className={clsx('min-w-[800px]', className)}>
        <TableCaption className="text-left">{props.caption} props</TableCaption>
        <TableHeader>
          <TableRow>
            {[
              { label: 'Property', className: 'w-1/12' },
              { label: 'Type', className: 'w-1/12' },
              { label: 'Default', className: 'w-1/12' },
              { label: 'Required', className: 'w-1/12' },
              { label: 'Description', className: 'w-3/12' },
            ].map(({ label, className }) => (
              <TableHeaderCell key={label} className={`text-left ${className}`}>
                {label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(componentProps.props || {}).map(([key, value]) => {
            const type = value.type.name;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            const defaultValue = value.defaultValue?.value;
            const required = value.required ? 'true' : 'false';

            return (
              <TableRow key={key}>
                <TableCell className="w-1/12">{key}</TableCell>
                <TableCell className="w-1/12">
                  {type && (
                    <Badge tag="code" color="faint" className="bg-surface-muted-pale text-left whitespace-normal">
                      {type}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="w-1/12">
                  {defaultValue && (
                    <Badge tag="code" color="faint" className="bg-surface-muted-pale">
                      {defaultValue}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="w-1/12">
                  <Badge tag="code" color="faint" className="bg-surface-muted-pale">
                    {required}
                  </Badge>
                </TableCell>
                <TableCell className="w-3/12">{value.description}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
