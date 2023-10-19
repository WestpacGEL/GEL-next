import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Accordion } from './accordion.component.js';
import { styles } from './accordion.styles.js';

describe('Accordion', () => {
  const user = userEvent.setup();

  it('renders the component', () => {
    const { container } = render(
      <Accordion look="soft">
        <Accordion.Item key="FoR" title="Founding of Rome">
          Arma virumque cano, Troiae qui primus ab oris.
        </Accordion.Item>
        <Accordion.Item key="MaR" title="Monarchy and Republic">
          Senatus Populusque Romanus.
        </Accordion.Item>
        <Accordion.Item key="Emp" title="Empire">
          Alea jacta est.
        </Accordion.Item>
      </Accordion>,
    );
    expect(container).toBeInTheDocument();
  });
  it('shows the content of the tab that has been clicked', async () => {
    const { getByText } = render(
      <Accordion>
        <Accordion.Item key="FoR" title="Founding of Rome">
          Arma virumque cano, Troiae qui primus ab oris.
        </Accordion.Item>
        <Accordion.Item key="MaR" title="Monarchy and Republic">
          Senatus Populusque Romanus.
        </Accordion.Item>
        <Accordion.Item key="Emp" title="Empire">
          Alea jacta est.
        </Accordion.Item>
      </Accordion>,
    );

    user.click(getByText('Founding of Rome'));

    await waitFor(() => {
      expect(getByText('Arma virumque cano, Troiae qui primus ab oris.')).toBeVisible();
    });

    user.click(getByText('Monarchy and Republic'));

    await waitFor(() => {
      expect(getByText('Senatus Populusque Romanus.')).toBeVisible();
    });
  });
  it('renders the style correctly', () => {
    const style = styles({ rounded: true });
    expect(style).toBe('text-text border-border flex flex-col border overflow-hidden rounded');
  });
});
