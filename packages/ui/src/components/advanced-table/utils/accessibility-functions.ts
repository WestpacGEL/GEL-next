import { Cell } from '@tanstack/react-table';

export function handleTableCellKeyDown<T>(
  event: React.KeyboardEvent<HTMLTableCellElement>,
  cell: Cell<T, unknown>,
  rowRef: React.RefObject<HTMLTableRowElement> | null,
) {
  event.stopPropagation();

  if (!rowRef || !('current' in rowRef) || !rowRef.current) return;

  const rowElement = rowRef.current;
  const cells = Array.from(rowElement.children) as HTMLElement[];
  const cellIndex = cells.findIndex(child => child.id === cell.id);

  const tableBody = rowElement.parentElement;
  if (!tableBody) return;
  const rows = Array.from(tableBody.children) as HTMLTableRowElement[];
  const rowIndex = rows.findIndex(row => row === rowElement);

  switch (event.key) {
    case 'ArrowLeft': {
      if (cellIndex > 0) {
        cells[cellIndex - 1].focus();
      } else {
        rowElement.focus();
      }
      break;
    }
    case 'ArrowRight': {
      if (cellIndex < cells.length - 1) {
        cells[cellIndex + 1].focus();
      } else {
        rowElement.focus();
      }
      break;
    }
    case 'ArrowUp': {
      if (rowIndex > 0) {
        const prevRow = rows[rowIndex - 1];
        const targetCell = prevRow.children[cellIndex] as HTMLElement;
        targetCell?.focus();
      }
      break;
    }
    case 'ArrowDown': {
      if (rowIndex < rows.length - 1) {
        const nextRow = rows[rowIndex + 1];
        const targetCell = nextRow.children[cellIndex] as HTMLElement;
        targetCell?.focus();
      }
      break;
    }
    default:
      break;
  }
}

export function handleTableRowKeyDown(event: React.KeyboardEvent<HTMLTableRowElement>) {
  const rowElement = event.currentTarget;
  const tableBody = rowElement.parentElement;
  if (!tableBody) return;
  const rowsArr = Array.from(tableBody.children) as HTMLTableRowElement[];
  const rowIndex = rowsArr.findIndex(r => r === rowElement);
  const cells = Array.from(rowElement.children) as HTMLElement[];
  switch (event.key) {
    case 'ArrowUp': {
      if (rowIndex > 0) {
        rowsArr[rowIndex - 1].focus();
      }
      break;
    }
    case 'ArrowDown': {
      if (rowIndex < rowsArr.length - 1) {
        rowsArr[rowIndex + 1].focus();
      }
      break;
    }
    case 'ArrowRight': {
      if (cells.length > 0) {
        cells[0].focus();
      }
      break;
    }
    case 'ArrowLeft': {
      if (cells.length > 0) {
        cells[cells.length - 1].focus();
      }
      break;
    }
    default:
      break;
  }
}
