import { render } from '@testing-library/react';

import { Breadcrumb } from './breadcrumb.component.js';

describe('Breadcrumb', () => {
  it('renders the component', () => {
    const { container } = render(
      <Breadcrumb>
        <Breadcrumb.Item>Item 1</Breadcrumb.Item>
        <Breadcrumb.Item isDisabled>Item 2</Breadcrumb.Item>
        <Breadcrumb.Item>Item 3</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(container).toBeInTheDocument();
  });
});
