import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tabs } from './tabs.component.js';
import { styles } from './tabs.styles.js';

describe('Tabs', () => {
  const user = userEvent.setup();

  it('renders the component', () => {
    const { container } = render(
      <Tabs justify>
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
  it('shows the content of the tab that has been clicked', async () => {
    const { getByText } = render(
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
    await act(() => {
      user.click(getByText('Founding of Rome'));
    });
    expect(getByText('Arma virumque cano, Troiae qui primus ab oris.')).toBeVisible();

    await act(() => {
      user.click(getByText('Monarchy and Republic'));
    });
    expect(getByText('Senatus Populusque Romanus.')).toBeVisible();
  });
  it('shows the content according to the selectedKey', async () => {
    const { getByText } = render(
      <Tabs selectedKey="MaR">
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
    expect(getByText('Senatus Populusque Romanus.')).toBeVisible();
  });
  it('renders the style correctly', () => {
    const { base, tabList } = styles({ look: 'default', orientation: 'horizontal' });
    // TODO: use some variants for test
    expect(base()).toBe('flex flex-col');
    expect(tabList()).toBe('relative z-10 flex bg-white mb-[-1px] flex-row gap-[2px]');
  });
});
