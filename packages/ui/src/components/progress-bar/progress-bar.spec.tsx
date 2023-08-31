import { render } from '@testing-library/react';

import { ProgressBar } from './progress-bar.component.js';

describe('ProgressBar', () => {
  it('renders the component', () => {
    const { container } = render(<ProgressBar />);
    expect(container).toBeInTheDocument();
  });

  it('should have the correct label', () => {
    const { getByText } = render(<ProgressBar value={50} />);
    expect(getByText('50%')).toBeInTheDocument();
  });

  it('should have the label hidden when noLabel passed', () => {
    const { getByText } = render(<ProgressBar noLabel value={50} />);
    expect(getByText('50%')).toHaveClass('hidden');
  });

  it('should have the label hidden when skinny look', () => {
    const { getByText } = render(<ProgressBar look="skinny" value={50} />);
    expect(getByText('50%')).toHaveClass('hidden');
  });

  it('should have the correct height when skinny look', () => {
    const { getByLabelText } = render(<ProgressBar look="skinny" value={50} />);
    expect(getByLabelText('50%')).toHaveClass('h-[0.625rem]');
  });
});
