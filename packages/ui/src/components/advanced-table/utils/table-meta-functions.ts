export const updateTableData = <T>(
  rowIndex: number,
  columnId: string,
  value: unknown,
  updateFn: (data: T[]) => void,
  data: T[],
) => {
  const updatedData = data.map((row, index) => {
    if (index === rowIndex) {
      return { ...data[rowIndex], [columnId]: value };
    }
    return row;
  });
  updateFn(updatedData);
};

export const deleteRow = <T>(rowIndex: number, updateFn: (data: T[]) => void, data: T[]) => {
  const updatedData = data.filter((_, index) => index !== rowIndex);
  updateFn(updatedData);
};
