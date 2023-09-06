import { render } from '@testing-library/react';

import { Panel } from './panel.component.js';

describe('Panel', () => {
  it('renders the component', () => {
    const { container } = render(
      <Panel heading="test heading">
        <Panel.Body>Test body</Panel.Body>
        <Panel.Footer>Test footer</Panel.Footer>
      </Panel>,
    );
    expect(container).toBeInTheDocument();
  });

  it('should have the correct default styling', () => {
    const { getByText, getByTestId } = render(
      <Panel heading="test heading" data-testid="panel">
        <Panel.Body>Test body</Panel.Body>
        <Panel.Footer>Test footer</Panel.Footer>
      </Panel>,
    );
    expect(getByTestId('panel')).toHaveClass('border-hero');
    expect(getByText('test heading')).toHaveClass('bg-hero text-white');
  });

  it('should have the correct faint styling', () => {
    const { getByText, getByTestId } = render(
      <Panel heading="test heading" data-testid="panel" look="faint">
        <Panel.Body>Test body</Panel.Body>
        <Panel.Footer>Test footer</Panel.Footer>
      </Panel>,
    );
    expect(getByTestId('panel')).toHaveClass('border-border');
    expect(getByText('test heading')).toHaveClass('text-text bg-background border-b-border border-0 border-b');
  });
});
