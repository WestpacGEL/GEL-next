import { render } from '@testing-library/react';

import { InfoIcon, PdfFileIcon } from '../icon/index.js';

import { Link } from './link.component.js';

describe('Link', () => {
  it('renders the component', () => {
    const { container } = render(<Link />);
    expect(container).toBeInTheDocument();
  });

  it('should have the correct style when standalone', () => {
    const { getByTestId } = render(
      <Link href="#" type="standalone" data-testid="test-link">
        This is a test
      </Link>,
    );
    expect(getByTestId('test-link')).toHaveClass('text-text items-center hover:underline');
  });

  it('should have the correct style when inline', () => {
    const { getByTestId } = render(
      <Link href="#" type="inline" data-testid="test-link">
        This is a test
      </Link>,
    );
    expect(getByTestId('test-link')).toHaveClass('text-link items-baseline underline hover:no-underline');
  });

  it('should render ArrowRightIcon when type is standalone and no other icon passed in', () => {
    const { getByLabelText } = render(
      <Link href="#" type="standalone">
        This is a test
      </Link>,
    );
    expect(getByLabelText('Arrow Right')).toBeVisible();
  });

  it('should render icon when icon is passed in as IconBefore or IconAfter', () => {
    const { getByLabelText } = render(
      <Link href="#" type="standalone" iconBefore={PdfFileIcon} iconAfter={InfoIcon}>
        This is a test
      </Link>,
    );
    expect(getByLabelText('Pdf File')).toBeVisible();
    expect(getByLabelText('Info')).toBeVisible();
  });
});
