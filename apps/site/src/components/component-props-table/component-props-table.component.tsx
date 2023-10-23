import { Badge, Table } from '@westpac/ui';
import React from 'react';

import { type ComponentPropsTableProps } from './component-props-table.types';

export function ComponentPropsTable({ className, componentProps, ...props }: ComponentPropsTableProps) {
  console.dir(componentProps, { depth: null });
  return (
    <Table bordered striped {...props}>
      <Table.Caption className="text-left">{componentProps.displayName} props</Table.Caption>
      <Table.Header>
        <Table.Row>
          {[
            { label: 'Property', className: 'w-1/12' },
            { label: 'Type', className: 'w-1/12' },
            { label: 'Default', className: 'w-1/12' },
            { label: 'Required', className: 'w-1/12' },
            { label: 'Description', className: 'w-3/12' },
          ].map(({ label, className }) => (
            <Table.HeaderCell key={label} className={`text-left ${className}`}>
              {label}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.entries(componentProps.props || {}).map(([key, value]) => {
          const type = value.type.name;
          const defaultValue = value.defaultValue?.value;
          const required = value.required ? 'true' : 'false';

          return (
            <Table.Row key={key}>
              <Table.Cell className="w-1/12">{key}</Table.Cell>
              <Table.Cell className="w-1/12">
                {type && (
                  <Badge color="faint" className="whitespace-normal bg-background text-left">
                    {type}
                  </Badge>
                )}
              </Table.Cell>
              <Table.Cell className="w-1/12">
                {defaultValue && (
                  <Badge color="faint" className="bg-background">
                    {defaultValue}
                  </Badge>
                )}
              </Table.Cell>
              <Table.Cell className="w-1/12">
                <Badge color="faint" className="bg-background">
                  {required}
                </Badge>
              </Table.Cell>
              <Table.Cell className="w-3/12">{value.description}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
