import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Accordion } from './accordion.component.js';
import { AccordionItem } from './components/index.js';

describe('Accordion', () => {
  const user = userEvent.setup();

  it('renders the component', () => {
    const { container } = render(
      <Accordion look="soft">
        <AccordionItem key="FoR" id="FoR" title="Founding of Rome">
          Arma virumque cano, Troiae qui primus ab oris.
        </AccordionItem>
        <AccordionItem key="MaR" id="MaR" title="Monarchy and Republic">
          Senatus Populusque Romanus.
        </AccordionItem>
        <AccordionItem key="Emp" id="Emp" title="Empire">
          Alea jacta est.
        </AccordionItem>
      </Accordion>,
    );
    expect(container).toBeInTheDocument();
  });
  it('shows the content of the tab that has been clicked', async () => {
    const { getByText } = render(
      <Accordion>
        <AccordionItem key="FoR" id="FoR" title="Founding of Rome">
          Arma virumque cano, Troiae qui primus ab oris.
        </AccordionItem>
        <AccordionItem key="MaR" id="MaR" title="Monarchy and Republic">
          Senatus Populusque Romanus.
        </AccordionItem>
        <AccordionItem key="Emp" id="Emp" title="Empire">
          Alea jacta est.
        </AccordionItem>
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
});
