import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchIcon } from '../icon/index.js';
import { Button, Input, Select } from '../index.js';

import { InputField } from './input-field.component.js';
import { styles } from './input-field.styles.js';

const MOCK_INPUT = 'Mock input';

describe('InputField', () => {
  it('renders the component', () => {
    const { container } = render(
      <InputField label="Label" hint="I am a hint" supportingText="I am supporting text" after={<Button>Check</Button>}>
        <Input />
      </InputField>,
    );
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const style = styles();
    // TODO: use some variants for test
    expect(style).toBe('group m-0 mb-5 border-none p-0');
  });

  describe('when the label prop is defined', () => {
    test('then the label text should be displayed', () => {
      render(
        <InputField label="test-label">
          <Input />
        </InputField>,
      );
      expect(screen.getByText('test-label')).toBeInTheDocument();
    });
  });

  describe('when the hint prop is defined', () => {
    test('then the hint text should be displayed', () => {
      render(
        <InputField hint="test-hint">
          <Input />
        </InputField>,
      );
      expect(screen.getByText('test-hint')).toBeInTheDocument();
    });
  });

  describe('when the errorMessage prop is defined', () => {
    test('then the error message should be displayed', () => {
      render(
        <InputField errorMessage="test-error-message">
          <Input />
        </InputField>,
      );
      expect(screen.getByText('test-error-message')).toBeInTheDocument();
    });
  });

  describe('when the supportingText prop is defined', () => {
    test('then the supporting text should be displayed', () => {
      render(
        <InputField supportingText="test-supporting-text">
          <Input />
        </InputField>,
      );
      expect(screen.getByText('test-supporting-text')).toBeInTheDocument();
    });
  });

  describe('when an InputBefore component is a used', () => {
    describe('when a text child is used', () => {
      test('then the text component should be rendered', () => {
        render(
          <InputField before="before-text">
            <Input />
          </InputField>,
        );
        expect(screen.getByText('before-text')).toBeInTheDocument();
      });
    });

    describe('when the icon prop is defined', () => {
      test('then the icon component should be rendered', () => {
        render(
          <InputField before={{ icon: SearchIcon }}>
            <Input />
          </InputField>,
        );
        expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
      });
    });

    describe('when a button child is used', () => {
      test('then the button should be rendered', () => {
        render(
          <InputField before={<Button>Button</Button>}>
            <Input />
          </InputField>,
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
      });

      test('then the button should be clickable', async () => {
        const user = userEvent.setup();
        const handleClick = vitest.fn();
        render(
          <InputField before={<Button onClick={handleClick}>InputButton</Button>}>
            <Input />
          </InputField>,
        );
        await user.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });

    describe('when a select child is used', () => {
      test('then the select should be rendered', () => {
        render(
          <InputField
            before={
              <Select size="medium" invalid={false}>
                <option>Select</option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
              </Select>
            }
          >
            <Input />
          </InputField>,
        );
        expect(screen.getByRole('combobox')).toBeInTheDocument();
      });

      test('then the select should be interactable', async () => {
        const user = userEvent.setup();
        render(
          <InputField
            before={
              <Select size="medium" invalid={false}>
                <option>Select</option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
              </Select>
            }
          >
            <Input />
          </InputField>,
        );
        const select = screen.getByRole('combobox');
        await user.selectOptions(select, 'One');
        expect(select).toHaveValue('One');
      });
    });
  });

  describe('when an InputAfter component is a used', () => {
    describe('when a text child is used', () => {
      test('then the text component should be rendered', () => {
        render(
          <InputField after="after-text">
            <Input />
          </InputField>,
        );
        expect(screen.getByText('after-text')).toBeInTheDocument();
      });
    });

    describe('when the icon prop is defined', () => {
      test('then the icon component should be rendered', () => {
        render(
          <InputField after={{ icon: SearchIcon }}>
            <Input />
          </InputField>,
        );
        expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
      });
    });

    describe('when a button child is used', () => {
      test('then the button should be rendered', () => {
        render(
          <InputField after={<Button>Button</Button>}>
            <Input />
          </InputField>,
        );
        expect(screen.getByRole('button')).toBeInTheDocument();
      });

      test('then the button should be clickable', async () => {
        const user = userEvent.setup();
        const handleClick = vitest.fn();
        render(
          <InputField after={<Button onClick={handleClick}>InputButton</Button>}>
            <Input />
          </InputField>,
        );
        await user.click(screen.getByRole('button'));
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });

    describe('when a select child is used', () => {
      test('then the select should be rendered', () => {
        render(
          <InputField
            after={
              <Select size="medium" invalid={false}>
                <option>Select</option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
              </Select>
            }
          >
            <Input />
          </InputField>,
        );
        expect(screen.getByRole('combobox')).toBeInTheDocument();
      });

      test('then the select should be interactable', async () => {
        const user = userEvent.setup();
        render(
          <InputField
            after={
              <Select size="medium" invalid={false}>
                <option>Select</option>
                <option>One</option>
                <option>Two</option>
                <option>Three</option>
              </Select>
            }
          >
            <Input />
          </InputField>,
        );
        const select = screen.getByRole('combobox');
        await user.selectOptions(select, 'One');
        expect(select).toHaveValue('One');
      });
    });
  });

  describe('when the Input component is used', () => {
    test('then an input should be rendered', () => {
      render(
        <InputField label="Mock input">
          <Input />
        </InputField>,
      );

      expect(screen.getByRole('textbox', { name: MOCK_INPUT })).toBeInTheDocument();
    });

    describe('when a default value is defined', () => {
      test('then the value of the text input should match the value', () => {
        render(
          <InputField label="Mock input">
            <Input defaultValue="test-value" />
          </InputField>,
        );
        expect(screen.getByRole('textbox', { name: MOCK_INPUT })).toHaveValue('test-value');
      });
    });

    describe('when the value prop is defined', () => {
      test('then the value of the text input should match the value', async () => {
        render(
          <InputField label="Mock input">
            <Input value="test-value" onChange={() => {}} />
          </InputField>,
        );

        expect(screen.getByRole('textbox', { name: MOCK_INPUT })).toHaveValue('test-value');
      });
    });

    describe('when the onChange prop is defined', () => {
      test('then the callback should be fired as the user types', async () => {
        const user = userEvent.setup();
        const handleChange = vitest.fn();
        render(
          <InputField label="Mock input">
            <Input value="test-value" onChange={handleChange} />
          </InputField>,
        );
        const input = screen.getByRole('textbox', { name: MOCK_INPUT });
        await user.type(input, 't');
        expect(handleChange).toHaveBeenCalledTimes(1);
      });
    });

    describe('when a user types in the input field', () => {
      test('then the value should be displayed in the input', async () => {
        const user = userEvent.setup();
        render(
          <InputField label="Mock input">
            <Input />
          </InputField>,
        );

        const input = screen.getByRole('textbox', { name: MOCK_INPUT });
        await user.type(input, 'test-text');
        expect(input).toHaveValue('test-text');
      });
    });

    describe('when the invalid prop is defined', () => {
      test('then the input should be invalid', () => {
        render(
          <InputField label="Mock input">
            <Input invalid />
          </InputField>,
        );
        expect(screen.getByRole('textbox', { name: MOCK_INPUT })).toBeInvalid();
      });
    });

    describe('when the disabled prop is defined', () => {
      test('then the input should be disabled', () => {
        render(
          <InputField label="Mock input">
            <Input defaultValue="test-text" disabled />
          </InputField>,
        );

        expect(screen.getByRole('textbox', { name: MOCK_INPUT })).toBeDisabled();
      });
    });
  });

  describe('when the isFieldset prop is defined', () => {
    test('then a fieldset should be rendered', () => {
      render(
        <InputField label="Mock input" tag="fieldset">
          <Input />
        </InputField>,
      );

      expect(screen.getByRole('group')).toBeInTheDocument();
    });
  });
});
