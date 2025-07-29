import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tabs, TabsPanel } from './tabs.component.js';
import { styles } from './tabs.styles.js';

describe('Tabs', () => {
  const user = userEvent.setup();

  it('renders the component', () => {
    const { container } = render(
      <Tabs justify>
        <TabsPanel key="FoR" title="Founding of Rome">
          Arma virumque cano, Troiae qui primus ab oris.
        </TabsPanel>
        <TabsPanel key="MaR" title="Monarchy and Republic">
          Senatus Populusque Romanus.
        </TabsPanel>
        <TabsPanel key="Emp" title="Empire">
          Alea jacta est.
        </TabsPanel>
      </Tabs>,
    );
    expect(container).toBeInTheDocument();
  });

  it('should keep tab child mounted in DOM if keep mounted flag is true to keep state intact', async () => {
    const { getByText, getAllByRole } = render(
      <Tabs justify>
        <TabsPanel key="FoR" title="Founding of Rome" keepMounted={true}>
          Arma virumque cano, Troiae qui primus ab oris.
        </TabsPanel>
        <TabsPanel key="MaR" title="Monarchy and Republic">
          Senatus Populusque Romanus.
        </TabsPanel>
        <TabsPanel key="Emp" title="Empire">
          Alea jacta est.
        </TabsPanel>
      </Tabs>,
    );

    await act(async () => {
      // click on second tab
      await user.click(getByText('Monarchy and Republic'));
    });

    const allPanels = getAllByRole('tabpanel', { hidden: true });
    expect(allPanels[0]).toBeInTheDocument(); // still there in DOM as keepMounted=true
    expect(allPanels[1]).toBeInTheDocument(); // must be there as it is currenly selected item
    expect(allPanels[2]).not.toBeDefined(); //not in DOM as not selected nor
  });
  it('shows the content of the tab that has been clicked', async () => {
    const { getByText } = render(
      <Tabs>
        <TabsPanel key="FoR" title="Founding of Rome">
          Arma virumque cano, Troiae qui primus ab oris.
        </TabsPanel>
        <TabsPanel key="MaR" title="Monarchy and Republic">
          Senatus Populusque Romanus.
        </TabsPanel>
        <TabsPanel key="Emp" title="Empire">
          Alea jacta est.
        </TabsPanel>
      </Tabs>,
    );
    await act(async () => {
      await user.click(getByText('Founding of Rome'));
    });
    expect(getByText('Arma virumque cano, Troiae qui primus ab oris.')).toBeVisible();

    await act(async () => {
      await user.click(getByText('Monarchy and Republic'));
    });
    expect(getByText('Senatus Populusque Romanus.')).toBeVisible();
  });
  it('shows the content according to the selectedKey', async () => {
    const { getByText } = render(
      <Tabs selectedKey="MaR">
        <TabsPanel key="FoR" title="Founding of Rome">
          Arma virumque cano, Troiae qui primus ab oris.
        </TabsPanel>
        <TabsPanel key="MaR" title="Monarchy and Republic">
          Senatus Populusque Romanus.
        </TabsPanel>
        <TabsPanel key="Emp" title="Empire">
          Alea jacta est.
        </TabsPanel>
      </Tabs>,
    );
    expect(getByText('Senatus Populusque Romanus.')).toBeVisible();
  });
  it('renders the style correctly', () => {
    const { base, tabList } = styles({ look: 'default', orientation: 'horizontal' });
    // TODO: use some variants for test
    expect(base()).toBe('flex flex-col');
    expect(tabList()).toBe('relative z-10 flex mb-[-1px] flex-row gap-[2px]');
  });
});
