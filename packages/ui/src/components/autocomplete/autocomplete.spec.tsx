import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Autocomplete } from './autocomplete.component.js';
import { AutocompleteItem } from './components/autocomplete-item/autocomplete-item.component.js';

describe('Autocomplete', () => {
  it('renders the component', () => {
    const { container } = render(
      <Autocomplete aria-label="animals">
        <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
        <AutocompleteItem key="cat">Cat</AutocompleteItem>
        <AutocompleteItem key="dog">Dog</AutocompleteItem>
        <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
        <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
        <AutocompleteItem key="snake">Snake</AutocompleteItem>
      </Autocomplete>,
    );
    expect(container).toBeInTheDocument();
  });

  it('filters the options by typing on the component', async () => {
    const { getByRole, getByText, queryByText } = render(
      <Autocomplete aria-label="animals">
        <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
        <AutocompleteItem key="cat">Cat</AutocompleteItem>
        <AutocompleteItem key="dog">Dog</AutocompleteItem>
        <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
        <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
        <AutocompleteItem key="snake">Snake</AutocompleteItem>
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
        <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
        <AutocompleteItem key="cat">Cat</AutocompleteItem>
        <AutocompleteItem key="dog">Dog</AutocompleteItem>
        <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
        <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
        <AutocompleteItem key="snake">Snake</AutocompleteItem>
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
        <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
      </Autocomplete>,
    );
    expect(getByLabelText('test')).toBeInTheDocument();
  });

  it('renders the hint text', () => {
    const { getByText } = render(
      <Autocomplete aria-label="animals" hintMessage="test">
        <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
      </Autocomplete>,
    );
    expect(getByText('test')).toBeInTheDocument();
  });

  it('renders the error text', () => {
    const { getByText } = render(
      <Autocomplete aria-label="animals" errorMessage="test">
        <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
      </Autocomplete>,
    );
    expect(getByText('test')).toBeInTheDocument();
  });

  it('show a message if no options are found', async () => {
    const { getByRole, getByText } = render(
      <Autocomplete aria-label="animals" noOptionsMessage="No options">
        <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
        <AutocompleteItem key="cat">Cat</AutocompleteItem>
        <AutocompleteItem key="dog">Dog</AutocompleteItem>
        <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
        <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
        <AutocompleteItem key="snake">Snake</AutocompleteItem>
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
        <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
        <AutocompleteItem key="cat">Cat</AutocompleteItem>
        <AutocompleteItem key="dog">Dog</AutocompleteItem>
        <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
        <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
        <AutocompleteItem key="snake">Snake</AutocompleteItem>
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
        <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
        <AutocompleteItem key="cat">Cat</AutocompleteItem>
        <AutocompleteItem key="dog">Dog</AutocompleteItem>
        <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
        <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
        <AutocompleteItem key="snake">Snake</AutocompleteItem>
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
        <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
      </Autocomplete>,
    );
    expect(getByLabelText('Loading')).toBeInTheDocument();
    expect(queryByLabelText('Search')).not.toBeInTheDocument();
  });
});
