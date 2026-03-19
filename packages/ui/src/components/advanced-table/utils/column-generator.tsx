import { ColumnDef } from '@tanstack/react-table';

import { RemoveIcon, TickIcon } from '../../icon/index.js';
import { VisuallyHidden } from '../../visually-hidden/index.js';
import { AdvancedColumnProps } from '../advanced-table.types.js';
import { DefaultHeadCell } from '../components/cell-defaults/default-head-cell/default-head-cell.component.js';

export function columnGenerator<T>({
  columns,
  enableRowSelection,
}: {
  columns: AdvancedColumnProps<T>[];
  enableRowSelection?: boolean;
}) {
  const columnUpdate = (obj: AdvancedColumnProps<T>): ColumnDef<T> => {
    return {
      ...obj,
      id: obj.key,
      accessorKey: obj.key,
      header: ({ header }) => <DefaultHeadCell header={header} title={obj.title} />,
      meta: {
        editable: obj.editable,
      },
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

  const selectableColumn = (): ColumnDef<T> => {
    return {
      id: 'select-column',
      header: ({ table }) => (
        <label className="flex cursor-pointer items-center rounded-sm has-focus-visible:focus-outline">
          <VisuallyHidden>
            <input
              type="checkbox"
              checked={table.getIsAllRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          </VisuallyHidden>
          <span className="flex size-4 shrink-0 items-center justify-center rounded-sm border border-border-hero bg-background-white">
            {table.getIsAllRowsSelected() && <TickIcon className="overflow-visible" size="small" color="hero" />}
            {table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() && (
              <RemoveIcon className="overflow-visible" size="small" color="hero" />
            )}
          </span>
        </label>
      ),
      cell: ({ row }) => (
        <label className="flex cursor-pointer items-center rounded-sm has-focus-visible:focus-outline">
          <VisuallyHidden>
            <input type="checkbox" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
          </VisuallyHidden>
          <span className="flex size-4 shrink-0 items-center justify-center rounded-sm border border-border-hero bg-background-white">
            {row.getIsSelected() && <TickIcon className="overflow-visible" size="small" color="hero" />}
          </span>
        </label>
      ),
      enableResizing: false,
      enableColumnFilter: false,
      enableGlobalFilter: false,
      enableSorting: false,
      enableGrouping: false,
      enableHiding: false,
      enableMultiSort: false,
      enablePinning: true,
      size: 50,
    };
  };

  const finalColumns = [selectableColumn(), ...generateLocalColumns(columns)];
  return enableRowSelection ? finalColumns : generateLocalColumns(columns);
}
