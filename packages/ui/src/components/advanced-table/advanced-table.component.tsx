import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortDirection,
  useReactTable,
  ColumnDef,
  getExpandedRowModel,
  ExpandedState,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { ArrowRightIcon, ExpandLessIcon, ExpandMoreIcon } from '../icon/index.js';

import { AdvancedColumnProps, AdvancedTableProps } from './advanced-table.types.js';

export function AdvancedTable<T>({ data, columns, resizable, sortable = false, subRowKey }: AdvancedTableProps<T>) {
  const [localData] = useState(() => [...data]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const columnUpdate = (obj: AdvancedColumnProps<T>): ColumnDef<T> => {
    return {
      ...obj,
      id: obj.key,
      accessorKey: obj.key,
      cell: ({ row, getValue }) => (
        <div style={{ paddingLeft: `${row.depth * 2}rem` }} className="flex flex-row gap-1">
          {row.getCanExpand() && getValue<boolean>() ? (
            <button onClick={row.getToggleExpandedHandler()}>
              {row.getIsExpanded() ? <ExpandMoreIcon size="small" /> : <ArrowRightIcon size="small" />}
            </button>
          ) : null}
          {getValue<boolean>()}
        </div>
      ),
      enableSorting: obj.enableSorting ?? sortable,
      header: () => <h2 className="font-medium">{obj.title}</h2>,
    };
  };

  const generateLocalColumns = (arr: AdvancedColumnProps<T>[]): ColumnDef<T>[] => {
    return arr.map(obj => {
      if (obj.columns) {
        return {
          ...columnUpdate(obj),
          columns: generateLocalColumns(obj.columns),
        };
      } else {
        return columnUpdate(obj);
      }
    });
  };

  const localColumns: ColumnDef<T>[] = generateLocalColumns(columns);

  const table = useReactTable<T>({
    data: localData,
    columns: localColumns,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    // issue with the library and typing of subrows not working well with custom subrow types https://github.com/TanStack/table/discussions/4484
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    getSubRows: subRowKey ? (row: any) => row[subRowKey] : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  // used for performant resizing https://tanstack.com/table/latest/docs/framework/react/examples/column-resizing-performant
  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: Record<string, number> = {};
    headers.forEach(header => {
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    });
    return colSizes;
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  const sortingIcon = (sorted: SortDirection | false, onClick: () => void) => {
    return (
      <button onClick={onClick} className="cursor-pointer flex flex-col">
        <ExpandLessIcon
          size="xsmall"
          className="mb-[-2px]"
          style={{ visibility: sorted === 'desc' ? 'hidden' : undefined }}
        />
        <ExpandMoreIcon
          size="xsmall"
          className="mt-[-2px]"
          style={{ visibility: sorted === 'asc' ? 'hidden' : undefined }}
        />
      </button>
    );
  };

  return (
    <table
      className="border border-border border-spacing-0 rounded-md border-separate overflow-hidden"
      style={{ ...columnSizeVars, width: table.getTotalSize() }}
    >
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                style={{ width: `calc(var(--header-${header.id}-size) * 1px)` }}
                key={header.id}
                colSpan={header.colSpan}
                className="bg-background border-b border-border"
              >
                <div className="flex flex-row gap-1 p-2 relative">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanSort() &&
                    sortingIcon(header.column.getIsSorted(), () => {
                      header.column.toggleSorting();
                    })}
                  {resizable && (
                    <div
                      {...{
                        onDoubleClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `bg-border w-[2px] h-3 absolute right-0 cursor-col-resize rounded select-none`,
                      }}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="p-2 border-b border-border">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
