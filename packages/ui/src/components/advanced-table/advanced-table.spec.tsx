import { render, screen } from '@testing-library/react';

import { AdvancedTable } from './advanced-table.component.js';
import { AdvancedColumnProps } from './advanced-table.types.js';

describe('AdvancedTable', () => {
  const testColumns: AdvancedColumnProps<{ name: string }>[] = [{ key: 'name', title: 'Name' }];
  const testData: { name: string }[] = [{ name: 'John' }, { name: 'Jane' }];

  it('renders table with header and rows', () => {
    render(<AdvancedTable columns={testColumns} data={testData} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });
});
