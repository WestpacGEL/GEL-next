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
    expect(style.base()).toBe('relative flex flex-col');
    expect(style.clearButton()).toBe(
      'flex cursor-default items-center justify-center text-text-50 hover:text-border-60',
    );
    expect(style.input()).toBe('w-full appearance-none bg-[transparent] outline-none form-control-large');
    expect(style.label()).toBe('block text-left text-sm font-medium text-text');
    expect(style.outerWrapper()).toBe(
      'form-control relative flex w-full flex-row items-stretch overflow-hidden pr-2 disabled:form-control-disabled',
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
});
