import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Autocomplete } from './autocomplete.component.js';
import { styles } from './autocomplete.styles.js';

describe('Autocomplete', () => {
  it('renders the component', () => {
    const { container } = render(
      <Autocomplete aria-label="animals">
        <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
        <Autocomplete.Item key="cat">Cat</Autocomplete.Item>
        <Autocomplete.Item key="dog">Dog</Autocomplete.Item>
        <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>
        <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>
        <Autocomplete.Item key="snake">Snake</Autocomplete.Item>
      </Autocomplete>,
    );
    expect(container).toBeInTheDocument();
  });

  it('renders the style correctly', () => {
    const style = styles({ size: 'large' });
    // TODO: use some variants for test
    expect(style.base()).toBe('relative flex flex-1 flex-col');
    expect(style.clearButton()).toBe(
      'flex cursor-default items-center justify-center text-text-50 hover:text-border-60',
    );
    expect(style.input()).toBe('appearance-none bg-[transparent] outline-none form-control-large');
    expect(style.label()).toBe('block text-left text-sm font-medium text-text');
    expect(style.outerWrapper()).toBe(
      'form-control relative flex flex-1 flex-row items-stretch overflow-hidden pr-2 disabled:form-control-disabled group-[.input-field-after]:rounded-r-none group-[.input-field-before]:rounded-l-none group-[.input-field-after]:border-r-0 group-[.input-field-before]:border-l-0',
    );
  });

  it('filters the options by typing on the component', async () => {
    const { getByRole, getByText, queryByText } = render(
      <Autocomplete aria-label="animals">
        <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
        <Autocomplete.Item key="cat">Cat</Autocomplete.Item>
        <Autocomplete.Item key="dog">Dog</Autocomplete.Item>
        <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>
        <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>
        <Autocomplete.Item key="snake">Snake</Autocomplete.Item>
      </Autocomplete>,
      // { container: document.body },
    );
    const textbox = getByRole('combobox');
    const user = userEvent.setup();
    await act(async () => {
      await user.type(textbox, 'an');
    });
    expect(getByText('Kangaroo')).toBeInTheDocument();
    expect(getByText('Red Panda')).toBeInTheDocument();
    expect(queryByText('Snake')).not.toBeInTheDocument();
    expect(queryByText('Cat')).not.toBeInTheDocument();
  });

  it('selects the item', async () => {
    const { getByRole, getByText } = render(
      <Autocomplete aria-label="animals">
        <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
        <Autocomplete.Item key="cat">Cat</Autocomplete.Item>
        <Autocomplete.Item key="dog">Dog</Autocomplete.Item>
        <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>
        <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>
        <Autocomplete.Item key="snake">Snake</Autocomplete.Item>
      </Autocomplete>,
      // { container: document.body },
    );
    const textbox = getByRole('combobox');
    const user = userEvent.setup();
    await act(async () => {
      await user.type(textbox, 'an');
    });
    await act(async () => {
      await user.click(getByText('Kangaroo'));
    });
    expect(textbox).toHaveValue('Kangaroo');
  });

  it('renders the label', () => {
    const { getByLabelText } = render(
      <Autocomplete aria-label="animals" label="test">
        <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
      </Autocomplete>,
    );
    expect(getByLabelText('test')).toBeInTheDocument();
  });

  it('renders the hint text', () => {
    const { getByText } = render(
      <Autocomplete aria-label="animals" hintMessage="test">
        <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
      </Autocomplete>,
    );
    expect(getByText('test')).toBeInTheDocument();
  });

  it('renders the error text', () => {
    const { getByText } = render(
      <Autocomplete aria-label="animals" errorMessage="test">
        <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
      </Autocomplete>,
    );
    expect(getByText('test')).toBeInTheDocument();
  });

  it('show a message if no options are found', async () => {
    const { getByRole, getByText } = render(
      <Autocomplete aria-label="animals" noOptionsMessage="No options">
        <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
        <Autocomplete.Item key="cat">Cat</Autocomplete.Item>
        <Autocomplete.Item key="dog">Dog</Autocomplete.Item>
        <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>
        <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>
        <Autocomplete.Item key="snake">Snake</Autocomplete.Item>
      </Autocomplete>,
      // { container: document.body },
    );
    const textbox = getByRole('combobox');
    const user = userEvent.setup();
    await act(async () => {
      await user.type(textbox, 'zz');
    });
    expect(getByText('No options')).toBeInTheDocument();
  });

  it('shows the footer when options are open', async () => {
    const { getByRole, getByText } = render(
      <Autocomplete aria-label="animals" footer="test">
        <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
        <Autocomplete.Item key="cat">Cat</Autocomplete.Item>
        <Autocomplete.Item key="dog">Dog</Autocomplete.Item>
        <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>
        <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>
        <Autocomplete.Item key="snake">Snake</Autocomplete.Item>
      </Autocomplete>,
      // { container: document.body },
    );
    const textbox = getByRole('combobox');
    const user = userEvent.setup();
    await act(async () => {
      await user.type(textbox, 'an');
    });
    expect(getByText('test')).toBeInTheDocument();
  });

  it('show a message if no options are found and footer if both provided', async () => {
    const { getByRole, getByText } = render(
      <Autocomplete aria-label="animals" noOptionsMessage="No options" footer="footer">
        <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
        <Autocomplete.Item key="cat">Cat</Autocomplete.Item>
        <Autocomplete.Item key="dog">Dog</Autocomplete.Item>
        <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>
        <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>
        <Autocomplete.Item key="snake">Snake</Autocomplete.Item>
      </Autocomplete>,
      // { container: document.body },
    );
    const textbox = getByRole('combobox');
    const user = userEvent.setup();
    await act(async () => {
      await user.type(textbox, 'zz');
    });
    expect(getByText('No options')).toBeInTheDocument();
    expect(getByText('footer')).toBeInTheDocument();
  });

  it('shows progress indicator when loading state is true instead of search icon', () => {
    const { getByLabelText, queryByLabelText } = render(
      <Autocomplete aria-label="animals" loadingState={true}>
        <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
      </Autocomplete>,
    );
    expect(getByLabelText('Loading')).toBeInTheDocument();
    expect(queryByLabelText('Search')).not.toBeInTheDocument();
  });
});
