import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

import { FilterButtons, FilterInput } from './components/index.js';
import { Filter } from './filter.component.js';

const firstBtnText = 'United States';
const secondBtnText = 'All International';

const filterButtons = [
  {
    id: 'one',
    text: firstBtnText,
  },
  {
    id: 'two',
    text: secondBtnText,
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
    expect(getByText(firstBtnText)).toBeInTheDocument();
    expect(getByText(secondBtnText)).toBeInTheDocument();
  });

  it('should change selected button and call onClick when clicked', async () => {
    const user = userEvent.setup();
    const { getByText } = render(<TestFilter />);
    const defaultSelectedButton = getByText(firstBtnText);
    const defaultNotSelectedButton = getByText(secondBtnText);

    expect(defaultSelectedButton).toHaveStyle(`background-color: var(--colors-hero)`);
    expect(defaultNotSelectedButton).toHaveStyle('background-color: #FFFFF');

    await act(() => user.click(defaultNotSelectedButton));

    expect(onClick).toBeCalled();
    expect(defaultSelectedButton).toHaveStyle('background-color: #FFFFF');
    expect(defaultNotSelectedButton).toHaveStyle(`background-color: var(--colors-hero)`);
  });

  it('should call onChange when something is typed in the input', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<TestFilter />);
    const searchInput = getByRole('textbox');

    await act(() => user.type(searchInput, 'test'));
    expect(onChange).toBeCalled();
  });
});
