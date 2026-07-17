type RowWithSubRows<T> = T & { subRows?: RowWithSubRows<T>[] };

/**
 * Whether any row in `data` could ever expand using the table data.
 */
export function hasExpandableRows<T>(
  data: T[],
  getRowCanExpand: ((row: T, info: { depth: number }) => boolean) | undefined,
  hasDetailPanel: boolean,
): boolean {
  if (!getRowCanExpand && hasDetailPanel) return data.length > 0;

  const check = (rows: RowWithSubRows<T>[], depth: number): boolean =>
    rows.some(row => {
      if (getRowCanExpand ? getRowCanExpand(row, { depth }) : Boolean(row.subRows?.length)) return true;
      return row.subRows ? check(row.subRows, depth + 1) : false;
    });

  return check(data as RowWithSubRows<T>[], 0);
}
