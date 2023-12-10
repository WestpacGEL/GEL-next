import { Badge, Table } from '@westpac/ui';
import { clsx } from 'clsx';
import React from 'react';

import { type ComponentPropsTableProps } from './component-props-table.types';

export function ComponentPropsTable({ className, componentProps, ...props }: ComponentPropsTableProps) {
  return (
    <div className="-mx-2 overflow-x-auto px-2 xsl:-mx-5 xsl:px-5 sm:-mx-6 sm:px-6 md:-mx-8 md:px-8 lg:-mx-10 lg:px-10">
      <Table bordered striped {...props} className={clsx('min-w-[800px]', className)}>
        <Table.Caption className="text-left">{props.caption} props</Table.Caption>
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
    </div>
  );
}
