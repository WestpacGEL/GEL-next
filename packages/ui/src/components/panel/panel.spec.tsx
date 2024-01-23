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
    expect(getByTestId('panel')).toHaveClass('border-hero');
    expect(getByText('test heading')).toHaveClass('bg-hero text-white');
  });

  it('should have the correct faint styling', () => {
    const { getByText, getByTestId } = render(
      <Panel heading="test heading" data-testid="panel" look="faint">
        <PanelBody>Test body</PanelBody>
        <PanelFooter>Test footer</PanelFooter>
      </Panel>,
    );
    expect(getByTestId('panel')).toHaveClass('border-border');
    expect(getByText('test heading')).toHaveClass('text-text bg-background border-b-border border-0 border-b');
  });
});
