import { ColumnDef } from '@tanstack/react-table';

import { AdvancedColumnProps } from '../advanced-table.types.js';

export function columnGenerator<T>({
  sortable,
  groupable,
  columns,
}: {
  sortable?: boolean;
  groupable?: boolean;
  columns: AdvancedColumnProps<T>[];
}) {
  const columnUpdate = (obj: AdvancedColumnProps<T>): ColumnDef<T> => {
    return {
      ...obj,
      id: obj.key,
      accessorKey: obj.key,
      enableSorting: obj.enableSorting ?? sortable,
      enableGrouping: obj.enableGrouping ?? groupable,
      header: () => <h2 className="whitespace-nowrap font-medium">{obj.title}</h2>,
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
  return finalColumns;
}
