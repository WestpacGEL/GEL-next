import { render } from '@testing-library/react';

import { Panel } from './panel.component.js';

import { PanelBody, PanelFooter } from './index.js';

describe('Panel', () => {
  it('renders the component', () => {
    const { container } = render(
      <Panel heading="test heading">
        <PanelBody>Test body</PanelBody>
        <PanelFooter>Test footer</PanelFooter>
      </Panel>,
    );
    expect(container).toBeInTheDocument();
  });

  it('should have the correct default styling', () => {
    const { getByText, getByTestId } = render(
      <Panel heading="test heading" data-testid="panel">
        <PanelBody>Test body</PanelBody>
        <PanelFooter>Test footer</PanelFooter>
      </Panel>,
    );
    expect(getByTestId('panel')).toHaveClass('border-border-hero');
    expect(getByText('test heading')).toHaveClass('bg-surface-hero text-text-mono');
  });

  it('should have the correct faint styling', () => {
    const { getByText, getByTestId } = render(
      <Panel heading="test heading" data-testid="panel" look="faint">
        <PanelBody>Test body</PanelBody>
        <PanelFooter>Test footer</PanelFooter>
      </Panel>,
    );
    expect(getByTestId('panel')).toHaveClass('border-border-muted-soft');
    expect(getByText('test heading')).toHaveClass(
      'border-b border-b-border-muted-soft bg-surface-muted-faint text-text-body',
    );
  });
});
