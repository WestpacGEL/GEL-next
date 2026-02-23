import { ColumnDef } from '@tanstack/react-table';

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

  // TODO: Convert to function column, might include expansion arrow?
  const selectableColumn = (): ColumnDef<T> => {
    return {
      id: 'select-column',
      header: ({ table }) => (
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <input type="checkbox" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
        </div>
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
