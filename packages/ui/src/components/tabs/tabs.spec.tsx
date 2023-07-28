import { render } from '@testing-library/react';

import { Tabs } from './tabs.component.js';
import { styles } from './tabs.styles.js';

describe('Tabs', () => {
  it('renders the component', () => {
    const { container } = render(
      <Tabs>
        <Tabs.Panel key="FoR" title="Founding of Rome">
          Arma virumque cano, Troiae qui primus ab oris.
        </Tabs.Panel>
        <Tabs.Panel key="MaR" title="Monarchy and Republic">
          Senatus Populusque Romanus.
        </Tabs.Panel>
        <Tabs.Panel key="Emp" title="Empire">
          Alea jacta est.
        </Tabs.Panel>
      </Tabs>,
    );
    expect(container).toBeInTheDocument();
  });
  it('renders the style correctly', () => {
    const { base, tabList } = styles({ look: 'default', orientation: 'horizontal' });
    // TODO: use some variants for test
    expect(base()).toBe('flex flex-col');
    expect(tabList()).toBe('relative z-10 flex mb-[-1px] flex-row gap-[2px]');
  });
});
