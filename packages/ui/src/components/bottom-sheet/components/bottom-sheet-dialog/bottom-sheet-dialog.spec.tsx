import { render } from '@testing-library/react';
import React from 'react';

import { BottomSheetDialog } from './bottom-sheet-dialog.component.jsx';

describe('BottomSheetDialog', () => {
  it('renders the dialog', async () => {
    const { findByText } = render(
      <BottomSheetDialog>
        <h3>test</h3>
      </BottomSheetDialog>,
      { container: document.body },
    );
    expect(await findByText('test')).toBeVisible();
  });
});
