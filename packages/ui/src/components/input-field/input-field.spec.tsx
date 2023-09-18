import { render } from '@testing-library/react';

import { Button, Input } from '../index.js';

import { InputField } from './input-field.component.js';
import { styles } from './input-field.styles.js';

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
});
