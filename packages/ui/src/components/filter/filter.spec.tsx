import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { FilterButtons, FilterInput } from './components/index.js';
import { Filter } from './filter.component.js';

const UNITED_STATES = 'United States';
const ALL_INTERNATIONAL = 'All International';

const filterButtons = [
  {
    id: 'one',
    text: UNITED_STATES,
  },
  {
    id: 'two',
    text: ALL_INTERNATIONAL,
  },
];

describe('Filter', () => {
  const onChange = vi.fn();
  const onClick = vi.fn();

  const TestFilter = () => {
    const [selected, setSelected] = useState<string>('one');

    return (
      <Filter>
        <FilterInput onChange={onChange} />
        <FilterButtons
          selectedButton={selected}
          onClick={id => {
            onClick();
            setSelected(id);
          }}
          filterButtons={filterButtons}
        />
      </Filter>
    );
  };

  it('should render Filter', () => {
    const { container } = render(<TestFilter />);
    expect(container).toBeInTheDocument();
  });

  it('should render all buttons', () => {
    const { getByText } = render(<TestFilter />);
    expect(getByText(UNITED_STATES)).toBeInTheDocument();
    expect(getByText(ALL_INTERNATIONAL)).toBeInTheDocument();
  });

  it('should change selected button and call onClick when clicked', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<TestFilter />);
    const defaultSelectedButton = getByRole('button', { name: UNITED_STATES });
    const defaultNotSelectedButton = getByRole('button', { name: ALL_INTERNATIONAL });
    expect(defaultSelectedButton).toHaveClass('bg-hero');
    expect(defaultNotSelectedButton).not.toHaveClass('bg-hero');

    await act(() => user.click(defaultNotSelectedButton));

    expect(onClick).toBeCalled();
    expect(defaultSelectedButton).not.toHaveClass('bg-hero');
    expect(defaultNotSelectedButton).toHaveClass('bg-hero');
  });

  it('should call onChange when something is typed in the input', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<TestFilter />);
    const searchInput = getByRole('textbox');

    await act(() => user.type(searchInput, 'test'));
    expect(onChange).toBeCalled();
  });
});
