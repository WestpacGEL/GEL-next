import { render } from '@testing-library/react';
import React from 'react';

import { Dialog } from './dialog.component.jsx';

describe('Dialog', () => {
  it('renders the dialog', async () => {
    const { findByText } = render(
      <Dialog>
        <h3>test</h3>
      </Dialog>,
      { container: document.body },
    );
    expect(await findByText('test')).toBeVisible();
  });
});
