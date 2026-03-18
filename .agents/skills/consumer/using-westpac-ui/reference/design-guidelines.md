# @westpac/ui Design Guidelines

Comprehensive design guidelines, dos/don'ts, user experience notes, and accessibility information for all @westpac/ui components.


## Accordions

**Description:** Accordions are grouped sets of expanding and collapsing panels. Use them to group and simplify large amounts of content such as product information.

### Design Guidelines

#### Accordion

**Default accordion:** See Visual design for the usage recommendations for the default style.

```tsx
<Accordion rounded>
  <AccordionItem title="Mole">
The Mole had been working very hard all the morning, spring-cleaning his little home. First with brooms, then with dusters; then on ladders and steps and chairs, with a brush and a pail of whitewash; till he had dust in his throat and eyes, and splashes of whitewash all over his black fur, and an aching back and weary arms. Spring was moving in the air above and in the earth below and around him, penetrating even his dark and lowly little house with its spirit of divine discontent and longing. It was small wonder, then, that he suddenly flung down his brush on the floor, said ‘Bother!’ and ‘O blow!’ and also ‘Hang spring-cleaning!’ and bolted out of the house without even waiting to put on his coat.
  </AccordionItem>
  <AccordionItem title="Rat">
The Rat said nothing, but stooped and unfastened a rope and hauled on it; then lightly stepped into a little boat which the Mole had not observed. It was painted blue outside and white within, and was just the size for two animals; and the Mole’s whole heart went out to it at once, even though he did not yet fully understand its uses. The Rat sculled smartly across and made fast. Then he held up his forepaw as the Mole stepped gingerly down. ‘Lean on that!’ he said. ‘Now then, step lively!’ and the Mole to his surprise and rapture found himself actually seated in the stern of a real boat.
  </AccordionItem>
  <AccordionItem title="Toad">
‘Toad’s out, for one,’ replied the Otter. ‘In his brand-new wager-boat; new togs, new everything!’ The two animals looked at each other and laughed. ‘Once, it was nothing but sailing,’ said the Rat, ‘Then he tired of that and took to punting. Nothing would please him but to punt all day and every day, and a nice mess he made of it. Last year it was house-boating, and we all had to go and stay with him in his house-boat, and pretend we liked it. He was going to spend the rest of his life in a house-boat. It’s all the same, whatever he takes up; he gets tired of it, and starts on something fresh.’
  </AccordionItem>
</Accordion>
```

**Lego accordion:** See Visual design for the usage recommendations for the lego style.

```tsx
<Accordion look="lego" rounded={false}>
  <AccordionItem title="Mole">
The Mole had been working very hard all the morning, spring-cleaning his little home. First with brooms, then with dusters; then on ladders and steps and chairs, with a brush and a pail of whitewash; till he had dust in his throat and eyes, and splashes of whitewash all over his black fur, and an aching back and weary arms. Spring was moving in the air above and in the earth below and around him, penetrating even his dark and lowly little house with its spirit of divine discontent and longing. It was small wonder, then, that he suddenly flung down his brush on the floor, said ‘Bother!’ and ‘O blow!’ and also ‘Hang spring-cleaning!’ and bolted out of the house without even waiting to put on his coat.
  </AccordionItem>
  <AccordionItem title="Rat">
The Rat said nothing, but stooped and unfastened a rope and hauled on it; then lightly stepped into a little boat which the Mole had not observed. It was painted blue outside and white within, and was just the size for two animals; and the Mole’s whole heart went out to it at once, even though he did not yet fully understand its uses. The Rat sculled smartly across and made fast. Then he held up his forepaw as the Mole stepped gingerly down. ‘Lean on that!’ he said. ‘Now then, step lively!’ and the Mole to his surprise and rapture found himself actually seated in the stern of a real boat.
  </AccordionItem>
  <AccordionItem title="Toad">
‘Toad’s out, for one,’ replied the Otter. ‘In his brand-new wager-boat; new togs, new everything!’ The two animals looked at each other and laughed. ‘Once, it was nothing but sailing,’ said the Rat, ‘Then he tired of that and took to punting. Nothing would please him but to punt all day and every day, and a nice mess he made of it. Last year it was house-boating, and we all had to go and stay with him in his house-boat, and pretend we liked it. He was going to spend the rest of his life in a house-boat. It’s all the same, whatever he takes up; he gets tired of it, and starts on something fresh.’
  </AccordionItem>
</Accordion>
```

**Responsive tabcordion:** This a responsive component that can render as either [tabs](/components/tabs) or an accordion, depending on the screen width available. The tabcordion, can appear in either the default or lego style, see Visual design for the usage recommendations for either style.

```tsx
<>
  <Accordion className="sm:hidden">
    <AccordionItem title="Mole">
The Mole had been working very hard all the morning, spring-cleaning his little home. First with brooms, then with dusters; then on ladders and steps and chairs, with a brush and a pail of whitewash; till he had dust in his throat and eyes, and splashes of whitewash all over his black fur, and an aching back and weary arms. Spring was moving in the air above and in the earth below and around him, penetrating even his dark and lowly little house with its spirit of divine discontent and longing. It was small wonder, then, that he suddenly flung down his brush on the floor, said ‘Bother!’ and ‘O blow!’ and also ‘Hang spring-cleaning!’ and bolted out of the house without even waiting to put on his coat.
    </AccordionItem>
    <AccordionItem title="Rat">
The Rat said nothing, but stooped and unfastened a rope and hauled on it; then lightly stepped into a little boat which the Mole had not observed. It was painted blue outside and white within, and was just the size for two animals; and the Mole’s whole heart went out to it at once, even though he did not yet fully understand its uses. The Rat sculled smartly across and made fast. Then he held up his forepaw as the Mole stepped gingerly down. ‘Lean on that!’ he said. ‘Now then, step lively!’ and the Mole to his surprise and rapture found himself actually seated in the stern of a real boat.
    </AccordionItem>
    <AccordionItem title="Toad">
‘Toad’s out, for one,’ replied the Otter. ‘In his brand-new wager-boat; new togs, new everything!’ The two animals looked at each other and laughed. ‘Once, it was nothing but sailing,’ said the Rat, ‘Then he tired of that and took to punting. Nothing would please him but to punt all day and every day, and a nice mess he made of it. Last year it was house-boating, and we all had to go and stay with him in his house-boat, and pretend we liked it. He was going to spend the rest of his life in a house-boat. It’s all the same, whatever he takes up; he gets tired of it, and starts on something fresh.’
    </AccordionItem>
  </Accordion>
  <Tabs className="max-sm:hidden">
    <TabsPanel title="Mole">
The Mole had been working very hard all the morning, spring-cleaning his little home. First with brooms, then with dusters; then on ladders and steps and chairs, with a brush and a pail of whitewash; till he had dust in his throat and eyes, and splashes of whitewash all over his black fur, and an aching back and weary arms. Spring was moving in the air above and in the earth below and around him, penetrating even his dark and lowly little house with its spirit of divine discontent and longing. It was small wonder, then, that he suddenly flung down his brush on the floor, said ‘Bother!’ and ‘O blow!’ and also ‘Hang spring-cleaning!’ and bolted out of the house without even waiting to put on his coat.
    </TabsPanel>
    <TabsPanel title="Rat">
The Rat said nothing, but stooped and unfastened a rope and hauled on it; then lightly stepped into a little boat which the Mole had not observed. It was painted blue outside and white within, and was just the size for two animals; and the Mole’s whole heart went out to it at once, even though he did not yet fully understand its uses. The Rat sculled smartly across and made fast. Then he held up his forepaw as the Mole stepped gingerly down. ‘Lean on that!’ he said. ‘Now then, step lively!’ and the Mole to his surprise and rapture found himself actually seated in the stern of a real boat.
    </TabsPanel>
    <TabsPanel title="Toad">
‘Toad’s out, for one,’ replied the Otter. ‘In his brand-new wager-boat; new togs, new everything!’ The two animals looked at each other and laughed. ‘Once, it was nothing but sailing,’ said the Rat, ‘Then he tired of that and took to punting. Nothing would please him but to punt all day and every day, and a nice mess he made of it. Last year it was house-boating, and we all had to go and stay with him in his house-boat, and pretend we liked it. He was going to spend the rest of his life in a house-boat. It’s all the same, whatever he takes up; he gets tired of it, and starts on something fresh.’
    </TabsPanel>
  </Tabs>
</>
```

#### Dos And Donts

- Avoid using too much content and consider smaller viewports when designing responsive web apps.
- Avoid changing the styles of Tabs and Accordions (border, colour, size etc )
- Do use Tabs and Accordions on any background (light or dark).
- Avoid making Tab and Accordion labels too long. Although they will wrap the interface will become cluttered very quickly.

#### User Experience

The accordion component has two modes:

1. **Accordion** – collapsible content containers, allowing multiple content panels to be visible simultaneously, by selecting the relevant bar.
1. **Tabcordion** – a responsive combination of accordions and Tabs.

‘Tabcordion’ is the term we use to describe responsive tabs. When using a Tabs in our web applications we typically experience layout issues when the application needs to display on small viewports (phones). Often the tabs won’t fit horizontally in the limited screen size. To remedy this problem, we developed the Tabcordion where the Tabs will turn into an Accordion when viewed on smaller devices (phones).

This component is useful when trying to simplify and group content for users to view when they need it, as opposed to displaying everything at once.

#### Visual Design

Tabs and accordions, can have one of two styles applied to them *Default* and *Lego*:

The **Default style** is designed to be subtle and understated while still providing a clear indication of which tab or accordion bar is selected, and its related content. To further reinforce this relationship a transition is used to display related content when a tab or accordion bar is selected. Generous padding provides a larger hit area and important breathing space to provide emphasis without adding noise.

The **Lego tabs** are designed to be more prominent. This design came out of a project request for a more emphasised component which would also add some brand colour to an otherwise dry, text heavy interface.

Tabs and accordions are intended to visually group related content. When used correctly with moderate content they do this extremely well. However, if too much content is used it becomes difficult to visualise this relationship as content extends below the viewport.

### Accessibility

#### Accessibility Features

- The accordions are implemented as a set of buttons. This approach has shown to provide a better user experience.
- An indicator outline appears around the toggle buttons when focused
- The accordion shape, text and accordion toggle icons are visible in Windows High Contrast Mode

###### Accessibility in the HTML

The accordion uses the useAccordion and useAccordionItem hooks from React Aria to handle the accessibility code. Read the [full specifications](https://reactspectrum.blob.core.windows.net/reactspectrum/d77b35e970e5549f66b47a83f07423f5c93b7297/docs/react-aria/useAccordion.html) for more information.

###### Keyboard support

Keyboard users navigate the accordions toggles as a set of buttons. Keyboard interaction requires use of ‘tab’ and ‘enter’ (or ‘space’) keys to select, rather than arrow keys.

---


## Alerts

**Description:** Alerts use a cross-brand palette of reserved, contextual colours providing a flexible, consistent message system for common user interactions.

### Design Guidelines

#### Alert Boxes

Alerts come in five different styles and are configurable to allow for simple styling, eg links, bold and italics. They come with a default icon and can be configured with or without close buttons. The info style Alert is the only style that allows flexibility in the icon used. Definitions and usage examples for each style are provided further down the page.

```tsx
<div>
  <ComponentTitle>Success</ComponentTitle>
  <Alert look="success">
    <strong>Thank you</strong> Your account has successfully been opened.
  </Alert>
  <ComponentTitle>Information</ComponentTitle>
  <Alert look="info" dismissible>
    <strong>Changed Opening Hours</strong> The opening hours for this branch have changed.
  </Alert>
  <ComponentTitle>Warning</ComponentTitle>
  <Alert look="warning" dismissible>
    <strong>Time out</strong> Please make sure you complete this process, this operation will time out in 5 min.
  </Alert>
  <ComponentTitle>Danger</ComponentTitle>
  <Alert look="danger" dismissible>
    <strong>Please fix the following 3 errors:</strong>
    <ul className="[&_li]:my-1 [&_li]:underline">
      <li>Select a title</li>
      <li>Enter a given name</li>
      <li>Enter a family name</li>
    </ul>
  </Alert>
  <ComponentTitle>System error</ComponentTitle>
  <Alert look="system" dismissible>
    <strong>System Error</strong> The server is not responding. Please try again later. We are sorry for any
    inconvenience.
  </Alert>
  <ComponentTitle>Flexible info style icon</ComponentTitle>
  <Alert look="info" icon={PhoneIcon}>
    Please make sure your mobile number is correct, we will use this to contact you if we have any questions about your
    application.
  </Alert>
</div>
```

#### Alert Text

###### Styles

Alert text comes in four different styles and is configurable to allow for simple styling, eg links, bold and italics. It must be used with the defaulted icon to comply with accessibility guidelines, as per Alert boxes. Definitions and usage examples for each style are provided further down the page.

```tsx
<div>
  <ComponentTitle>Success</ComponentTitle>
  <Alert look="success" mode="text">
    Your account has successfully been opened.
  </Alert>
  <ComponentTitle>Information</ComponentTitle>
  <Alert look="info" mode="text">
    The opening hours for this branch have changed.
  </Alert>
  <ComponentTitle>Warning</ComponentTitle>
  <Alert look="warning" mode="text">
    Please make sure you complete this process, this operation will time out in 5 min.
  </Alert>
  <ComponentTitle>Danger</ComponentTitle>
  <Alert look="danger" mode="text">
    Please enter a valid account number.
  </Alert>
</div>
```

###### Icon sizes

The icon that accompanies Alert text has three size options, Md-24px, Sm-18px and Xs-12px.

```tsx
<div>
     <ComponentTitle>Medium</ComponentTitle>
      <Alert look="info" iconSize="medium" mode="text">
        This alert has a <strong>Medium</strong> icon.
      </Alert>
      <ComponentTitle>Small</ComponentTitle>
      <Alert look="info" iconSize="small" mode="text">
        This alert has a <strong>Small</strong> icon.
      </Alert>
      <ComponentTitle>Extra Small</ComponentTitle>
      <Alert look="info" iconSize="xsmall" mode="text">
       This alert has an <strong>Extra Small</strong> icon.
      </Alert>
</div>
```

#### Dos And Donts

- Avoid formatting alert text.
- Don’t overuse alerts as this can diminish their effect and can make an experience feel broken.
- Alerts shouldn't be used for marketing messaging as other critical messages will be ignored through learned behaviours.
- Don’t use the reserved colour palette for anything other than alert message components.
- Don’t alter the colours or tints that make up each of the alert message components or use additional colours within the alert message.
- Don’t alter the borders colour, radius etc
- Avoid making alerts too complex. They’re only intended to be simple feedback messages.

#### User Experience

Alert boxes are used to differentiate and emphasise inline messaging, they are simple functional elements designed to clearly separate messaging from content. Alerts can be configured with a close button to allow the message to be dismissed and removed from the content flow, they have a default icon to communicate meaning without colour.

Use alerts to draw attention to specific messages in a particular context. They should be reserved for system responses, in context instructional messages, and warnings.

#### Alert types

**Success:** The green message colour and tick icon is used to communicate successful completion of a process or task. It is commonly used with confirmation messaging, the intention is to provide confidence that a process has been completed successfully and the user can now move on.

**Information:** The blue message colour and info icon is used to convey useful information. It should be used for things like instructions, feedback about information that has been provided, or high-level information about a system or process. This style provides flexibility to use a different icon. To remain accessible, do not use any of the default icons that are used for the other alert types.

**Warning:** The orange message colour and warning icon is for use in scenarios where the user needs to understand something before proceeding. It is saved for necessary messaging but not for error messages. For example, ‘this process will time-out in 3 min’ - use it as a ‘Watch out’, rather than a stop.

**Danger:** The red message colour and danger icon is most commonly used for error messages, eg form validation. This alert is to bring the user’s attention to something that they must address before they can proceed, generally a resolvable issue.

**System:** The System alert is for extraordinary circumstances where there is no way of proceeding. For example, the entire system has failed and there is no next step to offer the user.

#### Visual Design

Alerts are intentionally designed to differ from the UI content which is typically styled using the brands colours etc. Alerts are not intended to be part of the brand, rather they exist as a separate graphic style which (if used correctly) gives them more emphasis and allows customers to understand the difference between content and messaging.

Alerts convey meaning through colour and icons using a combination of carefully designed accessible colour and tint combinations. This cross-brand, contextual colour palette, called Reserved colours is for alert messaging only.

### Accessibility

#### Accessibility Features

- An `<svg>` element labelled with the specific Alert type represents the Alert icon
- A `<button>` element labeled “Close alert” identifies the close button action
- 'Info' Alerts can be configured with a custom icon. The custom icon must be relevant to the Alert message, sufficiently labeled and not one of the other pre-existing Alert icons.
- he Alert shape, text and icon content is visible in Windows High Contrast Mode (WHCM). The Alert type (colour) is not visible in WHCM, however the unique Alert icon provides this information.

###### Accessibility in the HTML

- An `<svg aria-label="{ICON_NAME}">` Provides a label that describes the Alert icon
- A `<role="img" focusable="false">` Prevents the Alert icon SVG element from being traversed by browsers that map the SVG to the ‘group’ role and from unnecessarily receiving focus in Internet Explorer (IE)
- A `<svg focusable=”false”>` Prevents the close button icon from being announced; it is labelled by the parent button

###### Keyboard support

Keyboard users navigate to the close button after the alert content.

#### Notes On Accessibility

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](#) - Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Perceivable

The Design System components have been designed to adhere to colour contrast ratios for both text and non-text elements. They have been coded to include text alternatives when required, and allow component text and labels to be resized. They do not use colour alone to convey information.

#### Use of colour

Alerts use the reserved palette of contextual colours. We do not recommend using the [reserved colours](#) for anything other than alert messaging. Tints used in the alert boxes are designed to maintain accessible contrast ratios with the alert text. We do not recommend using other tints of these colours as they may fall out of an accessible range.

Alerts come with a default icon, this allows the meaning of the alert to be perceived without colour.

Info type alerts can be configured with a custom icon. It's important that the custom icon is relevant to the alert message and not one of the other pre-existing alert icons.

Use the Colour impairment demonstration above to see how this component performs.

#### Understandable

It's important when crafting messages for alerts that they are understandable to a wide audience, particularly as they usually communicate important or critical information. Using the following guideline when composing alert copy will ensure they are effective.

Alert messages should:

- have context
- exclude jargon
- be succinct
- be direct
- serve a purpose.

Read more about [understanding WCAG reading levels](#)

---


## Autocomplete

**Description:** Autocomplete predicts and suggests possible inputs as users type, speeding up the input process and enhancing the user experience.

### Design Guidelines

#### Autocomplete

```tsx
<Autocomplete width="30"
  hintMessage="Search for the appropriate colour"
  label="What colour is the sky?"
  noOptionsMessage="No options"
  size="large"
>
  <AutocompleteItem>
    Green
  </AutocompleteItem>
  <AutocompleteItem>
    Purple
  </AutocompleteItem>
  <AutocompleteItem>
    Blue
  </AutocompleteItem>
</Autocomplete>
```

#### Dos And Don Ts

- Do use the Autocomplete field in scenarios where the user will already know the option they need to search for and select, e.g., their address or a country, etc.  
- Avoid using Autocomplete if the user needs to see the entire list of options before they can select, e.g., a list of Product specific options.

#### Error State

All form elements have associated error states, see [Error messages](/content/guidelines/error-message) in our content guidelines for more.

```tsx
<Autocomplete width="30"
  errorMessage="If there is an error it can go here"
  hintMessage="Search for the appropriate colour"
  label="What colour is the sky?"
  noOptionsMessage="No options"
  invalid
  size="large"
>
  <AutocompleteItem>
    Green
  </AutocompleteItem>
  <AutocompleteItem>
    Purple
  </AutocompleteItem>
  <AutocompleteItem>
    Blue
  </AutocompleteItem>
</Autocomplete>
```

#### Sizes

Autocomplete fields come in four different sizes (heights), which align to the regular text inputs within the Design system. Ensure when you are designing forms that you alway use the same size across element types.

```tsx
 <div>
    <Autocomplete width="30" className="mb-6"
      hintMessage="This is a Small autocomplete"
      label="Label"
      noOptionsMessage="No options"
    size="small"
    >
      <AutocompleteItem>
        Green
      </AutocompleteItem>
      <AutocompleteItem>
        Purple
      </AutocompleteItem>
      <AutocompleteItem>
        Blue
      </AutocompleteItem>
    </Autocomplete>
    <Autocomplete width="30" className="mb-6"
      hintMessage="This is a Medium autocomplete"
      label="Label"
      noOptionsMessage="No options"
    size="medium"
    >
      <AutocompleteItem>
        Green
      </AutocompleteItem>
      <AutocompleteItem>
        Purple
      </AutocompleteItem>
      <AutocompleteItem>
        Blue
      </AutocompleteItem>
    </Autocomplete>
    <Autocomplete width="30" className="mb-6"
      hintMessage="This is a Large autocomplete"
      label="Label"
      noOptionsMessage="No options"
    size="large"
    >
      <AutocompleteItem>
        Green
      </AutocompleteItem>
      <AutocompleteItem>
        Purple
      </AutocompleteItem>
      <AutocompleteItem>
        Blue
      </AutocompleteItem>
    </Autocomplete>
    <Autocomplete width="30" className="mb-6"
      hintMessage="This is a xLarge autocomplete"
      label="Label"
      noOptionsMessage="No options"
    size="xlarge"
    >
      <AutocompleteItem>
        Green
      </AutocompleteItem>
      <AutocompleteItem>
        Purple
      </AutocompleteItem>
      <AutocompleteItem>
        Blue
      </AutocompleteItem>
    </Autocomplete>
    </div>
```

#### User Experience

Using an Autocomplete field can streamline and accelerate the process of inputting information. As the user starts typing, a filtered list of options appears, based on the characters they have entered. It can be very useful in scenarios where the list of possible options is very long, and the user already knows the answer they are looking for. When used correctly, this component helps make selections more efficiently, reduces typos and generally improves the user experience. 

We suggest using the word *Search* somewhere in the hint text label, this, along with the Search icon, this sets the expectation of search-oriented functionality rather than a simple text input.

#### Variants

Autocomplete items support customisable styling, see some examples:

```tsx
() => {
  const options = [
    { name: 'Oliver Bennett', initials: 'OB', role: 'Compliance Officer, Legal' },
    { name: 'Mia Chandler', initials: 'MC', role: 'Financial Analyst, Finance' },
    { name: 'Zoe Chang', initials: 'ZC', role: 'UX Designer, Product Design' },
    { name: "Lucas D'Souza", initials: 'LD', role: 'Cybersecurity Specialist, Information Security' },
    { name: 'Leo Hartman', initials: 'LH', role: 'Software Engineer, IT & Development' },
    { name: 'Isla Morrison', initials: 'IM', role: 'Data Scientist, Business Intelligence' },
    { name: 'Ava Nguyen', initials: 'AN', role: 'HR Coordinator, Human Resources' },
    { name: 'Ethan Patel', initials: 'EP', role: 'Marketing Strategist, Marketing' },
    { name: 'Noah Rivera', initials: 'NR', role: 'Project Manager, Operations' },
    { name: 'Harper Singh', initials: 'HS', role: 'Sales Executive, Sales' },
  ];
  return (
    <Autocomplete
      hintMessage="Search for a staff member"
      label="Staff directory"
      noOptionsMessage="No options found, try a different spelling"
      width="30"
      aria-label="Staff directory"
      defaultItems={options}
    >
      {item => (
        <AutocompleteItem key={item.name} textValue={item.name}>
          <div className="flex items-center gap-2">
            <Circle className="size-5 bg-surface-muted text-text-mono">{item.initials}</Circle>
            <div className="flex flex-col ">
              <h3 className="typography-body-9">{item.name}</h3>
              <p className="typography-body-10 text-borderDark group-hover:text-text-mono group-[.is-focused]:text-text-mono">
                {item.role}
              </p>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};
```

```tsx
() => {
  const options = [
    { name: 'Nimbus Analytics Pty Ltd', abn: '123 456 789' },
    { name: 'Blueleaf Financial Group', abn: '987 654 321' },
    { name: 'Ironclad Risk Solutions', abn: '456 789 123' },
    { name: 'Summit Edge Advisory', abn: '321 654 987' },
    { name: 'Crimson Ledger Partners', abn: '159 753 486' },
    { name: 'EchoWave Consulting', abn: '753 159 246' },
    { name: 'Brightspire Capital', abn: '246 135 789' },
    { name: 'Veridian Strategy Co.', abn: '864 213 579' },
    { name: 'Oak & Sage Holdings', abn: '135 246 975' },
    { name: 'Silverline Ventures', abn: '579 864 312' },
  ];
  return (
    <Autocomplete
      hintMessage="Search for a Business"
      label="Find your business"
      noOptionsMessage="No options found, try a different spelling"
      width="30"
      aria-label="Business directory"
      defaultItems={options}
    >
      {item => (
        <AutocompleteItem key={item.name} textValue={item.name}>
          <div className="flex items-center gap-2">
            <div className="flex flex-col ">
              <h3 className="typography-body-9">{item.name}</h3>
              <p className="typography-body-10 text-borderDark group-hover:text-text-mono group-[.is-focused]:text-text-mono">
                {item.abn}
              </p>
            </div>
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};
```

#### Visual Design

As with most components in the GUI the Autocomplete is designed to be simple, unobtrusive and accessible. The addition of the Search icon, provides the affordance to the user that there is a search functionality as opposed to a straight input.

### Accessibility

#### Notes On Accessibility

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility) – Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Perceivable

*Autocomplete field-* These input fields have been designed and tested to have the correct amount of contrast and line weight around the border. This is important so as to quickly recognise the field as an affordance and also greatly assists those with low vision, and those without extensive knowledge of web design trends.

*Input labels -* Input labels should be placed above the input field. This helps promote scanning, readability and faster progress.

*Hint text -* Hint text should be placed directly under the input label for context. This also ensures on mobile the hint text is visible ‘on canvas’ and is not obscured by any select boxes or keypads when activated.

###### Robust

A label and a form control should be associated with each other either implicitly or explicitly. Web browsers provide the label as a larger clickable area, for example, to select or activate the control. It also ensures that assistive technology can refer to the correct label when presenting a form control.

---


## Badges

**Description:** Badges are small, styled UI items usually used with other elements. They can be used as a number count, to highlight a word or give context to an action needed.

### Design Guidelines

#### Badge Styles

Badges come in 2 different types:

- Default - used to highlight words
- Pill - used to highlight numbers

###### Badges - Default

```tsx
<Fragment>
  <p className="typography-body-10 text-text-muted">
    <em>Default</em>
  </p>
  <p className="my-2">
<Badge color="primary">Primary</Badge>{' '} 
<Badge color="hero">Hero</Badge>{' '}
<Badge color="faint">Faint</Badge>{' '} 
<Badge color="muted">Muted</Badge>{' '} 
<Badge color="success">Success</Badge>{' '} 
<Badge color="info">Info</Badge>{' '}
<Badge color="warning">Warning</Badge>{' '} 
<Badge color="danger">Danger</Badge>{' '}
  </p>
  <p className="typography-body-10 text-text-muted">
    <em>Soft</em>
  </p>
  <p className="my-2">
    <Badge color="primary" soft>
      Primary
    </Badge>{' '}
    <Badge color="hero" soft>
      Hero
    </Badge>{' '}
    <Badge color="faint" soft>
      Faint
    </Badge>{' '}
    <Badge color="muted" soft>
      Muted
    </Badge>{' '}
    <Badge color="success" soft>
      Success
    </Badge>{' '}
    <Badge color="info" soft>
      Info
    </Badge>{' '}
    <Badge color="warning" soft>
      Warning
    </Badge>{' '}
    <Badge color="danger" soft>
      Danger
    </Badge>
  </p>
</Fragment>
```

###### Badges - Pill

```tsx
<Fragment>
          <p className="mb-2 typography-body-10 text-text-muted">
            <em>Default</em>
          </p>
                <div className="flex gap-1">
    <Badge color="primary" type="pill">88</Badge>{" "}
    <Badge color="hero" type="pill">88</Badge>{" "}
    <Badge color="faint" type="pill">88</Badge>{" "}
    <Badge color="muted" type="pill">88</Badge>{" "}

    <Badge color="success" type="pill">88</Badge>{" "}
    <Badge color="info"  type="pill">88</Badge>{" "}
    <Badge color="warning"  type="pill">88</Badge>{" "}
    <Badge color="danger"  type="pill">88</Badge>
  </p>
          <p className="mb-2 mt-2 typography-body-10 text-text-muted">
            <em>Soft</em>
          </p>
                  <div className="flex gap-1">
    <Badge color="primary"  type="pill" soft>88</Badge>{" "}
    <Badge color="hero" type="pill" soft>88</Badge>{" "}
    <Badge color="faint" type="pill" soft>88</Badge>{" "}
    <Badge color="muted" type="pill" soft>88</Badge>{" "}
    <Badge color="success" type="pill" soft>88</Badge>{" "}
    <Badge color="info" type="pill" soft>88</Badge>{" "}
    <Badge color="warning" type="pill" soft>88</Badge>{" "}
    <Badge color="danger" type="pill" soft>88</Badge>
  </p>
</Fragment>
```

###### Usage examples

```tsx
() => {
  const COLORS = ['danger', 'faint', 'hero', 'info', 'primary', 'success', 'warning'] as const;
  const INVERTED_COLORS = [
    'danger-inverted',
    'faint-inverted',
    'hero-inverted',
    'info-inverted',
    'primary-inverted',
    'success-inverted',
    'warning-inverted',
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 typography-body-10 text-text-muted">
          <em>Examples showing pill style badge</em>
        </p>
        <div className="flex gap-2 items-center">
          <Button look="primary" soft>
            <div className="flex gap-1">
              <Badge color="hero" type="pill">
                6
              </Badge>
              <span>Label</span>
            </div>
          </Button>
          <Button look="primary">
            <div className="flex gap-1">
              <Badge color="faint" type="pill" soft>
                88
              </Badge>
              <span>Label</span>
            </div>
          </Button>
          <div>
            <Link type="inline" href="#">
              Messages
            </Link>
            <Badge color="info" type="pill" className="ml-1">
                12
            </Badge>
          </div>
        </div>
      </div>
      <div>
        <p className="mb-2 typography-body-10 text-text-muted">
          <em>Examples showing basic style badge</em>
        </p>

        <div className="flex gap-2 items-center">
          <Button look="primary" soft>
            <div className="flex gap-1 items-center">
              <span>Label</span>
              <Badge color="hero">New</Badge>
            </div>
          </Button>

          <Button look="primary">
            <div className="flex gap-1 items-center">
              <span>Label</span>
              <Badge color="faint" soft>
                New
              </Badge>
            </div>
          </Button>

          <div>
            <Link type="inline" href="#">
              Product feature
            </Link>
            <Badge color="info" className="ml-1">
                NEW
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
```

#### Dos And Donts

- Avoid using long text labels.
- Avoid using badges alone as buttons or links.

#### User Experience

**Default style** badges are designed to highlight a word. The commonly seen usage is when indicating a function or feature in an application that is new or when onboarding.

**Pill style** badges are designed to highlight a number. The most common usage is to indicate the number of unread emails or messages that need to be addressed.

Badges are most effective at drawing attention when they appear and disappear as needed, or when the number they are highlighting changes. For example, in the ‘Unread emails’ scenario, when all the emails have been read the badge should no longer be visible. Or when being used to indicate a new feature, the label should hide once the feature is no longer new. This behaviour helps make them more prominent to a user when they do appear.

Used incorrectly or too often runs the risk that future uses of badges will be ignored.

#### Visual Design

Badges inherit styles from the button and alert components which provides a wide range of colour options. They can be used alone, with text links or inside buttons. Unlike most components, badges are designed to be more prominent and attract attention.

### Accessibility

#### Accessibility Features

The Badge shape and text content is visible in Windows High Contrast Mode (WHCM). The ‘look’ styling (colour) is not visible in WHCM.

---


## Bottom sheet

**Description:** The responsive bottom sheet component is a modal-style element that slides up from the bottom of the screen in mobile views and appears as a modal in larger views.

### Design Guidelines

#### Bottom Sheet

View this component using the demo button to see how it responds across views.

```tsx
() => {
  const state = useOverlayTriggerState({});

  return (
    <>
      <Button onClick={state.open}> Open Bottom Sheet </Button>
      <BottomSheet zIndex={1200} isDismissable title="Heading" primaryLabel="Label" secondaryLabel="Label" state={state} primaryOnClick={state.close} secondaryOnClick={state.close}>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam ullam atque dignissimos ab quaerat nobis rem a
          ad blanditiis laborum labore repellendus, vero nihil ducimus, aliquam culpa explicabo doloremque corporis.
        </p>
      </BottomSheet>
    </>
  );
};
```

#### User Experience

This component was developed as a web version of a UI element typically associated with native experiences, such as iOS's 'ActionSheet' and Android's 'BottomSheet.' While these native components are designed for mobile experiences, our responsive Design System requires a web version that could adapt for larger devices, where the bottom sheet interaction is less effective.

The Bottom sheet component appears as an overlay and behaves in a similar way to a modal, it requires the user to interact with it or dismiss it. It blocks any interaction with the background content while it is visible.

Where it differs to a modal is when it is viewed on a touch device, it can be dismissed via a swipe.

#### Visual Design

The Bottom sheet is a generic component designed to work in as many scenarios as possible. It can be configured to accommodate most functional requirements.

### Accessibility

#### Accessibility Features

- Bottom sheet/Modal heading receives focus and is announced on open. The user is able to ‘arrow down’ to navigate the content if desired. This pattern differs from the [WAI-ARIA Authoring Practices Modal Dialog](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html) pattern, which announces all modal content on open and is often considered unnecessarily verbose for screen reader users.
- Close button appears below the heading in the source order; users can easily ‘arrow down’ and close if the heading content was of no interest
- When open, focus is constrained within the context of the Bottom sheet/Modal. Sequential keyboard navigation loops through focusable elements within the component; and not to any elements found outside.
- Close using Close button, Esc key or background click (if modal is dismissible)
- On touch devices the Bottom sheet can be closed via swipe.
- When the modal closes, focus returns to the button that originally toggled the Bottom sheet/Modal
- The Bottom sheet/Modal shape, text and icon content is visible in Windows High Contrast Mode (WHCM). Button ‘look’ styling (colour) is not visible in WHCM.

###### Accessibility in the HTML

- `<button aria-label="Close modal">`: Close button announced as “Close modal” in screen readers

###### Keyboard support

- ‘Tab’ moves focus to next focusable element inside the dialog. When focus is on the last focusable element in the dialog, moves focus to the first focusable element in the dialog.
- ‘Shift + Tab’ moves focus to previous focusable element inside the dialog
- When focus is on the first focusable element in the dialog, moves focus to the last focusable element in the dialog
- ‘Esc’ key closes the modal (if modal is dismissible)

---


## Breadcrumbs

**Description:** Breadcrumbs are styled navigational links used to indicate the user’s location within your site. They are a simple, effective and proven method to aid orientation.

### Design Guidelines

#### Breadcrumbs

Breadcrumbs come in one style for navigational consistency across all touch-points.

```tsx
// Using the Link component (as NextLink) from 'next/Link'
<div className="flex flex-col gap-4">
  <Breadcrumb aria-label="Page transitions and the such" className="px-3 py-1 mt-2">
    <NextLink href="#home" passHref legacyBehavior>
      <BreadcrumbItem isCurrent tag="a">Home</BreadcrumbItem>
    </NextLink>
  </Breadcrumb>
  <Breadcrumb aria-label="Page transitions and the such" className="px-3 py-1">
    <NextLink href="#home" passHref legacyBehavior>
      <BreadcrumbItem tag="a">Home</BreadcrumbItem>
    </NextLink>
    <NextLink href="#personal" passHref legacyBehavior>
      <BreadcrumbItem tag="a" isCurrent>Personal</BreadcrumbItem>
    </NextLink>
  </Breadcrumb>
  <Breadcrumb aria-label="Page transitions and the such" className="px-3 py-1 mb-2">
    <NextLink href="#home" passHref legacyBehavior>
      <BreadcrumbItem tag="a">Home</BreadcrumbItem>
    </NextLink>
    <NextLink href="#personal" passHref legacyBehavior>
      <BreadcrumbItem tag="a">Personal</BreadcrumbItem>
    </NextLink>
    <NextLink href="#credit-cards" passHref legacyBehavior>
      <BreadcrumbItem tag="a" isCurrent>Credit cards</BreadcrumbItem>
    </NextLink>
  </Breadcrumb>
</div>
```

#### User Experience

Breadcrumbs provide a hierarchical overview of where a user is in your site. This is particularly helpful when navigation is deep or complex, and is also helpful for giving context when a user arrives on the page from another source (deep linking) rather than drilling down hierarchically. They also provide another way to quickly navigate to previous levels.

Some things to keep in mind when using breadcrumbs:

- Breadcrumbs should display the location of the current page in the site’s hierarchy – not the path through the site that the user has travelled. The browser back button is already designated this task.
- Web convention dictates breadcrumbs usually sit toward the top of the page near the primary navigation.
- Breadcrumbs should start with a link to the home page (except when truncating, see below) and end with the current page as the last item, which should not be a link.
- You do not need to use breadcrumbs if your site has only one or two levels.
- If your breadcrumb trail is becoming too long for its dedicated space, you can consider truncating it by only showing the last few links – this is especially important for small screen sizes ie mobile.

#### Visual Design

Breadcrumbs have been designed with accessibility and functionality at the forefront. They’re intended to be as simple and understated as possible so as not to clutter the UI although (even with truncation) this can happen if page labels are too verbose or the information architecture is too deep.

### Accessibility

#### Accessibility Features

- The set of links is structured using an ordered list
- A `<nav>` element labeled “Breadcrumb” identifies the structure as a breadcrumb trail and makes it a navigation landmark so that it is easy to locate
- The links do not use ‘link’ colour or underline styling, however they are sufficiently identifiable as links by use of a link coloured (separator) icon, similar to [Link list](/components/list) bullets
- The visual separator icons are hidden to prevent announcement in screen readers. The separators are part of the visual presentation that signifies the breadcrumb trail, which is already semantically represented by the `<nav>` element with its label of “Breadcrumb”.
- The breadcrumb list is announced as expected in all screen readers including VoiceOver
- An indicator outline appears around the links when focused
- The breadcrumb trail and separator icons are visible in Windows High Contrast Mode

###### Accessibility in the HTML

- `<nav aria-label="Breadcrumb">` Provides a label that describes the type of navigation
- `<span aria-hidden="true">` Hides the visual separator icon SVGs from assistive technologies; they are visual embellishment
- The breadcrumb uses the useBreadcrumbs and useBreadcrumbItem hooks from React Aria to handle the accessibility code. Read the [full specifications](https://reactspectrum.blob.core.windows.net/reactspectrum/d77b35e970e5549f66b47a83f07423f5c93b7297/docs/react-aria/useBreadcrumbs.html) for more information.

###### Keyboard support

Keyboard users navigate the breadcrumb links as they would with a standard list of links.

#### Notes On Accessibility

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility) – Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Operable

Using breadcrumbs in your site or application aids navigation and orientation, and is an essential part of an accessible experience. As well as helping users determine where they are, they also provide another way to locate and navigate to pages. Using breadcrumbs will help you to comply with the core Success Criterion of the 'Navigable' guideline from WCAG 2.1.

---


## Buttons

**Description:** Buttons are elements capable of performing an action. They have a variety of uses and require careful consideration for consistency, hierarchy, brand, and accessibility.

### Design Guidelines

#### Button Sizes

Buttons come in four different sizes, corresponding to the sizes of other form elements. By default, a button's width is determined by the width of its internal label. Alternatively, it can be configured to span the full width of its container, as demonstrated with block buttons below.

```tsx
<div className="flex gap-1 items-center">
  <Button look="primary" size="xlarge">
    Extra large: 48px
  </Button>

  <Button look="primary" size="large">
    Large: 42px
  </Button>

  <Button look="primary" size="medium">
    Medium: 36px
  </Button>

  <Button look="primary" size="small">
    Small: 30px
  </Button>
</div>
```

#### Button Styles

**Standard buttons:** There are three standard button styles you can use in your interface.

```tsx
<div className="flex gap-1">
  <Button look="primary">Primary standard</Button>
  <Button look="hero">Hero standard</Button>
  <Button look="faint">Faint standard</Button>
</div>
```

**Soft buttons:** The soft button option places less visual emphasis on the button. Soft buttons are useful when grouping buttons with differing importance.

```tsx
<div className="flex gap-1">
  <Button look="primary" soft>
    Primary soft
  </Button>
  <Button look="hero" soft>
    Hero soft
  </Button>
  <Button look="faint" soft>
    Faint soft
  </Button>
</div>
```

**Buttons with icons:** Using icons in buttons is especially useful for indicating a button's functionality. Icons are a universal language - the 'Search icon' will almost always mean search.

```tsx
<div className="flex flex-col gap-2">
  <div>
    <Button look="hero" soft iconAfter={NewWindowIcon}>
      New window
    </Button>{' '}
    <Button look="primary" iconAfter={DropDownIcon}>
      Dropdown
    </Button>{' '}
    <Button look="hero" iconAfter={PrintIcon}>
      Print
    </Button>{' '}
    <Button look="primary" soft iconAfter={RefreshIcon}>
      Refresh
    </Button>{' '}
    <Button look="primary" iconAfter={SearchIcon}>
      Search
    </Button>
  </div>
  <div>
    <Button look="faint" iconBefore={SearchIcon} /> <Button look="faint" iconBefore={PlayIcon} />{' '}
    <Button look="faint" iconBefore={PauseIcon} /> <Button look="faint" iconBefore={CloseIcon} />{' '}
    <Button look="faint" iconBefore={AddCircleIcon} />
  </div>
  <div>
    <ComponentTitle>Icon positioning</ComponentTitle>
    <div className="flex items-end gap-1">
      <Button look="primary" iconAfter={InfoIcon}>
        Icon right
      </Button>
      <Button look="primary" iconBefore={InfoIcon}>
        Icon left
      </Button>
    </div>
  </div>
  <div>
    <ComponentTitle>Block-level buttons with icons</ComponentTitle>
    <Button look="primary" block justify iconAfter={ArrowRightIcon}>
      Next step
    </Button>
    <br />
    <Button look="primary" iconAfter={RefreshIcon} block>
      Refresh list
    </Button>
  </div>
</div>
```

#### Dos And Donts

- Do use multiple styles in the same interface if required.
- Don’t alter the button styles e.g. border radius, button height, font size, etc.
- Do make sure that the button height matches the form input height.
- Do keep text labels short.
- Avoid text labels that wrap onto 2 lines.
- Avoid disabled buttons where possible - users may not know why a function is disabled as there is no feedback offered.
- Avoid placing critical functions next to one another to avoid errors and loss of data or accidental processes.


```tsx
<p className="typography-body-10">
  <span className="text-text-success font-bold">Do</span> - Prevent errors by keeping buttons a safe distance apart.
</p>
```


```tsx
<p className="typography-body-10">
  <span className="text-text-danger font-bold">Avoid</span> - Placing buttons next to each other that perform an
  opposing function that a user cannot recover from.
</p>
```

#### Responsive Buttons

Responsive buttons can change appearance based on breakpoint. For example, the buttons can change size or become block or inline. This feature is often used at the XS breakpoint (generally for mobile devices). The example descriptions below assume the button is first viewed at XS, resize your browser to see them change.

```tsx
<Fragment>
  <ComponentTitle>Medium size button becomes Extra large from the MD breakpoint</ComponentTitle>
  <Button size={{ initial: 'medium', md: 'xlarge' }}>Medium → Extra large</Button>
  <hr className="border-t border-t-border-muted-soft my-4" />

  <ComponentTitle>Extra large size button becomes small from the SM breakpoint</ComponentTitle>
  <Button size={{ initial: 'xlarge', sm: 'small' }}>Extra large → Small</Button>
  <hr className="border-t border-t-border-muted-soft my-4" />

  <ComponentTitle>
    Small size button becomes medium at the SM breakpoint, large at the MD breakpoint and Extra large at the LG
    breakpoint
  </ComponentTitle>
  <Button size={{ initial: 'small', sm: 'medium', md: 'large', lg: 'xlarge' }}>
    Small → Medium → Large → Extra large
  </Button>
  <hr className="border-t border-t-border-muted-soft my-4" />

  <ComponentTitle>Block button becomes non-block from the SM breakpoint</ComponentTitle>
  <Button block={{ initial: true, sm: false }}>Block → Non-block</Button>
</Fragment>
```

#### User Experience

It’s important to consider the right button style, size, and configuration for the job or device at hand. Be careful not to overuse primary buttons on a single page or screen as this dilutes the impact of having a primary button in the first place. This becomes critical for e-commerce and form related experiences.

It is usually easy to define the primary action for a page, for this you would obviously use a standard primary button style. However, be sure to think about any secondary or tertiary actions you might want the user to perform, and choose appropriate styles from the other options available: Hero, Faint or one of the soft button styles.

Make sure buttons are an appropriate distance to the corresponding object or function, so they appear related. The Law of Proximity is the gestalt grouping law that states: elements that are close together tend to be perceived as a unified group.

#### Visual Design

The button system gives you the flexibility to choose from multiple styles, sizes and configurations depending on your needs. The system uses the brand colour palette to establish a consistent, logical hierarchy. This is particularly useful when the interface contains several actions which may vary in importance. From a visual design perspective buttons add clear delineation which aids legibility when the interface becomes complex or content heavy. Buttons also provide an opportunity to add some colour to the interface increasing brand recognition and freshening the overall look. Buttons are rectangular as opposed to lozenge in order to maximise the available width. This provides more flexibility with labels and button widths.

### Accessibility

#### Accessibility Features

- Button text complies with a minimum 4.5:1 colour contrast ratio against the adjacent colour (button background colour) – ref [1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum)
- Button boundary must comply with a minimum 3:1 colour contrast ratio against the adjacent colour (container/page background colour). Use the correct button depending on the container/page to ensure this requirement is met. – ref [1.4.11: Non-text Contrast](https://www.w3.org/WAI/WCAG21/quickref/#non-text-contrast)
- An indicator outline appears around the button when focused
- The mouse cursor uses a ‘pointer’ style when you mouse over (hover) to ensure consistent control affordance styling
- Disabled buttons have ‘pointer-events: none’ CSS applied, preventing hover and active states from triggering
- The button shape, text and icon content is visible in Windows High Contrast Mode (WHCM). The ‘look’ styling (colour) is not visible in WHCM.

###### Accessibility in the HTML

- `<button>` / `<a>`: Identifies the element as a button (or link) element. Accessible name for the button is defined by the element’s text content. [React component: refer to *tag* prop]
- `<a href="{URL}">`: Links styled to look like buttons must include an *href*. [React component: refer to *tag prop* and *href* attribute]
- `<button aria-label="{BUTTON_LABEL}">` Optionally use aria-label attribute to set a custom label (if different to the button text). The overall meaning of the aria-label must be consistent with the visual button text to ensure an optimal experience for speech recognition software users (i.e. Dragon NaturallySpeaking)
- `<svg aria-hidden="true">` Button icon elements have aria-hidden="true" to hide them from assistive technologies; they are visual embellishment. Generally the button text provides the button description, if this is not the case a custom label can be used which will be announced instead of the button text for screen reader users. [React component: refer to iconBefore and iconAfter props]

###### Keyboard support

Keyboard users navigate buttons as they would with a standard button or link.

#### Notes On Accessibility

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility) – Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Operable

Users with hand tremors or other motor skill challenges need large buttons. They also may make more mistakes than the average person and need help to ensure they reduce the amount of unintentional presses.

---


## Button groups

**Description:** Button groups are an elegant and easily tapable way to visualise a simple choice.

### Design Guidelines

#### Block

Using block-level button groups will allow the button group to stretch the full width of its container, which is useful for smaller viewports. Use the 'Demo' button to see this component working responsively.

```tsx
<div className="grid gap-3">
  <Field hintMessage="This is a responsive block button group" label="How would you like us to contact you?">
    <ButtonGroup look="hero" block size="large">
      <ButtonGroupButton id="Email">Email</ButtonGroupButton>
      <ButtonGroupButton id="Phone">Phone</ButtonGroupButton>
      <ButtonGroupButton id="SMS">SMS</ButtonGroupButton>
    </ButtonGroup>
  </Field>
</div>
```

#### Dos And Donts

- Only use up to 3 items in a group
- Do keep the labels short to aid scanability and avoid text wrapping
- If you have long labels, or more than 3 options, use [radio buttons](/components/radio-group).

#### Error State

```tsx
<Field label="Label" errorMessage="If there is an error it can go here" hintMessage="This is a small button group 30px">
  <ButtonGroup size="large">
    <ButtonGroupButton id="Left">Left</ButtonGroupButton>
    <ButtonGroupButton id="Right">Right</ButtonGroupButton>
  </ButtonGroup>
</Field>
```

#### Multiple Items

We recommend only using up to 3 items in a button group, any more can become too difficult to scan and can become problematic at smaller viewports. Is also best to keep the labels short.

```tsx
<div className="grid gap-6">
  <Field label="Would you like to receive eStatements">
    <ButtonGroup look="hero" size="large">
      <ButtonGroupButton id="Yes">Yes</ButtonGroupButton>
      <ButtonGroupButton id="No">No</ButtonGroupButton>
    </ButtonGroup>
  </Field>

  <Field label="How would you like us to contact you?">
    <ButtonGroup look="hero" size="large">
      <ButtonGroupButton id="Email">Email</ButtonGroupButton>
      <ButtonGroupButton id="Phone">Phone</ButtonGroupButton>
      <ButtonGroupButton id="SMS">SMS</ButtonGroupButton>
    </ButtonGroup>
  </Field>
</div>
```

#### Sizes

There are four button group sizes, make sure when laying out forms that your button group size and field sizes are aligned.

```tsx
<div className="grid gap-6">
  <div className="flex flex-col gap-1">
    <p className="typography-body-11 text-text-body">This is a small button group 30px</p>
    <ButtonGroup size="small">
      <ButtonGroupButton id="left">Left</ButtonGroupButton>
      <ButtonGroupButton id="right">Right</ButtonGroupButton>
    </ButtonGroup>
  </div>
  <div className="flex flex-col gap-1">
    <p className="typography-body-11 text-text-body">This is a medium button group 36px</p>
    <ButtonGroup size="medium">
      <ButtonGroupButton id="left">Left</ButtonGroupButton>
      <ButtonGroupButton id="right">Right</ButtonGroupButton>
    </ButtonGroup>
  </div>
  <div className="flex flex-col gap-1">
    <p className="typography-body-11 text-text-body">This is a large button group 42px</p>
    <ButtonGroup size="large">
      <ButtonGroupButton id="left">Left</ButtonGroupButton>
      <ButtonGroupButton id="right">Right</ButtonGroupButton>
    </ButtonGroup>
  </div>
  <div className="flex flex-col gap-1">
    <p className="typography-body-11 text-text-body">This is an xlarge button group 48px</p>
    <ButtonGroup size="xlarge">
      <ButtonGroupButton id="left">Left</ButtonGroupButton>
      <ButtonGroupButton id="right">Right</ButtonGroupButton>
    </ButtonGroup>
  </div>
</div>
```

#### User Experience

Button groups are a series of buttons grouped together on a single line to create a toggle. Behind the scenes in code, they work much the same way as radio buttons.

As button groups tend to break on small screen sizes especially when using more than two (see do's and don'ts) and when using long copy (the text wraps inside the button), it is recommended to use sparingly. If the label lengths are too long or there are too many choices, they become hard to scan, losing efficacy. Our eyes lose the shape of the words as they are housed in 'block containers', making it more difficult to distinguish each word/choice, slowing down the user and increasing their cognitive effort.

Consider the two-button button group when designing forms for questions with yes/no answers.

It's important to note that button groups differ from [switches](/components/switch).

#### Visual Design

Button groups inherit styling from buttons, see [Buttons](/components/button) for more information.

### Accessibility

#### Accessibility Features

- Option buttons behave as radio inputs for assistive technology users. Leveraging standard HTML form inputs to maintain state and store data provides optimal support in assistive technologies.
- An indicator outline appears around the button option when focused
- The button shape, text and icon content is visible in Windows High Contrast Mode (WHCM). The ‘look’ styling (colour) is not visible in WHCM. The current option button has thicker top and bottom borders to indicate the selected state in WHCM.

###### Accessibility in the HTML

- The button group uses the useRadioGroup and useRadio hooks from React Aria to handle the accessibility code. Read the [full specifications](https://reactspectrum.blob.core.windows.net/reactspectrum/d77b35e970e5549f66b47a83f07423f5c93b7297/docs/react-aria/useRadioGroup.html) for more information.

###### Keyboard support

- Navigation pattern is consistent with radio inputs; arrow keys change the selection

---


## Checkboxes

**Description:** Checkboxes are a proven and effective way to elicit a multiple choice from a user. They also require careful consideration to produce the best results.

### Design Guidelines

#### Dos And Donts

- Avoid placing more than two radios or checkboxes horizontally, side-by-side.
- Don't mix checkboxes and radios
- Avoid changing the colour of the checkbox symbol.
- Avoid changing the text styling of the checkbox label (size, colour etc).
- Do make sure the taxonomy of the options you are offering makes sense as any ambiguity will only slow down or confuse the user.


```tsx
<p className="typography-body-10"><span className="text-text-success font-bold">Do</span> - Remain consistent with the control type used</p>
```


```tsx
<p className="typography-body-10"><span className="text-text-danger font-bold">Avoid</span> - Mixing checkboxes and radios</p>
```


```tsx
<p className="typography-body-10"><span className="text-text-success font-bold">Do</span> - Keep labels short, makes scanning easier.</p>
```


```tsx
<p className="typography-body-10"><span className="text-text-danger font-bold">Avoid</span> - Having long descriptive labels, if you need more content you can try using the 'Hint' option.</p>
```

#### Error State

All form elements have associated error states, see [Error messages](/design-system/wbc/content/guidelines/error-message) in our content guidelines for more.

```tsx
  <CheckboxGroup 
errorMessage="If there is an error it can go here"    
hintMessage="These are large sized checkboxes"
    label="Select an option"
  validationState="invalid"
      className="col-span-1" 
      size="large"
      checkboxes={[
        { value: "Option 1", label: "Option 1" },
        { value: "Option 2", label: "Option 2" },
        { value: "Option 3", label: "Option 3" },
      ]}
    />
```

#### Hint Text

This variation allows supporting text to be displayed below the selectable item. For use in scenarios where the options are complex and require further information for clarity, using the hint text prevents the labels becoming too long which can effect scanability. Hint text can be used with both Medium and Large sized checkboxes.

```tsx

  <CheckboxGroup 
  hintMessage="These are large sized checkboxes with hint text"
  label="Select an option"
    className="col-span-1" 
    size="large"
    checkboxes={[
      { value: "Option 1", label: "Option 1", hint: "This is hint text" },
      { value: "Option 2", label: "Option 2", hint: "This is hint text" },
      { value: "Option 3", label: "Option 3", hint: "This is hint text" },
    ]}
  />
```

#### Horizontal Layout

Use this option when you require an inline layout, it's only recommended in very specific circumstances and we suggest never having more than two checkboxes side-by-side.

```tsx
<CheckboxGroup 
  hintMessage="These are medium sized checkboxes in a horizontal layout"
  label="Select an option"
  orientation="horizontal"
size="medium"
  checkboxes={[
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
  ]}
/>
```

#### Reveal

When requirements dictate long lists of choices, and particularly as mobile screens can only show a limited amount of information at a time, it's possible to surface the most common choices, and hide the rest under a "reveal" interaction. Once the user selects the toggle, the remaining items reveal and the toggle disappears.

- Avoid hiding one or two options under the toggle as this forces the user to interact with the interface for very little value.
- Use data to inform your decisions on which options are surfaced at the screen level.
- Surface the most popular and hide the rest behind the interaction.
- Always express how many items are behind the reveal.
- Reveal can be used with both Medium and Large sized checkboxes.

```tsx
  <CheckboxGroup 
    hintMessage="These are large sized checkboxes with more to reveal"
    label="Select an option"
      className="col-span-1" 
      size="large"
      showAmount={2}
      checkboxes={[
        { value: "Option 1", label: "Option 1" },
        { value: "Option 2", label: "Option 2" },
        { value: "Option 3", label: "Option 3" },
        { value: "Option 4", label: "Option 4" },
        { value: "Option 5", label: "Option 5" },
        { value: "Option 6", label: "Option 6" },
      ]}
    />
```

#### Sizes

There are two checkbox sizes, make sure when laying out forms that your checkbox size and field sizes are aligned.

```tsx
<div className="grid grid-cols-2">
<div><h4 className="typography-body-10 text-text-muted italic mb-3">Medium</h4>
  <CheckboxGroup 
  hintMessage="These are medium sized checkboxes"
  label="Select an option"
    className="col-span-1" 
    size="medium"
    checkboxes={[
      { value: "Option 1", label: "Option 1" },
      { value: "Option 2", label: "Option 2" },
      { value: "Option 3", label: "Option 3" },
    ]}
  /></div>
<div><h4 className="typography-body-10 text-text-muted italic mb-3">Large</h4>  
<CheckboxGroup 
  hintMessage="These are large sized checkboxes"
  label="Select an option"
    className="col-span-1" 
    size="large"
    checkboxes={[
      { value: "Option 1", label: "Option 1" },
      { value: "Option 2", label: "Option 2" },
      { value: "Option 3", label: "Option 3" },
    ]}
  />
</div></div>
```

#### User Experience

If you are asking your user to select one or more options from a list, then Checkboxes are the way to go. A single checkbox can also be used in isolation usually to acknowledge consent, understanding or agreement e.g Terms and conditions.

Keep elements close to each other for maximum performance as illustrated below:


The closer the label to the input, the better.

#### Unrelated

There is little association between the input (checkbox) and label 'Select'.

#### Forced

Using the Gestalt principle of continuity, by adding a line between the input and the label, we are guiding the eye along the line and connecting the two.

#### Related

When a label sits next to an input the association is strongest.

#### Visual Design

Most operating systems provide default styling for common UI elements such as checkbox groups. We've overridden this default styling for several reasons:

1. The default styling does not align with our brands look and feel.
1. The default styling often fails accessibility requirements such as colour contrast ratio and hit area.
1. The default styling is proportionately not aligned with the other UI elements.

These issues have been addressed with the styling of the checkbox groups while making them more accessible, more consistent, more tactile and more visually appealing. These overrides also ensure that the radio and checkbox components will adapt automatically when building multi-brand applications.

### Accessibility

#### Accessibility Features

- An indicator outline appears around the checkbox toggle when focused
- Focus moves to the first new checkbox option when further options are revealed
- The checkbox toggle and label text is visible in Windows High Contrast Mode (WHCM). The checkbox toggle tick is rendered using CSS borders to ensure visibility in WHCM.

###### Accessibility in the HTML

- `<button aria-expanded="true|false" >`: Checkbox with reveal toggle button uses aria-expanded attribute to indicate collapse state.
- The checkbox uses the useCheckboxGroup and useCheckboxGroupItem hooks from React Aria to handle the accessibility code. Read the [full specifications](https://reactspectrum.blob.core.windows.net/reactspectrum/d77b35e970e5549f66b47a83f07423f5c93b7297/docs/react-aria/useCheckboxGroup.html) for more information.

###### Keyboard support

Navigation pattern is consistent with standard checkbox inputs; *tab* key navigates the checkbox options, *space* key toggles the selection.

#### Notes On Accessibility

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility) – Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Operable

The Design System checkboxes have a large hit area to aid those with low vision and those challenged with motor skills.

###### Understandable

*Checkbox with reveal:* With regards to the reveal, due to accessibility challenges around focus, announcing with context, and navigation, the toggle should disappear on click.

To soften the impact of showing a long list, users are “forewarned” how many items are about to be revealed within the toggle, eg Show 12 more items. This is an important accessibility consideration that needs to be considered during design and implementation.

---


## Collapsible

**Description:** A Collapsible is a component used for containing information that you may not want to surface at the page or screen level, but needs to be findable.

### Design Guidelines

#### Examples

###### Basic

Similar to [accordions](/components/accordion) or [tabs](/components/tabs), a Collapsible toggles to open and reveal more content below. They come in four sizes, the different sizes are reflected in the font size of the link, these sizes correspond to the sizes of the other form elements.

```tsx
<Collapsible text="Show me more" size="medium">
  <p>
    It was all very well to say ‘Drink me,’ but the wise little Alice was not going to do that in a hurry. ‘No, I’ll
    look first,’ she said, ‘and see whether it’s marked “poison” or not’; for she had read several nice little histories
    about children who had got burnt, and eaten up by wild beasts and other unpleasant things, all because they would
    not remember the simple rules their friends had taught them: such as, that a red-hot poker will burn you if you hold
    it too long; and that if you cut your finger very deeply with a knife, it usually bleeds; and she had never
    forgotten that, if you drink much from a bottle marked ‘poison,’ it is almost certain to disagree with you, sooner
    or later.
  </p>
</Collapsible>
```

###### Sizes

```tsx
<div>
  <div className="mb-4">
    <Collapsible text="Show me more - Small" size="small">
      <p>
        It was all very well to say ‘Drink me,’ but the wise little Alice was not going to do that in a hurry. ‘No, I’ll
        look first,’ she said, ‘and see whether it’s marked “poison” or not’; for she had read several nice little
        histories about children who had got burnt, and eaten up by wild beasts and other unpleasant things, all because
        they would not remember the simple rules their friends had taught them: such as, that a red-hot poker will burn
        you if you hold it too long; and that if you cut your finger very deeply with a knife, it usually bleeds; and
        she had never forgotten that, if you drink much from a bottle marked ‘poison,’ it is almost certain to disagree
        with you, sooner or later.
      </p>
    </Collapsible>
  </div>

  <div className="mb-4">
    <Collapsible text="Show me more - Medium" size="medium">
      <p>
        It was all very well to say ‘Drink me,’ but the wise little Alice was not going to do that in a hurry. ‘No, I’ll
        look first,’ she said, ‘and see whether it’s marked “poison” or not’; for she had read several nice little
        histories about children who had got burnt, and eaten up by wild beasts and other unpleasant things, all because
        they would not remember the simple rules their friends had taught them: such as, that a red-hot poker will burn
        you if you hold it too long; and that if you cut your finger very deeply with a knife, it usually bleeds; and
        she had never forgotten that, if you drink much from a bottle marked ‘poison,’ it is almost certain to disagree
        with you, sooner or later.
      </p>
    </Collapsible>
  </div>

  <div className="mb-4">
    <Collapsible text="Show me more - Large" size="large">
      <p>
        It was all very well to say ‘Drink me,’ but the wise little Alice was not going to do that in a hurry. ‘No, I’ll
        look first,’ she said, ‘and see whether it’s marked “poison” or not’; for she had read several nice little
        histories about children who had got burnt, and eaten up by wild beasts and other unpleasant things, all because
        they would not remember the simple rules their friends had taught them: such as, that a red-hot poker will burn
        you if you hold it too long; and that if you cut your finger very deeply with a knife, it usually bleeds; and
        she had never forgotten that, if you drink much from a bottle marked ‘poison,’ it is almost certain to disagree
        with you, sooner or later.
      </p>
    </Collapsible>
  </div>

  <div className="mb-4">
    <Collapsible text="Show me more - XLarge" size="xlarge">
      <p>
        It was all very well to say ‘Drink me,’ but the wise little Alice was not going to do that in a hurry. ‘No, I’ll
        look first,’ she said, ‘and see whether it’s marked “poison” or not’; for she had read several nice little
        histories about children who had got burnt, and eaten up by wild beasts and other unpleasant things, all because
        they would not remember the simple rules their friends had taught them: such as, that a red-hot poker will burn
        you if you hold it too long; and that if you cut your finger very deeply with a knife, it usually bleeds; and
        she had never forgotten that, if you drink much from a bottle marked ‘poison,’ it is almost certain to disagree
        with you, sooner or later.
      </p>
    </Collapsible>
  </div>
</div>
```

#### User Experience

Be careful not to hide important information inside a Collapsible. There is a temptation to use it as a “dirty closet” to keep your page free of clutter or “minimalist”, however this approach ignores the task based scenarios of users who are attempting to accomplish something and could reduce the efficacy of your design.

Pay particular attention to content which may be important product information or deemed legal compliance, and always check with Risk and Compliance.

#### Visual Design

The Collapsible is based on a button link and leverages the same styling with the addition of a Primary coloured chevron. The chevron is an important aspect of making the Collapsible meet WCAG accessibility standards.

### Accessibility

#### Accessibility Features

- The user interacts with the button to toggle the collapsible content area – consistently whether using mouse, touch or keyboard. To hide the panel the user may toggle the button again.
- As with similar components that hide/show content, this component follows a ‘user is in control’ approach. Rather than programmatically moving focus to the collapsible content when shown, the toggle button has an *aria-expanded* attribute; the assistive technology user can choose to ‘arrow down’ to announce the collapsible content if they wish.
- An indicator outline appears around the button toggle when focused
- The toggle button shape, text, icon and collapsible content is visible in Windows High Contrast Mode

###### Accessibility in the HTML

- `<button aria-expanded="false|true" aria-controls="{ID}">`: Identifies a button element that toggles a content collapse and indicates the state of a collapsible element below. The *aria-controls* attribute creates an association between toggle button and collapsible element.
- `<div id="{ID}" aria-hidden="true|false">`: The collapsible element must have a unique *id* value. The toggle button *aria-controls* and collapsible element *id* attribute values must match. The collapsible element uses the *aria-hidden* attribute to hide from assistive technologies when no longer available.

###### Keyboard support

Keyboard users navigate the toggle button as they would with a standard button.

---


## Compacta

**Description:** The Compacta is a form input for capturing multiple instances of multiple fields, saving valuable screen space.

### Design Guidelines

#### Default

Below is an example of how a Compacta may be used with fields and inputs. Any form related elements can exist inside a Compacta.

```tsx
() => {
  const { register, watch, setValue } = useForm<Inputs>({
    defaultValues: { items: [{ primary: '', secondary: '', tertiary: '' }] },
  });
  const items = watch('items');

  const handleAdd = useCallback(() => {
    setValue('items', [...items, { primary: '', secondary: '', tertiary: '' }]);
  }, [items, setValue]);

  return (
    <form>
      <Compacta onAdd={handleAdd}>
        {items.map((item, index) => (
          <CompactaItem
            key={index}
            title={{ primary: item.primary, secondary: item.secondary, tertiary: item.tertiary }}
            onRemove={() => {
              setValue('items', [...items.slice(0, index), ...items.slice(index + 1)]);
            }}
          >
            <div className="flex flex-col gap-4">
              <Field label="Primary" hintMessage="Primary title text">
                <Input {...register(`items.${index}.primary`)} />
              </Field>
              <Field label="Secondary" hintMessage="Secondary title text">
                <Input {...register(`items.${index}.secondary`)} />
              </Field>
              <Field label="Tertiary" hintMessage="Tertiary title text">
                <Input {...register(`items.${index}.tertiary`)} />
              </Field>
            </div>
          </CompactaItem>
        ))}
      </Compacta>
    </form>
  );
};
```

#### Dos And Donts

- Don’t nest Compactas within Compactas
- It should never be used to simply “tidy up the screen”

#### Error States

When a user attempts to progress through the form, errors are captured at this point. Any Compacta that has an error will automatically open and highlight the error inline.

```tsx
() => {
  const { register, watch, setValue } = useForm<Inputs>({
    defaultValues: { items: [{ primary: '', accountNumber: '', amount: 0 }] },
  });
  const items = watch('items');

  const handleAdd = useCallback(() => {
    setValue('items', [...items, { primary: '', accountNumber: '', amount: 0 }]);
  }, [items, setValue]);

  return (
    <form>
      <Compacta onAdd={handleAdd}>
        {items.map((item, index) => (
          <CompactaItem
            key={index}
            title={{ primary: item.primary, secondary: item.accountNumber, tertiary: item.amount }}
            onRemove={() => {
              setValue('items', [...items.slice(0, index), ...items.slice(index + 1)]);
            }}
          >
            <div className="flex flex-col gap-4">
              <Field
                label="Primary"
                hintMessage="Select your card insitution"
                errorMessage="If there is an error it can go here"
              >
                <Select onChange={e => {}} width={30} invalid {...register(`items.${index}.primary`)}>
                  <option>Select</option>
                  <option>AMP Bank</option>
                  <option>ANZ - Australia and New Zealand Banking Group</option>
                  <option>Bank of Queensland</option>
                  <option>Bendigo Bank</option>
                  <option>CBA - Commonwealth Bank</option>
                  <option>Macquarie Bank</option>
                  <option>NAB - National Australian Bank</option>
                  <option>Westpac Bank</option>
                </Select>
              </Field>

              <Field
                label="Account number"
                hintMessage="Refer to a statement from the card’s financial institution"
                errorMessage="If there is an error it can go here"
              >
                <Input onChange={e => {}} width={30} invalid {...register(`items.${index}.accountNumber`)} />
              </Field>

              <InputGroup
                onChange={e => {}}
                width={20}
                invalid
                errorMessage="If there is an error it can go here"
                before="$"
                label="Amount to transfer"
              >
                <Input {...register(`items.${index}.amount`, { valueAsNumber: true })} invalid />
              </InputGroup>
            </div>
          </CompactaItem>
        ))}
      </Compacta>
    </form>
  );
};
```

#### User Experience

The Compacta was designed to meet the need of capturing multiple instances of detailed information without overwhelming users, particularly on mobile devices. An example use case may be multiple questions about a customers’ assets.

The drawer has an easy and familiar show/hide interaction. The 'Add another' and 'Remove' buttons are left-aligned and positioned at the bottom of an open Compacta. This placement, along with the numbering of each Compacta are both accessibility considerations for users who rely on zoom functionality, ensuring they can easily locate these controls without needing to search across the screen.

###### States and behaviours

The Compacta has 2 states: open and closed.

**Default state:** the first Compacta is open.

**Adding another:** the previous Compacta automatically closes a new Compacta appears in an open state.

Opening, editing, and closing: the user is free to open, edit, and close any Compacta at any time.

###### Assigned fields

It is possible to surface content on a Compacta when it’s in its closed state and an important part of making the component work. This enables users to scan important information without opening, making the review process faster and less overwhelming. There are up to three fields with which a designer and developer can assign to surface in the Compacta closed state. Generally speaking there should be a minimum of 2 and a maximum of 3 fields to give enough context and meaning.

An example may be:

**1 NAME:** to differentiate on multi-applicant forms

**2 TITLE:** of product or ‘thing’

**3 AMOUNT:** or numerical detail

###### Pre-populated content

Pre-populating fields with content brings complexity for data management, technology, data quality, risk and compliance, and users’ cognitive load. However, if done well with good quality data it can expedite form progress.

### Accessibility

#### Accessibility Notes

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility) – Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Operable

In order to assist screen reader users in determine which ‘compacta’ they are viewing an associated number is required. This is kept at the UI level for those who may use a combination of magnifier and screen reader.

Compactas are accessible components and must have numerical signifiers to aid screen reader users navigate and contextualise as well as those who use zoom tools or a combination of both.

The left-aligned placement of the 'Add another' and 'Remove' buttons is also an accessibility consideration for users who rely on zoom functionality, ensuring they can easily locate these controls without needing to search across the screen.

---


## Date picker

**Description:** Date pickers assist when dates are not known, set in the future, to schedule something, or assist in providing “day of the week” context.

### Design Guidelines

#### Date Range

In order to create a date range, two date pickers need to be used with appropriate input labels above to give context.

Established convention of layout places two date pickers side by side, with stacked date pickers also an option particularly when horizontal space is at a premium or in a responsive context.

```tsx
<Fragment>
  <ComponentTitle>Selecting a date range</ComponentTitle>
  <div className="flex gap-3">
    <div className="pb-2">
      <Field label="Select from">
        <DatePicker />
      </Field>
    </div>
    <div className="pb-2">
      <Field label="Select to">
        <DatePicker />
      </Field>
    </div>
  </div>
</Fragment>
```

#### Dos And Donts

Never use a date picker for a memorable date, ie [Date of birth](/patterns/dates/date-of-birth)

#### Error State

```tsx
<Fragment>
  <ComponentTitle>Selecting a date range</ComponentTitle>
  <Field label="Select a date range" errorMessage={['Select from date must be valid', 'Select to date must be valid']}>
    <div className="flex gap-3">
      <div className="pb-2">
        <Field label="Select from" labelSize="small">
          <DatePicker isInvalid />
        </Field>
      </div>
      <div className="pb-2">
        <Field label="Select to" labelSize="small">
          <DatePicker isInvalid />
        </Field>
      </div>
    </div>
  </Field>
</Fragment>
```

#### Sizes

The date picker can be used in various sizes to match the UI direction.

```tsx
() => {
  const sizes = [
    { label: 'Small', size: 'small' },
    { label: 'Medium (default)', size: 'medium' },
    { label: 'Large', size: 'large' },
    { label: 'XLarge', size: 'xlarge' },
  ];
  return sizes.map(({ label, size }) => (
    <div className="py-4 border-t border-t-border-muted-soft first:border-t-0" key={size}>
      <ComponentTitle>{label}</ComponentTitle>
      <DatePicker size={size} />
    </div>
  ));
};
```

#### Unavailable Dates

When dates are unavailable for whatever reason, the strikethrough styling is applied. This can be for the following scenarios:

- Any one date
- Any consecutive dates
- Any multiple dates (consecutive or otherwise)
- Specific days of the week (eg Wednesdays) and/or weekends.

```tsx
<Fragment>
  <ComponentTitle>Blocked out dates</ComponentTitle>
  <Field label="Select date">
    <DatePicker disableWeekends />
  </Field>
</Fragment>
```

#### User Experience

Ensure a label is applied to every date picker in order to provide context for users and for accessibility.

#### Visual Design

The visual design of the calendar and the date indicators have been very carefully designed to ensure accessibility and brand alignment.

### Accessibility

#### Accessibility Features

- **Powered by React Aria** — built on top of [React Aria](https://react-spectrum.adobe.com/react-aria/index.html), providing robust, WAI-ARIA-compliant date picker components with accessible interaction patterns by default.
- **Built-in Accessibility Compliance** — leverages React Aria’s first-class support for screen readers, keyboard navigation, and focus management without relying on custom CSS overrides for accessibility.
- **Clear State Indications** — calendar dates are visually styled to clearly reflect their states (selected, focused, disabled, or active), including focus outlines and proper contrast ratios.
- **Consistent Interactions** — users can toggle the calendar popup consistently using mouse, keyboard, or touch. The popup can be dismissed by selecting a date, toggling the button, or pressing the `Escape` key.
- **Focus Management** — when the calendar popup opens, focus automatically moves to the calendar panel. On closing, focus returns to the toggle button.
- **Keyboard Navigation** — full keyboard support including:
  - Arrow keys to navigate dates within the calendar grid.
  - `Enter` or `Space` to select a date.
  - `Escape` to close the popup.
- **High Contrast Mode Support** — all interactive elements (input field, calendar button, popup panel, and date buttons) remain visible and usable in **Windows High Contrast Mode (WHCM)**, with proper focus outlines and state indications.

##### Accessibility in HTML

- **ARIA Attributes** — all relevant ARIA roles and properties (e.g., `role="dialog"`, `aria-label`, `aria-selected`) are handled automatically by React Aria to ensure compliance with WCAG and assistive technologies.
- **Keyboard Support Reference** — for a detailed explanation of supported keyboard interactions, refer to the [React Aria Date Picker documentation](https://react-spectrum.adobe.com/react-aria/useDatePicker.html).

---


## Dropdowns

**Description:** Use a dropdown to display a styled list of actions.

### Design Guidelines

#### Dropdown Menu Sizes

###### Menu sizes

The dropdown menus come in three sizes or widths. They are triggered by the dropdown button which comes in all the same styles and sizes as the [Button](/design-system/components/button) component.

```tsx
<div className="flex gap-1">
  <Dropdown text="Small" dropdownSize="small" look="hero">
    <DropdownHeading>Small menu</DropdownHeading>
    <List type="link" spacing="large">
      <ListItem href="#">List item</ListItem>
      <ListItem href="#">List item</ListItem>
    </List>
    <DropdownHeading>Sub heading</DropdownHeading>
    <List type="link" spacing="large">
      <ListItem href="#">List item</ListItem>
      <ListItem href="#">List item</ListItem>
    </List>
  </Dropdown>

  <Dropdown text="Medium " dropdownSize="medium" look="hero">
    <DropdownHeading>Medium menu</DropdownHeading>
    <List type="link" spacing="large">
      <ListItem href="#">List item</ListItem>
      <ListItem href="#">List item</ListItem>
    </List>
    <DropdownHeading>Sub heading</DropdownHeading>
    <List type="link" spacing="large">
      <ListItem href="#">List item</ListItem>
      <ListItem href="#">List item</ListItem>
    </List>
  </Dropdown>

  <Dropdown text="Large dropdown" dropdownSize="large" look="hero">
    <DropdownHeading>Large menu</DropdownHeading>
    <List type="link" spacing="large">
      <ListItem href="#">List item</ListItem>
      <ListItem href="#">List item</ListItem>
    </List>
    <DropdownHeading>With headings</DropdownHeading>
    <List type="link" spacing="large">
      <ListItem href="#">List item</ListItem>
      <ListItem href="#">List item</ListItem>
    </List>
  </Dropdown>
</div>
```

###### Usage examples

```tsx
<div className="flex gap-1">
  <Dropdown text="Checkboxes" look="primary">
    <DropdownHeading>Checkboxes</DropdownHeading>
    <CheckboxGroup 
      defaultValue={['Option 1']}
      checkboxes={[
        { value: "Option 1", label: "Option 1" },
        { value: "Option 2", label: "Option 2" },
        { value: "Option 3", label: "Option 3" },
      ]}
    />
    <DropdownHeading>Options</DropdownHeading>
    <CheckboxGroup 
      defaultValue={['Option 1']}
      checkboxes={[
        { value: "Option 1", label: "Option 1" },
        { value: "Option 2", label: "Option 2" },
        { value: "Option 3", label: "Option 3" },
      ]}
    />
  </Dropdown>

  <Dropdown text="Switches" look="primary">
    <div>
      <Switch block label="Option 1" size="small" />
    </div>
    <div>
      <Switch block label="Option 2" size="small" />
    </div>
    <div>
      <Switch block label="Option 3" size="small" />
    </div>
  </Dropdown>

  <Dropdown text="Links" dropdownSize="large" look="primary">
    <DropdownHeading>Links</DropdownHeading>
    <List type="link" spacing="large">
      <ListItem href="#">List item</ListItem>
      <ListItem href="#">List item</ListItem>
    </List>
  </Dropdown>
</div>
```

#### User Experience

The Dropdown is a highly configurable component and is useful if space is at a premium. Triggered on click/tap it can hold links, switches, checkboxes etc. Sub headings can also be used to separate content in the dropdown.

Use a button dropdown as a way for your user to choose from a list of actions.

Although a button dropdown saves on screen space it does mean the action you want the user to perform is hidden behind an interaction ie a dropdown. Where possible, surface actions and choices at the page or screen level for discoverability and faster completion of tasks.

#### Visual Design

The button used to trigger the dropdown menu can use any of the styles or sizes available within the [Button](/design-system/components/button) component.

### Accessibility

#### Accessibility Features

- The user interacts with the button to toggle the panel – consistently whether using mouse, touch or keyboard. To hide the panel the user may toggle the button again, perform a ‘blur’ event (focusing elsewhere via click or keyboard) or press the ‘Esc’ key.
- As with similar components that hide/show content, this component follows a ‘user is in control’ approach. Rather than programmatically moving focus to the panel when shown, the toggle button has an *aria-expanded* attribute; the assistive technology user can choose to ‘arrow down’ to announce the panel content if they wish.
- When the panel closes, focus returns to the button that originally toggled the panel
- An indicator outline appears around the button toggle when focused
- The button shape, text, icon content and panel is visible in Windows High Contrast Mode (WHCM). The button ‘look’ styling (colour) is not visible in WHCM.

###### Accessibility in the HTML

- `<button aria-expanded="false|true" aria-controls="{PANEL_ID}">`: Identifies a button element that toggles a content collapse and indicates the state of a collapsible element below. The *aria-controls* attribute creates an association between toggle button and collapsible element (panel)
- `<div id="{PANEL_ID}">`: The panel must have a unique *id* value. The toggle button *aria-controls* and panel *id* attribute values must match.
- `<span aria-hidden="true">`: The toggle button’s dropdown icon element has *aria-hidden* to hide it from assistive technologies as it is decorative. The icon is a design convention to indicate a dropdown interface. Assistive technologies utilise the features listed above to provide users with an indication of this dropdown interface.

###### Keyboard support

- Keyboard users navigate toggle buttons as they would with a standard button
- ‘Esc’ key closes the currently active panel

---


## Flexi Cell

**Description:** Use Flexi-cells to help organise content into consistent, manageable, visually distinct blocks, making it easier for users to scan and interact with. Ensure your content aligns with the brand guidelines.

### Design Guidelines

#### Image Bleed

This version of the Flexi-cell has a responsive content layout, use the demo button to preview this responsive behaviour.

###### Horizontal

- **Xs - Sm:** Tile padding 12px
- **Md +:** Tile padding 18px

```tsx
() => {
  return (
    <>
      {new Array(3).fill(null).map((_, index) => (
        <FlexiCell
          body={false}
          key={index}
          tag="a"
          href="#"
          withBorder
          size={{
            initial: 'default',
            md: 'large',
          }}
          className="overflow-hidden"
        >
          <div className="flex gap-2">
            <img
              src="https://www.westpac.com.au/content/dam/public/gel/images/house-demo-image.png"
              alt="background"
              className="-my-2 -ml-2 block w-[10rem] object-cover md:-my-3 md:-ml-3"
            />
            <FlexiCellBody>
              <FlexiCellLabel tag="h3">Title</FlexiCellLabel>
              <FlexiCellHint>Descriptive information</FlexiCellHint>
              <div className="mt-3 flex gap-1">
                <Badge color="hero">Label</Badge>
                <Badge color="faint" soft>
                  Label
                </Badge>
              </div>
            </FlexiCellBody>
          </div>
        </FlexiCell>
      ))}
    </>
  );
};
```

###### Vertical

- **Xs - Sm:** Tile padding 12px
- **Md +:** Tile padding 18px

```tsx
<Grid>
  {new Array(3).fill(null).map((_, index) => (
    <GridItem key={index} span={4}>
      <FlexiCell
        className="overflow-hidden"
        body={false}
        key={index}
        tag="a"
        href="#"
        withBorder
        size={{
          initial: 'default',
          md: 'large',
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="-mx-2 -mt-2 md:-mx-3 md:-mt-3">
            <img
              src="https://www.westpac.com.au/content/dam/public/gel/images/house-demo-image.png"
              alt="background"
              className="block h-[8.75rem] w-full object-cover"
            />
          </div>
          <FlexiCellBody>
            <FlexiCellLabel tag="h3">Title</FlexiCellLabel>
            <FlexiCellHint>Description</FlexiCellHint>
            <div className="mt-3 flex gap-1">
              <Badge color="hero">Label</Badge>
              <Badge color="faint" soft>
                Label
              </Badge>
            </div>
          </FlexiCellBody>
        </div>
      </FlexiCell>
    </GridItem>
  ))}
</Grid>
```

#### Symbol

This version of the Flexi-cell has a responsive content layout, use the demo button to preview this responsive behaviour.

###### Horizontal

- **Xs - Sm:** Symbol is stacked above labels, tile padding 12px
- **Md +:** Symbol is inline to the left of the labels tile padding 18px

```
() => {
  return <>
<FlexiCell tag="a" href="#" withBorder withArrow size={{
      initial: 'default',
      md: 'large'
    }}>
          <div className="flex flex-col gap-2 md:flex-row">
            <AccountIcon look="outlined" color="hero" />
            <div className="flex flex-col gap-1">
              <FlexiCellLabel tag="h3">Title</FlexiCellLabel>
              <FlexiCellHint>Descriptive information</FlexiCellHint>
            </div>
          </div>
        </FlexiCell>
        <FlexiCell tag="a" href="#" withBorder withArrow size={{
      initial: 'default',
      md: 'large'
    }}>
          <div className="flex flex-col gap-2 md:flex-row">
            <IdCardIcon look="outlined" color="hero" />
            <div className="flex flex-col gap-1">
              <FlexiCellLabel tag="h3">Title</FlexiCellLabel>
              <FlexiCellHint>Descriptive information</FlexiCellHint>
            </div>
          </div>
        </FlexiCell>
                <FlexiCell tag="a" href="#" withBorder withArrow size={{
      initial: 'default',
      md: 'large'
    }}>
          <div className="flex flex-col gap-2 md:flex-row">
            <DollarIcon look="outlined" color="hero" />
            <div className="flex flex-col gap-1">
              <FlexiCellLabel tag="h3">Title</FlexiCellLabel>
              <FlexiCellHint>Descriptive information</FlexiCellHint>
            </div>
          </div>
        </FlexiCell>
    </>;
}
```

###### Vertical

- **Xs - Sm:** Tile padding 12px
- **Md +:** Tile padding 18px

```
    <Grid>
        <GridItem span={4}>
            <FlexiCell className="min-h-[17.5rem]" tag="a" href="#" withBorder size={{
          initial: 'default',
          md: 'large'
        }}>
              <div>
                <div className="flex justify-start mb-2 md:mb-3">
                  <AccountIcon look="outlined" color="hero" />
                </div>
                <div className="flex flex-col">
                  <FlexiCellLabel tag="h3" className="mb-1">
                    Flexi-cell title
                  </FlexiCellLabel>
                  <FlexiCellHint>Descriptive information - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tellus libero, faucibus eu leo non, aliquam ultrices odio. Proin mattis tellus neque, et molestie urna ullamcorper. </FlexiCellHint>
                </div>
              </div>
            </FlexiCell>
          </GridItem>
                  <GridItem span={4}>
            <FlexiCell className="min-h-[17.5rem]" tag="a" href="#" withBorder size={{
          initial: 'default',
          md: 'large'
        }}>
              <div>
                <div className="flex justify-start mb-2 md:mb-3">
                  <IdCardIcon look="outlined" color="hero" />
                </div>
                <div className="flex flex-col">
                  <FlexiCellLabel tag="h3" className="mb-1">
                    Flexi-cell title
                  </FlexiCellLabel>
                  <FlexiCellHint>Descriptive information - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tellus libero, faucibus eu leo non, aliquam ultrices odio. Proin mattis tellus neque, et molestie urna ullamcorper.</FlexiCellHint>
                </div>
              </div>
            </FlexiCell>
          </GridItem>
                  <GridItem span={4}>
            <FlexiCell className="min-h-[17.5rem]" tag="a" href="#" withBorder size={{
          initial: 'default',
          md: 'large'
        }}>
              <div>
                <div className="flex justify-start mb-2 md:mb-3">
                  <DollarIcon look="outlined" color="hero" />
                </div>
                <div className="flex flex-col">
                  <FlexiCellLabel tag="h3" className="mb-1">
                    Flexi-cell title
                  </FlexiCellLabel>
                  <FlexiCellHint>Descriptive information - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tellus libero, faucibus eu leo non, aliquam ultrices odio. Proin mattis tellus neque, et molestie urna ullamcorper.</FlexiCellHint>
                </div>
              </div>
            </FlexiCell>
          </GridItem>
      </Grid>
```

#### User Experience

Try to keep the amount of content displayed in each tile consistent, tiles that appear in a horizontal layout should all be the same height.

---


## Footer

**Description:** Having consistent and familiar footers throughout an experience is critical, it assists in providing our customers context and confidence in the experience they are in.

### Design Guidelines

#### Footer

This is the basic footer component, the content should be project specific.

```tsx
<>
  <Footer
    brand="wbc"
    hideLogo
  >
    <div className="relative">
      <div className="float-left flex-none">
        <SecurityIcon
          className="float-left shrink-0 mr-1 mt-0.5"
          color="muted"
          size="small"
        />
      </div>
      <div className="flex">
        <p className="text-text-muted relative flex-1">
          Footer content goes here.
        </p>
      </div>
    </div>
  </Footer>
</>
```

#### User Experience

Footers are like an anchor which signifies the end of a page or screen. They are also used as a secondary or tertiary navigation for many users. Often links to service, contact, or other overarching information is found in the footer.

In forms, the footer is simplified to show the secure environment in which the user is in, as well as any legal obligations. The security icon is a visual cue which signifies the secure environment and shouldn’t be removed.

###### Copy in footers

All footer copy should be considered at the design stage in consultation with legal teams.

#### Visual Design

The footer component is a basic, configurable component used to hold global elements such as Copyright information etc. As with all the GEL UI components they are intentionally designed to be subtle and understated so as not to detract from the content. We also use a “sticky” footer to ensure that that this component never moves above the base of the viewport.

The footer component is designed to be responsive and multi-brand. This ensures that all branding etc will automatically be the correct size and position when the brand is switched.

---


## Header

**Description:** Having consistent and familiar headers throughout an experience is critical, it assists in providing our customers context and confidence in the experience they are in.

### Design Guidelines

#### Header

```tsx
() => {
  const brand = useBrand();

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <ComponentTitle>Default</ComponentTitle>
          <>
            <Header brand={brand.key} />
          </>
        </div>

        <div>
          <ComponentTitle>With Sign Out </ComponentTitle>
          <>
            <Header brand={brand.key}>
              <Button
                look="faint"
                onClick={() => {}}
                size={{
                  initial: 'small',
                  sm: 'medium',
                }}
                soft
              >
                Sign Out
              </Button>
            </Header>
          </>
        </div>

        <div>
          <ComponentTitle>Logo in centre at small views (see demo)</ComponentTitle>
          <>
            <Header brand={brand.key} logoCenter />
          </>
        </div>
        <div>
          {' '}
          <ComponentTitle>With back arrow</ComponentTitle>
          <>
            <Header brand={brand.key} leftIcon="arrow" />
          </>
        </div>
        <div>
          <ComponentTitle>With hamburger at small views (see demo)</ComponentTitle>
          <>
            <Header brand={brand.key} leftIcon="hamburger" />
          </>
        </div>
      </div>
    </>
  );
};
```

#### User Experience

Headers provide a reliable place to house navigation and, when required, access to other key features, ie Sign in/out. The brand identity is not only used for recognition, but serves as a ‘home’ button when the user needs an ‘escape’ from whatever environment they are in. At the smaller breakpoints the header also houses access to the Menu.

#### Visual Design

The Header components is a basic, configurable component used to hold global elements such as logos and navigation. As with all the GEL UI components they are intentionally designed to be subtle and understated so as not to detract from the content. When the header is fixed a drop shadow is applied when content scrolls below the header.

The Header component is designed to be responsive and multi-brand. This ensures that all branding etc will automatically be the correct size and position when the brand is switched.

---


## Heading (Dev)

**Description:** This is a developer-only package containing styling for heading elements supporting visual and semantic heading levels, uppercase and both body font and brand font options.

---


## Inputs

**Description:** Inputs are used to capture words or numerical data. They are predominantly used in forms and search tools allowing users to submit information.

### Design Guidelines

#### Dos And Donts

- Do use any of the predefined input sizes but make sure to use the corresponding button size if required.
- Do keep labels in close proximity above the input field.


```tsx
<p className="typography-body-10">
  <span className="text-text-success font-bold">Do</span> - Place labels in close proximity above the input field - this
  helps promote scanning, readability and faster progress.
</p>
```


```tsx
<p className="typography-body-10">
  <span className="text-text-danger font-bold">Avoid</span> - Placing labels too far away from the input field, this can
  create confusion and lose any perceived connection between the items.
</p>
```

#### Error State

All form elements have associated error states, see [Error messages](/content/guidelines/error-message) in our content guidelines for more.

```tsx
  <InputGroup width={20} label="Label" hint="Hint text"  errorMessage="If there is an error it can go here">
          <Input invalid />
        </InputGroup>
```

#### Fixed Widths

Use fix width inputs to help indicate the length of the data required. For example, if you are asking for a Postcode use an input with a width of 4 (i.e. 4 characters), this type of affordance helps with scanning and supports quick and easy form completion. The input widths are calculated to fit the respective number capital W's - the widest character.

```tsx
<div className="flex flex-col gap-2">
   <Input  placeholder="1"  size="medium" width="1"/>
   <Input  placeholder="2"  size="medium" width="2"/>
   <Input  placeholder="3"  size="medium" width="3"/>
   <Input  placeholder="4"  size="medium" width="4"/>
   <Input  placeholder="5"  size="medium" width="5"/>
   <Input  placeholder="6"  size="medium" width="6"/>
   <Input  placeholder="7"  size="medium" width="7"/>
   <Input  placeholder="8"  size="medium" width="8"/>
   <Input  placeholder="9"  size="medium" width="9"/>
   <Input  placeholder="10"  size="medium" width="10"/>
   <Input  placeholder="20"  size="medium" width="20"/>
   <Input  placeholder="30"  size="medium" width="30"/>
   <Input  placeholder="Full-width"  size="medium" width="full"/>
</div>
```

#### Inputs With Labels

Use the [Input group](/components/input-group) component to accessibly define the labels used with Inputs, and [Text areas](/components/textareas). All inputs require labels for usability and accessibility.

```tsx
  <InputGroup width={20} label="Label" hint="Hint text" >
          <Input />
        </InputGroup>
```

#### Sizes

Text inputs come in four different sizes (heights) with the default being Medium 36px. Ensure when you are designing forms that you alway use the same size across element types.

```tsx
() => {
  const SIZES = ['small', 'medium', 'large', 'xlarge'] as const;
  return (
    <div className="flex flex-col gap-4">
      {SIZES.map(size => (
        <div key={size}>
          <ComponentTitle>{size}</ComponentTitle>
          <Input size={size} width="20" />
        </div>
      ))}
    </div>
  );
};
```

#### User Experience

In order to be most effective, form inputs must focus on usability and accessibility above all else. Like every component in this system, our design decisions are driven by what will provide the most robust solution across all scenarios.

###### Borders

We use a solid border as it is simple and universally understood. Using single lines as an input 'field' undermines the integrity of the affordance making it difficult to recognise. These fields can be easily confused with horizontal rules, that are often used in design to denote a break in content or a new section. Replacing the border also affects those with low vision (see the Text Inputs accessibility tab for more).

###### Placeholder text

We don't use placeholder text for a few reasons. Placeholder text needs to be visually very different from the text that gets entered into the field by the user, otherwise it appears as though the field has already been completed, causing the user to unintentionally skip it. Finding a colour that is different enough from ‘entered text’ colour, but still meets accessibility contrast requirements is incredibly difficult.

As placeholder text disappears once the field is in focus, it also places increased cognitive load on the user, requiring them to recall the instructions once they've gone.

###### Labels

We don't use floating labels. Floating labels often start off as placeholder text so inherit some of those issues described above. Additionally floating labels come with restrictions on label length (when a label is longer than the input field), hint text location challenges, and consistency with error validation.

###### Hint text and error messages

We do place hint text and errors messages directly under the input label for context. This approach also guarantees that on mobile devices, the hint text or error message remains visible and is not hidden by activated select boxes or keypads.

###### Layout

These components are designed to be stacked and do not work so well in column based executions as long wrapping labels, and hint text length can create misalignment when fields are horizontally laid out.

#### Visual Design

Most operating systems provide default styling for common UI elements such as input fields. We've overridden this default styling for several reasons:

1. The default styling does not align with our brands look and feel.
1. The default styling often fails accessibility requirements such as colour contrast ratio for borders and placeholder text.
1. The default styling is proportionately not aligned with the other UI elements.
1. The default styling often looks dated and poorly rendered.

We’ve addressed all these issues in the styling of our input fields making them simpler, more accessible, more consistent and more functional.

We’ve also provided several sizes (heights) to accommodate different layout scenarios and styled the tab focus state to better align with the brand.

These overrides ensure that all input field components will adapt automatically when building multi-brand applications.

### Accessibility

#### Accessibility Features

- An indicator outline appears around the input when focused via keyboard, mouse or touch
- The Text input, Select and Textarea shapes are visible in Windows High Contrast Mode (WHCM). The Select dropdown icon is not visible in WHCM, however the recommended default option text of ‘Select’ provides a sufficient affordance.

#### Notes On Accessibility

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility) – Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Perceivable

**Input fields** - These fields have been carefully designed and tested to achieve optimal contrast and border line weight. This is crucial for users to quickly identify the element as an input field, providing significant assistance to individuals with low vision and those less familiar with prevailing web design trends. The border colour was modified from the original "Border" colour to a darker version named "Border Dark," to ensure ongoing compliance with WCAG colour contrast guidelines.

**Input labels** *-* Input labels should be placed above the input field. This helps promote scanning, readability and faster progress.

**Hint text** *-* Hint text should be placed directly under the input label for context. This also ensures on mobile the hint text is visible ‘on canvas’ and is not obscured by any select boxes or keypads when activated.

###### Robust

A label and a form control should be associated with each other either implicitly or explicitly. Web browsers provide the label as a larger clickable area, for example, to select or activate the control. It also ensures that assistive technology can refer to the correct label when presenting a form control.

---


## Input groups

**Description:** The input group component comprises elements used with form inputs. These elements include labels, add-ons, icons and supporting text, all aimed at enhancing accessibility, usability and streamlining form completion.

### Design Guidelines

#### Add Ons

Add-on elements can be used either before or after an input, they can provide clear affordance that helps users understand the information they are required to enter.

###### Types & sizes

```tsx
() => {
  const [value, setValue] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <h4 className="typography-body-10 text-text-muted italic">Text add-ons</h4>
      <div className="flex flex-col gap-4">
        <InputGroup width={10} size="small" name="example-text" before="Text" after="Text">
          <Input defaultValue="Small" />
        </InputGroup>

        <InputGroup width={10} size="medium" name="example-text" before="Text" after="Text">
          <Input defaultValue="Medium" />
        </InputGroup>

        <InputGroup width={10} size="large" name="example-text" before="Text" after="Text">
          <Input defaultValue="Large" />
        </InputGroup>

        <InputGroup width={10} size="xlarge" name="example-text" before="Text" after="Text">
          <Input defaultValue="XLarge" />
        </InputGroup>
      </div>

      <h4 className="typography-body-10 text-text-muted italic">Select add-ons</h4>
      <div className="flex flex-col gap-4">
        <InputGroup
          width={10}
          size="small"
          before={
            <Select size="small">
              <option>Select</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </Select>
          }
          after={
            <Select size="small">
              <option>Select</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </Select>
          }
        >
          <Input defaultValue="Small" />
        </InputGroup>

        <InputGroup
          width={10}
          size="medium"
          before={
            <Select size="medium">
              <option>Select</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </Select>
          }
          after={
            <Select size="medium">
              <option>Select</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </Select>
          }
        >
          <Input defaultValue="Medium" />
        </InputGroup>

        <InputGroup
          width={10}
          size="large"
          before={
            <Select size="large">
              <option>Select</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </Select>
          }
          after={
            <Select size="large">
              <option>Select</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </Select>
          }
        >
          <Input defaultValue="Large" />
        </InputGroup>

        <InputGroup
          width={10}
          size="xlarge"
          before={
            <Select size="xlarge">
              <option>Select</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </Select>
          }
          after={
            <Select size="xlarge">
              <option>Select</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </Select>
          }
        >
          <Input defaultValue="XLarge" />
        </InputGroup>
      </div>
      <h4 className="typography-body-10 text-text-muted italic">Button add-ons</h4>

      <div className="flex flex-col gap-4">
        <InputGroup
          width={10}
          size="small"
          name="example-text"
          before={<Button size="small">Button</Button>}
          after={<Button size="small">Button</Button>}
        >
          <Input defaultValue="Small" />
        </InputGroup>

        <InputGroup
          width={10}
          size="medium"
          name="example-text"
          before={<Button size="medium">Button</Button>}
          after={<Button size="medium">Button</Button>}
        >
          <Input defaultValue="Medium" />
        </InputGroup>

        <InputGroup
          width={10}
          size="large"
          name="example-text"
          before={<Button size="large">Button</Button>}
          after={<Button size="large">Button</Button>}
        >
          <Input defaultValue="Large" />
        </InputGroup>

        <InputGroup
          width={10}
          size="xlarge"
          name="example-text"
          before={<Button size="xlarge">Button</Button>}
          after={<Button size="xlarge">Button</Button>}
        >
          <Input defaultValue="XLarge" />
        </InputGroup>
      </div>
    </div>
  );
};
```

###### Usage examples

```tsx
() => {
  const [value, setValue] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <InputGroup width={10} name="example-text" label="Total amount (in whole dollars)" before="AUD" after=".00">
        <Input defaultValue="" type="number" />
      </InputGroup>

      <InputGroup
        size="large"
        width={10}
        before="$"
        name="example-select"
        label="Rental amount"
        after={
          <Select
            name="example-select-select"
            label="Currency"
            size="large"
            defaultValue="monthly"
            onChange={event => console.log(`Selected ${event.target.value}`)}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </Select>
        }
      >
        <Input type="number" />
      </InputGroup>

      <InputGroup size="large" width={30} name="example-button" label="Search" after={<Button size="large">Go</Button>}>
        <Input defaultValue="" />
      </InputGroup>

      <InputGroup
        size="large"
        width={10}
        name="example-select"
        label="Phone number"
        placeholder="Placeholder text"
        before={
          <Select
            name="example-select-select"
            label="+612"
            size="large"
            onChange={event => console.log(`Selected ${event.target.value}`)}
            data={[
              { text: '+612', value: '+612' },
              { text: '+613', value: '+613' },
              { text: '+614', value: '+614' },
            ]}
          >
            <option value="+612">+612</option>
            <option value="+613">+613</option>
            <option value="+614">+614</option>
          </Select>
        }
      >
        <Input type="number" />
      </InputGroup>

      <InputGroup
        size="large"
        width={4}
        name="example-button"
        label="Number stepper"
        before={
          <Button size="large" onClick={() => setValue(value => value - 1)}>
            -
          </Button>
        }
        after={
          <Button size="large" onClick={() => setValue(value => value + 1)}>
            +
          </Button>
        }
      >
        <Input value={value} type="number" onChange={event => setValue(parseInt(event.target.value))} />
      </InputGroup>
    </div>
  );
};
```

###### Error state

```tsx
() => {
  const [value, setValue] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <h4 className="typography-body-10 text-text-muted italic">Text add-ons with errors</h4>

      <InputGroup
        width={10}
        size="medium"
        name="example-text"
        before="Text"
        after="Text"
        label="Label"
        errorMessage="If there is an error, it can go here"
      >
        <Input invalid defaultValue="" />
      </InputGroup>

      <h4 className="typography-body-10 text-text-muted italic">Select add-ons with errors</h4>

      <InputGroup
        width={10}
        size="medium"
        label="Label"
        errorMessage="If there is an error, it can go here"
        before={
          <Select invalid size="medium" errorMessage="If there is an error, it can go here">
            <option>Select</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </Select>
        }
        after={
          <Select invalid size="medium" errorMessage="If there is an error, it can go here">
            <option>Select</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </Select>
        }
      >
        <Input invalid errorMessage="If there is an error, it can go here" defaultValue="" />
      </InputGroup>

      <h4 className="typography-body-10 text-text-muted italic">Button add-ons with errors</h4>

      <InputGroup
        width={10}
        size="medium"
        label="Label"
        errorMessage="If there is an error, it can go here"
        name="example-text"
        before={<Button size="medium">Button</Button>}
        after={<Button size="medium">Button</Button>}
      >
        <Input invalid defaultValue="" />
      </InputGroup>
    </div>
  );
};
```

#### Dos And Donts

- Do use multiple add-ons if necessary.
- Avoid changing the styling of input add-on’s (border radius, colour, size etc).

#### Icons

###### Types

```tsx
<div className="flex flex-col gap-4">
  <h4 className="typography-body-10 text-text-muted italic">Icon before</h4>
  <InputGroup width={20} before={{ icon: () => <SearchIcon size="small" color="muted" /> }}>
    <Input />
  </InputGroup>

  <h4 className="typography-body-10 text-text-muted italic">Icon after</h4>
  <InputGroup width={20} after={{ icon: TickIcon }}>
    <Input />
  </InputGroup>

  <h4 className="typography-body-10 text-text-muted italic">Button icon after</h4>
  <InputGroup
    width={20}
    after={{ inset: true, element: <Button look="link" iconAfter={ClearIcon} iconColor="muted" /> }}
  >
    <Input />
  </InputGroup>
</div>
```

###### Usage examples

```tsx
() => {
  const [inputValue, setInputValue] = useState<string>('');
  const clearInput = useCallback(() => setInputValue(''), []);

  return (
    <InputGroup width={20}
      label="Search"
      before={{
        icon: SearchIcon,
      }}
      after={{
        inset: true,
        element: <Button onClick={clearInput} look="link" iconAfter={ClearIcon} iconColor="muted" />,
      }}
    >
      <Input onChange={({ target: { value } }) => setInputValue(value)} value={inputValue} />
    </InputGroup>
  );
};
```

```tsx
() => {
  const [typeInput, setTypeInput] = useState<'password' | 'text'>('password');
  const toggleType = useCallback(() => setTypeInput(state => (state === 'password' ? 'text' : 'password')), []);

  return (
    <InputGroup width={20}
      label="Show and hide input visibility"
      after={{
        inset: true,
        element: (
          <Button
            onClick={toggleType}
            look="link"
            iconAfter={typeInput === 'password' ? VisibilityIcon : VisibilityOffIcon}
            iconColor="muted"
          />
        ),
      }}
    >
      <Input type={typeInput} />
    </InputGroup>
  );
};
```

#### Labels

Use the input group component to accessibly define the labels used with [Inputs,](/components/inputs) and [Text areas](/components/textarea). All inputs require labels for usability and accessibility.

```tsx
  <InputGroup width={20} label="Label" hint="Hint text" >
          <Input />
        </InputGroup>
```

#### Supporting Text

Supporting text sits below the field, it can be a character count, or validated feedback of the information that has been entered.

###### Types

```tsx
<InputGroup width="20" label="Supporting text" supportingText="I am supporting text">
  <Input />
</InputGroup>
```

###### Usage examples

```tsx
() => {
  const MAX_LENGTH = 250;
  const [inputValue, setInputValue] = useState<string>('');
  const counterText = useMemo(() => {
    const lengthLeft = MAX_LENGTH - inputValue.length;
    return `${lengthLeft} remaining`;
  }, [inputValue]);

  return (
    <InputGroup label="Comments" hint="Supporting text used for character count" supportingText={counterText}>
      <Textarea onChange={({ target: { value } }) => setInputValue(value)} value={inputValue} />
    </InputGroup>
  );
};
```

```tsx
() => {
  const [inputValue, setInputValue] = useState<string>('');
  const [validating, setValidating] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const validate = useCallback(() => {
    setValidating(true);
    setError(undefined);
    setTimeout(() => {
      if (inputValue !== '647453') {
        setError('Routing number not found');
      }
      setValidating(false);
    }, 1500);
  }, [inputValue]);

  return (
    <InputGroup width="20"
      label="Enter ABA routing number"
      hint="For a valid response use: 647453, all other numbers will show the invalid response"
      after={validating ? { icon: ProgressIndicator } : <Button onClick={validate}>Check</Button>}
      errorMessage={error}
    >
      <Input invalid={!!error} onChange={({ target: { value } }) => setInputValue(value)} value={inputValue} />
    </InputGroup>
  );
};
```

#### User Experience

###### Add-ons

Add-ons are a great addition to fields in forms and calculators, they provide instant cues that inform users about what is expected of them. Use text add-ons when there’s an association between one attribute and another, as they add a clear affordance for what type of data is required to be entered in the field, e.g. $ or %.

You can also use a select add-on at either end of a field to combine two related questions e.g., an amount and a time frame ($2200 / month), or a currency type and a value (AUD / $2200).

###### Supporting text

The most common usage of Supporting text is to display a character count for a field entry, this can be very useful to help manage users expectations around how much space is available for their message. It provides visual clarity and for users who may have cognitive or visual impairments, a character count can serve as an accessibility aid, helping them understand the input constraints more easily.

#### Visual Design

As with most components in the Design system Input groups are designed to be simple, unobtrusive and accessible.

### Accessibility

#### Accessibility Features

- An indicator outline appears around the input, select or button when focused via a keyboard or assistive technology
- Input group includes an option to visually hide the label
- The input group shape and text content is visible in Windows High Contrast Mode (WHCM). Button ‘look’ styling (colour) is not visible in WHCM.

###### Accessibility in the HTML

- `<label htmlFor="{ID}">` Input group has the option of having a visually hidden label element and uses explicit association for optimal support in assistive technologies. [React component: refer to srOnly prop, id is auto-generated]
- `<input type="text" id="{ID}"> / <select id="{ID}">` Text input or select elements must have a unique id value. [React component: id is auto-generated but can be overwritten using instanceId property]

#### Notes On Accessibility

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility) – Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Robust

When designing inputs with select boxes (eg input with timeframe selection), the select box is often placed to the right of the input. This makes most sense for sighted users and plays to convention.

However, it makes the order of inputs announced by screen readers as 1. input 2. select. This means screen reader users will be unaware of the ability to change the timeframe until the select box receives focus and is announced, potentially forcing them to reconsider their input, delete, then re-enter.

One way to aid screen reader users is to use hint text to instruct. For example:

"Enter the amount and select day, month, or year"

---


## Link

**Description:** The Link component is a way for developers to quickly apply consistent web link styling while also providing global guidance for designers. There are two main styles of links for different use cases. This component is also called Anchor.

### Design Guidelines

#### Inline

The inline option is mainly used for links that appear within a sentence or paragraph, with or without an icon before or after. It can also be used on its own without surrounding text but only when presented in "Link" colour with an underline and no icon.

```tsx
<div className="flex flex-col gap-5">
  <p className="typography-body-9">
  <Heading size="9" className="font-bold">Inline link - no icon</Heading>
    Lorem ipsum dolor sit amet consectetur,{' '}
    <Link href="#" type="inline">
      look, I'm an inline link
    </Link>{' '}
    adipisicing elit. Libero facilis odit voluptate reprehenderit laborum numquam ex optio
    doloribus magni repudiandae vero fugiat iusto tempora debitis sunt laboriosam nobis, ut voluptatum?
  </p>
  <p className="typography-body-9">
  <Heading size="9" className="font-bold">Inline link - icon before</Heading>
    Lorem ipsum dolor sit amet consectetur,{' '}
    <Link href="#" type="inline" iconBefore={PdfFileIcon}>
      look, I'm an inline link
    </Link>{' '}
    adipisicing elit. Libero facilis odit voluptate reprehenderit laborum numquam ex optio
    doloribus magni repudiandae vero fugiat iusto tempora debitis sunt laboriosam nobis, ut voluptatum?
  </p>
  <p className="typography-body-9">
  <Heading size="9" className="font-bold">Inline link - icon after</Heading>
    Lorem ipsum dolor sit amet consectetur,{' '}
    <Link href="#" iconSize="xsmall" type="inline" iconAfter={NewWindowIcon} size="small">
      look, I'm an inline link
    </Link>{' '}
    adipisicing elit. Libero facilis odit voluptate reprehenderit laborum numquam ex optio
    doloribus magni repudiandae vero fugiat iusto tempora debitis sunt laboriosam nobis, ut voluptatum?
  </p>
</div>
```

#### Standalone

The standalone option is to be used by itself, on its own line, and never within a sentence or paragraph. It must always be used with an [icon](/foundation/icon) before or after. The styling for a standalone link is "Text" colour text and "Link" colour icon. The underline appears on hover.

```tsx
<div className="flex flex-col gap-5">
  <Link mb-4 href="#" iconBefore={PdfFileIcon}>
    Look I'm a standalone link
  </Link>
  <Link href="#" iconBefore={ArrowRightIcon}>
    I'm also a standalone link
  </Link>
  <Link href="#" iconAfter={NewWindowIcon} size="xsmall">
    I'm a standalone link too
  </Link>
</div>
```

#### User Experience

Since the inception of the internet, links have been integral for navigation, and still are to this day. They are defined by underlines, an established convention that is instantly recognisable. Any deviations need another strong signifier such as an icon to avoid impacts to usability, optimisation, and accessibility.

By establishing consistency across all web interfaces and across all brands we are optimising the experience for customers and meeting the highest accessible standards. If you’re unsure if a link is accessible, consult an accessibility manager to explain the use case and context.

Standalone links produce an underline for the text on hover while inline links remove the underline on hover. These small degrees of interaction assist those with motor and cognitive challenges to identify when they’ve interacted with the link.

###### Link lists

The most accessible way to present a list of links is to use the [List component](/components/list). It can be configured as a list of links which is better for screen reader users to navigate.

#### Visual Design

The standalone link uses a "Link" colour for the icon and "Text" colour for the text. In testing, using the "Link" colour for the text became overwhelming on a page which may contain many links.

The inline link uses a "Link" colour for the text and if using an icon, it too uses the "Link" colour.

###### Exceptions

There are exceptions to using underlines and these use cases require an accessibility manager to review and approve. Examples are menus, header or footer navigation, or other lists which could be interpreted as a menu in page.

### Accessibility

#### Accessibility Features

- Inline text links are styled with a custom colour to distinguish them from normal text, but also use the standard HTML document underline convention. This approach satisfies an important accessibility requirement to ‘not rely on colour alone’ to convey information, indicate an action or distinguish a visual element.
- An indicator outline appears around the links when focused.
- The link text and icon is visible in Windows High Contrast Mode.

###### Accessibility in the HTML

- `<svg aria-label="{DESCRIPTION}" role="img" focusable="false">`: Provides a label to describe the icon, prevents the Icon SVG element from being traversed by browsers that map the SVG to the ‘group’ role and from unnecessarily receiving focus in Internet Explorer (IE)

#### Notes On Accessibility

Links are a fundamental part of making an experience accessible, and key to navigation and providing access to products and services. By making links unambiguous through styling, placement, and copywriting we are upholding a high standard while reducing the chances of litigation.

Here are some specific ways in which this component follows the WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility)– Perceivable, Operable, Understandable and Robust.

###### Perceivable

In order to make links as recognisable as possible, they require an underline unless presented with an icon. Any deviation needs to be carefully considered in context with an accessibility manager.

###### Understandable

Active or verb based copywriting alone is not a strong enough signifier of a link due to other verbs presented in the surrounding copy undermining the efficacy of such an approach.

---


## Lists

**Description:** Lists are compiled of an ordered set of items. They are highly legible, intuitive, simple and extremely effective at highlighting features, benefits, or legal copy for example.

### Design Guidelines

#### Bullet Lists

Create simple and easily scannable lists with these list and nested list styles.

```tsx
<div>
  <h1 className="typography-body-10 mb-2 italic text-text-muted">Default list</h1>
  <List type="bullet">
    <ListItem>Styled bullet list</ListItem>
    <ListItem>Styled bullet list</ListItem>
    <ListItem>Styled bullet list</ListItem>
    <List>
      <ListItem>Styled bullet list</ListItem>
      <ListItem>Styled bullet list</ListItem>
      <ListItem>Styled bullet list</ListItem>
      <List>
        <ListItem>Styled bullet list</ListItem>
        <ListItem>Styled bullet list</ListItem>
        <ListItem>Styled bullet list</ListItem>
      </List>
      <ListItem>Styled bullet list</ListItem>
    </List>
    <ListItem>Styled bullet list</ListItem>
  </List>
  <br/>
  <h1 className="typography-body-10 mb-2 italic text-text-muted">List colours</h1>
  <List type="bullet" className="mb-4">
    <ListItem look="primary">This is a primary list</ListItem>
    <ListItem look="hero">This is a hero list</ListItem>
  </List>
</div>
```

#### List Item Spacing

Use a large spaced list when you have interactive elements. This can be used to increase the affordance for touch devices.

```tsx
<div>
  <List type="link" spacing="large">
    <ListItem href="#">This is a large spaced link list</ListItem>
    <ListItem href="#">This is a large spaced link list</ListItem>
    <ListItem href="#">This is a large spaced link list</ListItem>
  </List>
</div>
```

#### Other Lists

Use link list styling when the list items are clickable. An un-styled list has no bullets, ticks or icons.

```tsx
<>
  <h1 className="typography-body-10 mb-2 italic text-text-muted">Link list</h1>
  <List type="link" className="mb-4">
    <ListItem href="#">This is a link list</ListItem>
    <ListItem href="#">This is a link list</ListItem>
  </List>
  <h1 className="typography-body-10 mb-2 italic text-text-muted">Tick list</h1>
  <List type="tick" className="mb-4">
    <ListItem>This is a tick list</ListItem>
    <ListItem>This is a tick list</ListItem>
  </List>
  <h1 className="typography-body-10 mb-2 italic text-text-muted">Cross list</h1>
  <List type="cross" className="mb-4">
    <ListItem>This is a cross list</ListItem>
    <ListItem>This is a cross list</ListItem>
  </List>
  <h1 className="typography-body-10 mb-2 italic text-text-muted">Unstyled list</h1>
  <List type="unstyled" className="mb-4">
    <ListItem>This is an unstyled list</ListItem>
    <ListItem>This is an unstyled list</ListItem>
  </List>
  <h1 className="typography-body-10 mb-2 italic text-text-muted">Icon list</h1>
  <List className="mb-4">
    <ListItem type="icon" icon={GenericFileIcon} look="muted">This is an icon list</ListItem>
    <ListItem type="icon" icon={GenericFileIcon} look="muted">This is an icon list</ListItem>
    <ListItem type="icon" icon={GenericFileIcon} look="primary">This is an icon list</ListItem>
    <ListItem type="icon" icon={GenericFileIcon} look="primary">This is an icon list</ListItem>
  </List>
</>
```

#### User Experience

Use lists to highlight product benefits, list downloadable assets, provide links to other pages or screens and much more.

When creating lists that sit next to one another, ensure the right amount of spacing between otherwise it can become difficult for users to scan and find information.

#### Visual Design

Lists are arguably the most common UI element on the web so it’s important to have a flexible, robust and well-crafted solution.

We’ve extended the browsers default list styling and provided the option to use custom bullets or [icons](/foundation/icon) in any configuration. Although this provides more options and more flexibility it’s still important to adhere to the design system requirements, particularly when creating list items that are hyperlinks.

The Design system uses Primary (accent) colour to define hyperlinks etc. As a result the List Link component uses a (Primary) Arrow Right icon. Similarly if you needed a list of downloadable PDF’s you could use the Icon List component and assign a (Primary) PDF icon to each item in the list to indicate that these are links.

On the flip side, if you just need a basic Tick List or Bullet List where the items are not hyperlinks we’d recommend using an alternate icon colour to Primary so as not to confuse the customer.

Put simply. If it’s a hyperlink use Primary. If it’s not, use a different colour.

Lists also have 2 spacing options. For example, when designing for touch screens a list of links may require more affordance so we’ve added an option which increases the space between each list item.

### Accessibility

#### Accessibility Features

- Lists are announced as expected in all screen readers including VoiceOver
- Custom bullet shapes (incl. chevrons, ticks and crosses) are rendered using CSS borders and are visible in Windows High Contrast Mode (WHCM), ‘look’ styling (colour) is not retained in WHCM.

###### Accessibility in the HTML

- `<svg aria-label="{ICON_NAME}">`: Provides a label that describes the Icon
- `<svg role="img" focusable="false">`: Prevents the Icon SVG element from being traversed by browsers that map the SVG to the ‘group’ role and from unnecessarily receiving focus in Internet Explorer (IE)

#### Notes On Accessibility

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility) – Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Perceivable

The link list style uses a primary coloured chevron, rather than the link styling generally applied in the Design system. Essentially it’s to avoid underline overload. In the scenario where there is a long list of links, using the underline would result large block of red underlined text which becomes difficult to read.

---


## Modals

**Description:** Modals are components which interrupt a user flow by focusing on a defined area of the screen. They are typically reserved for critical junctions in a user journey.

### Design Guidelines

#### Dos And Donts

- Avoid changing the styles of the modal.
- Avoid adding too much text or functionality into the modal.
- Do use the native operating system modal if required.

#### Modal Sizes

Use the appropriate modal size to suit your content. A modal will always responsively, re-size itself to fit the view port it appears in. Select from the buttons below to view the modals.

```tsx
() => {
  const portalContainer = document.getElementById('demo-content');
  const stateSM = useOverlayTriggerState({});
  const stateMD = useOverlayTriggerState({});
  const stateLG = useOverlayTriggerState({});

  const states = useMemo(() => {
    return {
      sm: stateSM,
      md: stateMD,
      lg: stateLG,
    };
  }, [stateSM, stateMD, stateLG]);

  return (
    <div className="flex justify-center gap-4">
      {[{ size: 'sm', label: 'Small'}, { size: 'md', label: 'Default'}, { size: 'lg', label: 'Large'}].map(({ size, label }: { size: string; label: string; }) => (
        <Fragment key={size}>
          <Modal zIndex={1020} isDismissable size={size} state={states[size as 'sm' | 'md' | 'lg']} title="Sudden and magnificent" portalContainer={portalContainer ?? undefined}>
            <ModalBody>
              <p>
                The line of the horizon was clear and hard against the sky, and in one particular quarter it showed black against a silvery climbing phosphorescence that grew and grew.
              </p>
            </ModalBody>
            <ModalFooter
              primaryLabel="Label"
              primaryOnClick={states[size as 'sm' | 'md' | 'lg'].close}
              secondaryLabel="Label"
              secondaryOnClick={states[size as 'sm' | 'md' | 'lg'].close}
            />
          </Modal>
          <Button soft look="primary" onClick={states[size as 'sm' | 'md' | 'lg'].open}>{label} modal</Button>
        </Fragment>
      ))}
    </div>
  );
};
```

#### Modal Variations

Modals are configurable. Choose how they are dismissed, whether they have a footer, or what the footer contains. Modals can house whatever content you require of them, allowing you to define your experience. Make sure you always provide a clear way forward. Select from the buttons below to view the modals.

```tsx
() => {
  const portalContainer = document.getElementById('demo-content');
  const noFooterState = useOverlayTriggerState({});
  const noDismissState = useOverlayTriggerState({});

  return (
    <div className="flex justify-center gap-2">
      <Modal zIndex={1020} state={noFooterState} title="Modal title" isDismissable onClose={noFooterState.close} portalContainer={portalContainer ?? undefined}>
        <ModalBody>
          <p>
            The line of the horizon was clear and hard against the sky, and in one particular quarter it showed black
            against a silvery climbing phosphorescence that grew and grew.
          </p>
        </ModalBody>
      </Modal>
      <Button soft look="primary" onClick={noFooterState.open}>
        No footer
      </Button>
      <Modal zIndex={1020} isKeyboardDismissDisabled state={noDismissState} title="Modal title" portalContainer={portalContainer ?? undefined}>
        <ModalBody>
          <p>
            The line of the horizon was clear and hard against the sky, and in one particular quarter it showed black
            against a silvery climbing phosphorescence that grew and grew.
          </p>
        </ModalBody>
        <ModalFooter
          primaryLabel="Label"
          primaryOnClick={noDismissState.close}
          secondaryLabel="Close"
          secondaryOnClick={noDismissState.close}
        />
      </Modal>
      <Button soft look="primary" onClick={noDismissState.open}>
        No dismiss button
      </Button>
    </div>
  );
};
```

#### User Experience

A modal is useful for bringing information to the attention of a user and are best used for short decision making moments. As they can greatly disrupt the task or goal the user is attempting to complete, ensure modals are used sparingly and with good reason. Ensure calls to action are clear and users can escape the modal either by tapping or selecting outside the modal area by an obvious crosshair, and/or a close or cancel button.

#### Visual Design

The modal is a generic component designed to work in as many scenarios as possible. It can be configured to accommodate most functional requirements.

### Accessibility

#### Accessibility Features

- To make the content easier to read when displayed on small screens, the modal fills 100% of the screen. Completely covering the background window also hides background movement that occurs on some mobile devices when scrolling content inside the dialog.
- Modal heading receives focus and is announced on open. The user is able to ‘arrow down’ to navigate the modal content if desired. This pattern differs from the [WAI-ARIA Authoring Practices Modal Dialog](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html) pattern, which announces all modal content on open and is often considered unnecessarily verbose for screen reader users.
- Close button appears below the heading in the source order; users can easily ‘arrow down’ and close the modal if the heading content was of no interest
- When the modal is open, focus is constrained within the context of the modal. Sequential keyboard navigation loops through focusable elements within the modal; and not to any elements found outside of the modal.
- Close the modal using Close button, Esc key or background click (if modal is dismissible)
- When the modal closes, focus returns to the button that originally toggled the modal
- The modal shape, text and icon content is visible in Windows High Contrast Mode (WHCM). Button ‘look’ styling (colour) is not visible in WHCM.

###### Accessibility in the HTML

- `<button aria-label="Close modal">`: Close button announced as “Close modal” in screen readers

###### Keyboard support

- ‘Tab’ moves focus to next focusable element inside the dialog. When focus is on the last focusable element in the dialog, moves focus to the first focusable element in the dialog.
- ‘Shift + Tab’ moves focus to previous focusable element inside the dialog
- When focus is on the first focusable element in the dialog, moves focus to the last focusable element in the dialog
- ‘Esc’ key closes the modal (if modal is dismissible)

---


## Pagination

**Description:** Pagination is a component capable of helping the user navigate and give access to multiple pages of content or data.

### Design Guidelines

#### Dos And Donts

- Avoid changing the styles (border radius, colours, size etc).

#### Pagination

Use this responsive pagination component for navigation through multiple pages or content views.

```tsx
() => {
  const [page, setPage] = useState(1);

  return (
    <Pagination
      current={page}
      onChange={changedPage => {
        setPage(changedPage);
      }}
      totalPages={3}
    />
  );
};
```

#### User Experience

Pagination is useful for segmenting large amounts of content (usually written) to limit page length and make the consuming experience more manageable.

#### Visual Design

The pagination component extends the button styles and provides another opportunity to add some subtle brand colour to the UI. This design also provides accessible hit size and contrast ratios.

### Accessibility

#### Accessibility Features

- A `<nav>` element labeled “Page number” identifies the structure as a page navigation menu and makes it a navigation landmark so that it is easy to locate
- The navigation list is announced as expected in all screen readers including VoiceOver
- The current navigation item is flagged to indicate the current page to assistive technologies
- A visually hidden status element is updated to announce the current page
- An indicator outline appears around the navigation item when focused
- The pagination shape and text content is visible in Windows High Contrast Mode

###### Accessibility in the HTML

- `<nav aria-label="Page number">`: Provides a label that describes the type of navigation
- `<button aria-current="page">` / `<a aria-current="page">`: Currently selected navigation item is marked with *aria-current*. Depending on how routing is implemented (updating state vs linking to a new URL), an anchor (link) element may be better suited.
- `<span role="status">`: A visually hidden *span* element with “status” *role* is updated with the current page number text to notify assistive technologies

###### Keyboard support

Keyboard users navigate the pagination items as they would with a standard button or link.

#### Notes On Accessibility

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility) – Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Operable

Using a disabled button for 'Back' and 'Next' is acceptable in this instance provided it is coded correctly. In essence it's a complimentary function to the numbered buttons, as the user is not locked into a 'mode' and has another means of achieving the same results.

---


## Panels

**Description:** Panels are containers used to group and separate content with a strong intent or action, or to simply communicate important information.

### Design Guidelines

#### Default Panel

The default panel style has an emphasised heading element which adds some brand colour to the interface.

```tsx
<Panel heading="Default panel">
  <PanelBody>
    They found themselves standing on the very edge of the Wild Wood. Rocks and brambles and tree-roots behind them,
    confusedly heaped and tangled; in front, a great space of quiet fields, hemmed by lines of hedges black on the snow,
    and, far ahead, a glint of the familiar old river, while the wintry sun hung red and low on the horizon. The Otter,
    as knowing all the paths, took charge of the party, and they trailed out on a bee-line for a distant stile. Pausing
    there a moment and looking back, they saw the whole mass of the Wild Wood, dense, menacing, compact, grimly set in
    vast white surroundings; simultaneously they turned and made swiftly for home, for firelight and the familiar things
    it played on, for the voice, sounding cheerily outside their window, of the river that they knew and trusted in all
    its moods, that never made them afraid with any amazement.
  </PanelBody>
  <PanelFooter>Panel footer</PanelFooter>
</Panel>
```

#### Dos And Donts

- Avoid changing the styles of panels.
- Avoid using long panel headings especially when designing responsive applications.

#### Faint Panel

The faint panel style is the more subtle and understated option.

```tsx
<Panel heading="Faint panel" look="faint">
  <PanelBody>
    They found themselves standing on the very edge of the Wild Wood. Rocks and brambles and tree-roots behind them,
    confusedly heaped and tangled; in front, a great space of quiet fields, hemmed by lines of hedges black on the snow,
    and, far ahead, a glint of the familiar old river, while the wintry sun hung red and low on the horizon. The Otter,
    as knowing all the paths, took charge of the party, and they trailed out on a bee-line for a distant stile. Pausing
    there a moment and looking back, they saw the whole mass of the Wild Wood, dense, menacing, compact, grimly set in
    vast white surroundings; simultaneously they turned and made swiftly for home, for firelight and the familiar things
    it played on, for the voice, sounding cheerily outside their window, of the river that they knew and trusted in all
    its moods, that never made them afraid with any amazement.
  </PanelBody>
  <PanelFooter>Panel footer</PanelFooter>
</Panel>
```

#### Panel With Table

Use a table within a panel to give it a more prominent header and surround.

```tsx
<Panel heading="Panel with table">
  <Table striped>
    <TableHeader>
      <TableHeaderRow>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Type</TableHeaderCell>
        <TableHeaderCell>Date Modified</TableHeaderCell>
      </TableHeaderRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Games</TableCell>
        <TableCell>File folder</TableCell>
        <TableCell>6/7/2020</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Program Files</TableCell>
        <TableCell>File folder</TableCell>
        <TableCell>4/7/2021</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>bootmgr</TableCell>
        <TableCell>System file</TableCell>
        <TableCell>11/20/2010</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>log.txt</TableCell>
        <TableCell>Text Document</TableCell>
        <TableCell>1/18/2016</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter colspan="{3}">Footer goes here and should colSpan all columns</TableFooter>
  </Table>
</Panel>
```

#### User Experience

Panels are designed to group content either for visual structure or as a design requirement. They have optional headers and footers which can be used to associate actions with your grouped content.

#### Visual Design

The default panel uses colour in the header to increase visibility and branding. This can be useful in text heavy screens where areas of colour can provide some relief. As the name suggests the faint panel can be used for content that doesn't need to be visually prominent. Like most of the UI components the faint panel is designed to be subtle and unobtrusive so as not to detract from the content.

### Accessibility

#### Accessibility Features

- The heading element must utilise the semantically correct heading level (`<h1>` - `<h6>`) depending on Panel’s position within the document structure
- The Panel shape and text content is visible in Windows High Contrast Mode (WHCM). The ‘look’ styling (colour) is not visible in WHCM.

---


## Popovers

**Description:** Popovers are small, floating UI elements containing un-styled text that appear above the main content. Use them to display additional information without navigating the user away from what they are doing.

### Design Guidelines

#### Dos And Donts

- Do keep information simple and succinct.
- Avoid styling the content of a Popover
- Avoid using too much information inside the popover especially when designing responsive web apps.

#### Popover

These popovers can appear with or without a heading. For accessibility reasons our popovers are designed to only be dismissed by re-selecting the element that triggered them, using the close button, or pressing the Escape key.

```tsx
() => {
  const [portalContainer, setPortalContainer] = useState(undefined);

  return (
    <div>
      <h4 className="typography-body-10 text-muted italic mb-3">Icon</h4>
      <div className="flex items-center gap-2">
        <p>With heading</p>
        <Popover
          portal={portalContainer ?? undefined}
          onClick={() => setPortalContainer(document.getElementById('demo-content'))}
          heading="Heading"
          content="Small overlays of content for housing secondary information. These are often used to provide explanatory information for complex ideas."
          icon={() => <HelpIcon look="outlined" color="hero" />}
        />
        <p>Without heading</p>
        <Popover
          portal={portalContainer ?? undefined}
          content="Small overlays of content for housing secondary information. These are often used to provide explanatory information for complex ideas."
          icon={() => <HelpIcon look="outlined" color="hero" />}
          onClick={() => setPortalContainer(document.getElementById('demo-content'))}
        />
      </div>
    </div>
  )
}


```

```tsx
() => {
  const [portalContainer, setPortalContainer] = useState(undefined);

  return (
    <div>
      <h4 className="typography-body-10 text-muted italic mb-3">Button</h4>
      <div className="flex gap-2">
        <Popover
          portal={portalContainer ?? undefined}
          content="Small overlays of content for housing secondary information. These are often used to provide explanatory information for complex ideas."
          heading="Heading"
          onClick={() => setPortalContainer(document.getElementById('demo-content'))}
        >
          With heading
        </Popover>
        <Popover
          portal={portalContainer ?? undefined}
          content="Small overlays of content for housing secondary information. These are often used to provide explanatory information for complex ideas."
          onClick={() => setPortalContainer(document.getElementById('demo-content'))}
        >
          Without heading
        </Popover>
      </div>
    </div>
  )
}
```

```tsx
<div><h4 className="typography-body-10 text-muted italic mb-3">Link</h4>
 <p className="mb-4">    
  The popover can also be triggered by an inline
      <Popover linkStyling className="ml-1" heading="Heading" content="Small overlays of content for housing secondary information. These are often used to provide explanatory information
    for complex ideas." size="small">
        link
      </Popover>
      .
    </p>
</div>
```

#### User Experience

Popovers can retain helpful information to supplement a task or function. However, we don't recommend you hide critical information in popovers. Always surface important or critical information on the page or screen so it’s discoverable and not hidden behind an interaction.

The popovers purpose is to show only short snippets of un-styled text, they should not contain text styling, links or buttons. Their most common usage is for [Help text](/guides/help-text).

Be wary of how popovers are used on mobile devices, or how they would work when users are using browser zoom or ZoomText to access your content. Popovers can obscure other content or functions, and be difficult to show reliably at smaller screen sizes. Alternatively, consider using a collapsible element or modal.

We recommend only using popovers when absolutely necessary, to consider the language you are using, and try to word things in such a way as to not require supplementary text.

#### Visual Design

Popovers are designed to be small overlays of content housing secondary information. They are often used to elaborate on terms or provide additional information/explanation to labels etc. Given that most of our interfaces are content heavy popovers have been designed to clearly stand out above the underlying content as a result they are intentionally more pronounced than most UI elements in the GUI.

### Accessibility

#### Accessibility Features

- The user interacts with the button to toggle the panel – consistently whether using mouse, touch or keyboard. To hide the panel the user may toggle the button again or press the ‘Esc’ key.
- As with similar components that hide/show content, this component follows a ‘user is in control’ approach. Rather than programmatically moving focus to the panel when shown, the toggle button has an *aria-expanded* attribute; the assistive technology user can choose to ‘arrow down’ to announce the panel content if they wish.
- When the panel closes, focus returns to the button that originally toggled the panel
- An indicator outline appears around the button toggle when focused
- The button shape, text, icon content and panel is visible in Windows High Contrast Mode (WHCM). The button ‘look’ styling (colour) is not visible in WHCM.

###### Accessibility in the HTML

- `<button aria-expanded="false|true" aria-controls="{PANEL_ID}">`: Identifies a button element that toggles a content collapse and indicates the state of a collapsible element below. The *aria-controls* attribute creates an association between toggle button and collapsible element (panel).
- `<div id="{PANEL_ID}">`: The panel must have a unique *id* value. The toggle button *aria-controls* and panel *id* attribute values must match.

###### Keyboard support

- Keyboard users navigate toggle buttons as they would with a standard button
- ‘Esc’ key closes the currently active panel

#### Notes On Accessibility

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility) – Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Perceivable

Our popover is user dismissed, the user selects the button, the dialog pops up and stays in its active state until the user dismisses it via the cross hair or by selecting the button again. This functionality has been chosen for usability and accessibility reasons, the user may wish to reference the information in the popover while performing another function e.g filling out a form field - which is not possible in the case of an auto-dismissed popover.

---


## Progress bar

**Description:** Progress bars are animated bars which show a rate of completion for a system task or a response to user input. They can be accompanied by a percentage of completion value.

### Design Guidelines

#### Dos And Donts

- Avoid changing the styles of the progress bar.

#### Progress Bar

We have two progress bar styles. With or without the percentage of progress visible.

```tsx
() => {
  const [barValue, setBarValue] = useState(0);
  const handleProgress = useCallback(
    (calc: number) => {
      const progress = barValue + calc;
      if (progress > 100) return setBarValue(100);
      if (progress < 0) return setBarValue(0);
      return setBarValue(progress);
    },
    [barValue],
  );
  return (
    <>
      <h2 className="typography-body-9 mb-1 font-bold">Default</h2>
      <ProgressBar value={barValue} className="mb-2" />
      <h2 className="typography-body-9 mb-1 font-bold">Skinny</h2>
      <ProgressBar look="skinny" value={barValue} className="mb-2" />
      <div className="flex space-x-1 items-center">
        <Button size="small" disabled={barValue === 0} iconBefore={RemoveIcon} look="faint" soft onClick={() => handleProgress(-10)}>
          10%
        </Button>
        <Button size="small" disabled={barValue === 0} iconBefore={RemoveIcon} look="faint" soft onClick={() => handleProgress(-1)}>
          1%
        </Button>
        <p className="flex-1 text-center">Use the +/- buttons below to demonstrate how the progress bar moves.</p>
        <Button size="small" disabled={barValue === 100} iconBefore={AddIcon} look="faint" soft onClick={() => handleProgress(+1)}>
          1%
        </Button>
        <Button size="small" disabled={barValue === 100} iconBefore={AddIcon} look="faint" soft onClick={() => handleProgress(+10)}>
          10%
        </Button>
      </div>
    </>
  );
};
```

#### User Experience

Use progress bars when loading content, showing the system completing a task, or to visualise other percentage-based calculations. The two styles allow for both a subtle and more bold visual. Use appropriately depending on how much attention you wish to draw to the element.

###### Progress bar usage

On the surface the Progress bar component appears to be a simple way to display a user’s progress through something like an application form. However, using a percentage based element like this for form process fails on many levels for this task:

- Does not provide any confidence or information about what’s to come
- Does not provide context or orientation within the process
- Does not provide any idea of how long the process is
- Does not allow for easy navigation back to an earlier step in the process (which can sometimes be helpful for long processes)
- It is very difficult to provide a precise indication of exactly how far the user has moved through the form, as indicated by percentage
- The presence of a percentage based number indicates a precision that cannot be reflected. How is the percentage calculated? Does the bar move as each question is asked? Or as each page is completed?

GEL recommends using the [Progress rope](/components/progress-rope) component to help a user move through a form with confidence. This component provides the user with a clear understanding of their orientation and the ability to move forward and backwards through the form process.

#### Visual Design

For speed, flexibility and consistency the progress bar is designed to work on any background (light or dark) without requiring overrides to the styles. This is achieved by giving the track a border.

### Accessibility

#### Accessibility Features

- A `<div>` element with “progressbar” role identifies an element that displays the progress status for a task that take a long time or consists of several steps. Various aria attributes provide min, max and current values. All of these are added through the useProgressBar hook from React Aria
- The progress bar is configured to provide an indication of task or action completion in percentage units, announced as “x% complete”
- Displaying the current value is optional; it can be visually hidden if required, but always provided to screen readers through aria value attributes
- The progress bar shape and is visible in Windows High Contrast Mode (WHCM). The indicator bar is additionally rendered using a transparent CSS border to ensure visibility in WHCM.

###### Accessibility in the HTML

- The progress bar uses the useProgressBar hook from React Aria to handle the accessibility code. Read the [full specifications](https://reactspectrum.blob.core.windows.net/reactspectrum/d77b35e970e5549f66b47a83f07423f5c93b7297/docs/react-aria/useProgressBar.html) for more information.
- An `aria-live=”polite”` property has been added on top of React Aria to inform assistive technologies the region receives updates that are important for the user to receive, but not so rapid as to be annoying.

---


## Progress indicator

**Description:** Progress indicators are used to show a state of loading.

### Design Guidelines

#### Progress Indicator

###### Sizes

Use this Large size Progress indicator for page loads, this size can also include an icon and/or a label. See [Loading guide](/guides/loading) for page load patterns.

```tsx
() => {
  return <div className="flex items-top justify-center gap-3">
      <ProgressIndicator size="large" />
      <ProgressIndicator size="large" label="Loading..." />
      <ProgressIndicator size="large" icon={PadlockTickIcon} />
      <ProgressIndicator size="large" label="Signing in" icon={FingerprintIcon} />
    </div>;
}
```

The smaller sizes are suitable for use in components ie buttons or fields.  See [Loading guide](/guides/loading#loading-within-components) for component patterns.

```tsx
() => {
  return <div className="flex items-top justify-left gap-1">

  <Button size="xlarge" iconAfter={ProgressIndicator} iconColor="white">Xlarge</Button> 
  <Button size="large" iconAfter={ProgressIndicator} iconColor="white">Large</Button>  
  <Button size="medium" iconAfter={ProgressIndicator} iconColor="white">Medium</Button>
  <Button size="small" iconAfter={ProgressIndicator} iconColor="white">Small</Button>
    </div>;
}
```

###### Dark backgrounds

The indicator can appear white for use on dark backgrounds.

```tsx
() => {
  return <div className="p-5 bg-surface-hero rounded-md flex items-top justify-center gap-3">
      <ProgressIndicator size="large" color="mono" />
      <ProgressIndicator size="large" color="mono" label="Loading..." />
      <ProgressIndicator size="large" color="mono" icon={PadlockTickIcon} />
      <ProgressIndicator size="large" color="mono" label="Signing in" icon={FingerprintIcon} />
    </div>;
}
```

#### User Experience

Use this component within loading patterns. Predominantly the user experience direction is dictated by the pattern that contains it.

#### Visual Design

Simplicity is the key design requirement for this component. It has an intentional minimal form and simple animation, just enough to capture the essence of its meaning. This ensures readability and clarity even at small sizes. It also optimises the file size.

### Accessibility

#### Notes On Accessibility

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility) – Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Perceivable

The Design System components have been designed to adhere to colour contrast ratios for both text and non-text elements. They have been coded to include text alternatives when required, and allow component text and labels to be resized. They do not use colour alone to convey information.

###### Operable

The Design System components have been coded to be navigable using a keyboard and other assistive technologies. WCAG compliance recommends being aware of the time it takes for people to complete tasks and to not automatically move focus. Animation should be controlled and simple so as not to cause seizures, and it’s important to provide the ability to perform the same task in multiple ways where possible. These rules have been followed where navigation and interaction is included in Design System components or patterns.

###### Understandable

WCAG compliance requires consistent and predicable interactions, clear and simple language, concise labels, no jargon or abbreviations and clear error messaging. These rules have been followed where content and interactions are included in Design System components or patterns.

###### Robust

All Design System components have been coded so they can be clearly announced, understood and navigated using all modern assistive technologies.

---


## Progress rope

**Description:** The progress rope is a tool for signposting completion on long forms or applications and is designed to be used with the GEL forms framework.

### Design Guidelines

#### Default Progress Rope

The default progress rope is used for simple processes with only a small number of steps.

```tsx
() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = useCallback(
    (index: number) => () => {
      setActiveIndex(index);
    },
    [],
  );
  const PROGRESS_ROPE_DATA: ProgressRopeProps['data'] = [
    { text: <h3>Step 1</h3>, onClick: handleClick(0) },
    { text: <h3>Step 2</h3>, onClick: handleClick(1) },
    { text: <h3>Step 3</h3>, onClick: handleClick(2) },
    { text: <h3>Step 4</h3>, onClick: handleClick(3) },
    { text: <h3>Step 5</h3>, onClick: handleClick(4) },
    { text: <h3>Review and Submit</h3>, onClick: handleClick(5) },
  ];

  return (
    <div>
      <ProgressRope current={activeIndex} data={PROGRESS_ROPE_DATA} />
      <Well className="p-2 sm:p-2 flex items-center">
        <div className="mr-2 flex items-center space-x-1">
          <Button iconBefore={ArrowLeftIcon} soft look="faint" size="small" onClick={() => setActiveIndex(state => --state)}>prev</Button>{' '}
          <Button iconAfter={ArrowRightIcon} soft look="faint" size="small" onClick={() => setActiveIndex(state => ++state)}>next</Button>
        </div>
        <code className="flex">Current: {activeIndex}</code>
      </Well>
    </div>
  );
};
```

#### Dos And Donts

- Avoid changing the styling of the Progress Rope (size, colour, border etc).
- Do not change the functionality of the Progress Rope. If additional functionality is required we recommend designing a new (visually different) component which caters for your specific requirements.

#### Grouped Progress Rope

The grouped progress rope is used for complex processes with multiple steps and stages.

```tsx
() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = useCallback(
    (index: number) => () => {
      setActiveIndex(index);
    },
    [],
  );
  const PROGRESS_ROPE_DATA: ProgressRopeProps['data'] = [
    {
      type: 'group',
      text: 'Group 1',
      steps: [
        { text: 'Step 1', onClick: handleClick(0) },
        { text: 'Step 2', onClick: handleClick(1) },
      ],
    },
    {
      type: 'group',
      text: 'Group 2',
      steps: [
        { text: 'Step 3', onClick: handleClick(2) },
        { text: 'Step 4', onClick: handleClick(3) },
      ],
    },
    {
      type: 'group',
      text: 'Group 3',
      steps: [
        { text: 'Step 5', onClick: handleClick(4) },
        { text: 'Step 6', onClick: handleClick(5) },
        { text: 'Step 7', onClick: handleClick(6) },
      ],
    },
    { text: 'Review and Submit', onClick: handleClick(7) },
  ];

  return (
    <div>
      <ProgressRope current={activeIndex} data={PROGRESS_ROPE_DATA} />
      <Well className="p-2 sm:p-2 flex items-center">
        <div className="mr-2 flex items-center space-x-1">
          <Button
            iconBefore={ArrowLeftIcon}
            soft
            look="faint"
            size="small"
            onClick={() => setActiveIndex(state => --state)}
          >
            prev
          </Button>{' '}
          <Button
            iconAfter={ArrowRightIcon}
            soft
            look="faint"
            size="small"
            onClick={() => setActiveIndex(state => ++state)}
          >
            next
          </Button>
        </div>
        <code className="flex">Current: {activeIndex}</code>
      </Well>
    </div>
  );
};
```

#### User Experience

Wayfinding is an important part of navigation. The progress rope has the primary purpose of showing a user where they are in the process of completing a form. This gives a sense of reassurance as well as an indication of how much further there is to go.

This element is primary used within the forms templates, users may or may not refer to it, depending on the complexity of the form and their competency, so avoid using it to contain critical information. When the forms template is viewed in SM to XS viewports the progress rope is hidden off-canvas behind a label (Show all steps) and icon. It is recommended to show ‘Step X of Y’ above the form page title to give users an indication of progress without interacting with the hidden menu.

Short one-page forms generally won’t need to use the progress rope.

Progress rope is made up of categories and pages (parent > child relationship). Categories are not pages, instead describe the pages within. For example:

**About you**

1. Personal details
1. Address
1. Employment

###### Navigating

The progress rope was never intended to be a navigational tool as there are many complexities involved when jumping back and forth particularly when it comes to dependencies and validation by third party vendors. However, there is the capability of navigating backwards using the progress rope by selecting a page (not a category). It is up to project teams to decide whether this functionality is fit for purpose according to requirements.

#### Visual Design

The progress rope indicates the steps required to complete the form and how the customer is progressing through these steps. It is designed to be simple and unobtrusive with subtle use of colour to add brand recognition. We use typography and spacing to ensure the design of this component remains elegant, uncluttered and intuitive irrespective of the amount of sections required.

### Accessibility

#### Accessibility Features

- The set of step buttons is structured using an ordered list
- A `<nav>` element labeled “In this form” identifies the structure as a navigation menu and makes it a navigation landmark so that it is easy to locate
- Step button and Group toggle button text is appended with visually hidden text to convey the step’s state: ‘in progress’, ‘complete’ and ‘not stated’ e.g. “Step 1, complete”, “Step 2, in progress” and ”Step 3, not started”
- Group toggle buttons are wrapped with a heading element to provide a navigation landmark

###### Accessibility in the HTML

- `<nav role="navigation" aria-label="In this form">`: Provides a label that describes the type of navigation
- `<button aria-current="page">`: Applied to the current step button to indicate that it represents the current page
- `<button aria-expanded="true|false" aria-controls="{ID}">`: Identifies a button element that toggles a content collapse and indicates the state of a collapsible element below. The *aria-controls* attribute creates an association between toggle button and collapsible element.
- `<ol role="list" id="{ID}" aria-hidden="true|false">`: The collapsible element must have a unique *id* value. The toggle button *aria-controls* and collapsible element *id* attribute values must match. The collapsible element uses the *aria-hidden* attribute to hide from assistive technologies when no longer available.

###### Keyboard support

Keyboard users navigate the Progress rope steps and group toggles as they would with a standard list of buttons.

---


## Radios

**Description:** Radios are a proven and effective way to elicit a single choice from a user. They also require careful consideration to produce the best results.

### Design Guidelines

#### Dos And Donts

- Avoid placing more than two radios horizontally, side-by-side.
- Don't mix checkboxes and radios
- Avoid changing the colour of the radio symbol.
- Avoid changing the text styling of the radio label (size, colour etc).
- Do make sure the taxonomy of the options you are offering makes sense as any ambiguity will only slow down or confuse the user.


```tsx
<p className="typography-body-10">
  <span className="text-text-success font-bold">Do</span> - List radios vertically, this makes scanning choices faster
  and easier.
</p>
```


```tsx
<p className="typography-body-10">
  <span className="text-text-danger font-bold">Avoid</span> - Placing more than two radios horizontally, side-by-side.
</p>
```


```tsx
<p className="typography-body-10">
  <span className="text-text-success font-bold">Do</span> - Use a consistent taxonomy
</p>
```


```tsx
<p className="typography-body-10">
  <span className="text-text-danger font-bold">Avoid</span> - Mixing taxonomy categories and sub categories
</p>
```

#### Error State

All form elements have associated error states, see [Error messages](/design-system/wbc/content/guidelines/error-message) in our content guidelines for more.

```tsx
  <RadioGroup 
errorMessage="If there is an error it can go here"    
hintMessage="These are large sized radios"
    label="Select an option"
  validationState="invalid"
      className="col-span-1" 
      size="large"
      radios={[
        { value: "Option 1", label: "Option 1" },
        { value: "Option 2", label: "Option 2" },
        { value: "Option 3", label: "Option 3" },
      ]}
    />
```

#### Hint Text

This variation allows supporting text to be displayed below the selectable item. For use in scenarios where the options are complex and require further information for clarity, using the hint text prevents the labels becoming too long which can effect scanability. Hint text can be used with both Medium and Large sized radios.

```tsx

  <RadioGroup 
  hintMessage="These are large sized radios with hint text"
  label="Select an option"
    className="col-span-1" 
    size="large"
    radios={[
      { value: "Option 1", label: "Option 1", hint: "This is hint text" },
      { value: "Option 2", label: "Option 2", hint: "This is hint text" },
      { value: "Option 3", label: "Option 3", hint: "This is hint text" },
    ]}
  />
```

#### Horizontal Layout

Use this option when you require an inline layout, it's only recommended in very specific circumstances and we suggest never having more than two radio buttons side-by-side.

```tsx
<RadioGroup 
  hintMessage="These are medium sized radios in a horizontal layout"
  label="Select an option"
  orientation="horizontal"
size="medium"
  radios={[
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
  ]}
/>
```

#### Reveal

The radio component has the ability to hide a configurable portion of the options presented to the user. This is useful for when business requirements dictate that long lists of options must be presented to the customer.

- Avoid hiding one or two options under the toggle as this forces the user to interact with the interface for very little value.
- Use data to inform your decisions on which options are surfaced at the screen level.
- Surface the most popular and hide the rest behind the interaction.
- Always express how many items are behind the reveal.
- Reveal can be used with both Medium and Large sized radios.

```tsx
  <RadioGroup 
    hintMessage="These are large sized radios with more to reveal"
    label="Select an option"
      className="col-span-1" 
      size="large"
      showAmount={2}
      radios={[
        { value: "Option 1", label: "Option 1" },
        { value: "Option 2", label: "Option 2" },
        { value: "Option 3", label: "Option 3" },
        { value: "Option 4", label: "Option 4" },
        { value: "Option 5", label: "Option 5" },
        { value: "Option 6", label: "Option 6" },
      ]}
    />
```

#### Sizes

There are two radio sizes, make sure when laying out forms that your radio size and field sizes are aligned.

```tsx
<div className="grid grid-cols-2">
<div><h4 className="typography-body-10 text-text-muted italic mb-3">Medium</h4>
  <RadioGroup 
  hintMessage="These are medium sized radios"
  label="Select an option"
    className="col-span-1" 
    size="medium"
    radios={[
      { value: "Option 1", label: "Option 1" },
      { value: "Option 2", label: "Option 2" },
      { value: "Option 3", label: "Option 3" },
    ]}
  /></div>
<div><h4 className="typography-body-10 text-text-muted italic mb-3">Large</h4>  
<RadioGroup 
  hintMessage="These are large sized radios"
  label="Select an option"
    className="col-span-1" 
    size="large"
    radios={[
      { value: "Option 1", label: "Option 1" },
      { value: "Option 2", label: "Option 2" },
      { value: "Option 3", label: "Option 3" },
    ]}
  />
</div></div>
```

#### User Experience

Radios should be used when asking a user to select only one item from a list. They have a mutually exclusive, toggle functionality. Once a radio list has had an item selected, it cannot go back to having none selected, so if you need the user to acknowledge a non-selection it is best to include an option like ‘None of these’ in the list.

For simple yes/no questions, a possible alternative to a radio list could be a [Button Group](/components/button-group).

###### Default selections

Radios traditionally have one option selected as this mirrors the metaphor of how an analog radio (and indeed digital) radio works. The metaphor appears to have lost its etymological roots today, and there are a couple of competing principles at play when considering whether or not to set a radio active by default:

#### Reasons against

1. By having an option preselected, it appears as though it has been answered, taking on the properties similar to that of placeholder text. When combining this with pre-populated inputs, it only worsens as behavioural assumptions about completion take over. The result is a form which may require clarification or correction at a later date, or give unintended results.
1. By having a choice selected by default, the user is not taking conscious action to confirm their choice. While this isn't critical, in applications with severe legal consequences, it should be considered.

#### Reasons for

1. By using data, we can understand which choices most users will make, therefore expediting form completion by using the most popular answer as a default, increasing the likelihood of faster completion.
1. When integrating high quality data from a database we can pre-populate a form based on what we know about a user, potentially increasing the speed of completion.

While we err on the side of leaving radios unanswered, it is up to each team to decide which path is right for their application.

#### Visual Design

Most operating systems provide default styling for common UI elements such as radio groups. We've overridden this default styling for several reasons:

1. The default styling does not align with our brands look and feel.
1. The default styling often fails accessibility requirements such as colour contrast ratio and hit area.
1. The default styling is proportionately not aligned with the other UI elements.

These issues have been addressed with the styling of the radio groups while making them more accessible, more consistent, more tactile and more visually appealing. These overrides also ensure that the radio components will adapt automatically when building multi-brand applications.

### Accessibility

#### Accessibility Features

- An indicator outline appears around the radio toggle when focused
- Focus moves to the first new radio option when further options are revealed
- The radio toggle and label text is visible in Windows High Contrast Mode (WHCM). The radio toggle ‘dot’ is rendered using CSS borders to ensure visibility in WHCM.

###### Accessibility in the HTML

- The radio uses the useRadioGroup and useRadio hooks from React Aria to handle the accessibility code. Read the [full specifications](https://reactspectrum.blob.core.windows.net/reactspectrum/d77b35e970e5549f66b47a83f07423f5c93b7297/docs/react-aria/useRadioGroup.html) for more information.
- `<button aria-expanded="true|false" >`: Radio with reveal toggle button uses aria-expanded attribute to indicate collapse state.

###### Keyboard support

Navigation pattern is consistent with standard radio inputs; *arrow* keys change the selection.

#### Notes On Accessibility

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility) – Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Operable

The Design System radios have a large hit area to aid those with low vision and those challenged with motor skills.

###### Understandable

*Radios with reveal:* With regards to the reveal, due to accessibility challenges around focus, announcing with context, and navigation, the toggle should disappear on click.

To soften the impact of showing a long list, users are “forewarned” how many items are about to be revealed within the toggle, eg Show 12 more items. This is an important accessibility consideration that needs to be considered during design and implementation.

---


## Repeater

**Description:** Repeaters are user controlled patterns for repeating sets or single UI elements, usually inputs.

### Design Guidelines

#### Dos And Donts

- For accessibility reasons, the “Add Circle” icon must be used

#### Repeater

###### Default

Use the default Repeater in situations where the user may need to repeat a single component or field, e.g. for multiple phone number entries.

```tsx
() => {
  const { register, watch, setValue } = useForm<Inputs>({
    defaultValues: { items: [{ label: '' }] },
  });
  const items = watch('items');

  const handleAdd = useCallback(() => {
    setValue('items', [...items, { label: '' }]);
  }, [items, setValue]);

  return (
    <form>
      <Repeater onAdd={handleAdd}>
        {items.map((item, index) => (
          <RepeaterItem
            key={index}
            title={{ primary: item.primary, secondary: item.secondary, tertiary: item.tertiary }}
            onRemove={() => {
              setValue('items', [...items.slice(0, index), ...items.slice(index + 1)]);
            }}
          >
            <Field label="Label">
              <Input {...register(`items.${index}.label`)} />
            </Field>
          </RepeaterItem>
        ))}
      </Repeater>
    </form>
  );
};
```

###### With separator

Use the Repeater with separator when the user may need to repeat a set of components or fields, e.g. for multiple sets of credit card or account details.

```tsx
() => {
  const { register, watch, setValue } = useForm<Inputs>({
    defaultValues: { items: [{ label: '', label2: '' }] },
  });
  const items = watch('items');

  const handleAdd = useCallback(() => {
    setValue('items', [...items, { label: '', label2: '' }]);
  }, [items, setValue]);

  return (
    <form>
      <Repeater separator onAdd={handleAdd}>
        {items.map((item, index) => (
          <RepeaterItem
            key={index}
            onRemove={() => {
              setValue('items', [...items.slice(0, index), ...items.slice(index + 1)]);
            }}
          >
            <div className="flex flex-col gap-4">
              <Field label="Label 1">
                <Input {...register(`items.${index}.label`)} />
              </Field>
              <Field label="Label 2">
                <Input {...register(`items.${index}.label2`)} />
              </Field>
            </div>
          </RepeaterItem>
        ))}
      </Repeater>
    </form>
  );
};
```

#### Usage Examples

```tsx
() => {
  const { register, watch, setValue } = useForm({
    defaultValues: { items: [{ mobileNumber: '' }] },
  });
  const items = watch('items');

  const handleAdd = useCallback(() => {
    setValue('items', [...items, { mobileNumber: '' }]);
  }, [items, setValue]);

  return (
    <form>
      <Repeater onAdd={handleAdd}>
        {items.map((item, index) => (
          <RepeaterItem
            key={index}
            onRemove={() => {
              setValue('items', [...items.slice(0, index), ...items.slice(index + 1)]);
            }}
          >
            <Field label="Mobile number">
              <Input {...register(`items.${index}.mobileNumber`)} width={10} />
            </Field>
          </RepeaterItem>
        ))}
      </Repeater>
    </form>
  );
};
```

```tsx
() => {
  const { register, watch, setValue } = useForm({
    defaultValues: { items: [{ bsb: '', accountNumber: '' }] },
  });
  const items = watch('items');

  const handleAdd = useCallback(() => {
    setValue('items', [...items, { bsb: '', accountNumber: '' }]);
  }, [items, setValue]);

  return (
    <form>
      <Repeater separator onAdd={handleAdd}>
        {items.map((item, index) => (
          <RepeaterItem
            key={index}
            onRemove={() => {
              setValue('items', [...items.slice(0, index), ...items.slice(index + 1)]);
            }}
          >
            <div className="flex flex-col gap-4">
              <Field label="BSB">
                <Input {...register(`items.${index}.bsb`)} width={10} />
              </Field>
              <Field label="Account number" hintMessage="Account number should have 10 digits">
                <Input {...register(`items.${index}.accountNumber`)} width={18} />
              </Field>
            </div>
          </RepeaterItem>
        ))}
      </Repeater>
    </form>
  );
};
```

#### User Experience

The text “Add another item” is configurable but must be used with the “Add Circle” icon in order to be discoverable and appear as an affordance.

A remove button appears once another instance has been added.

The “Add another item” button must always be left aligned in order to maximise discoverability.

---


## Selects

**Description:** Use selects, also known as dropdown menus or dropdown lists, when users are required to choose one option from a list of predefined choices.

### Design Guidelines

#### Dos And Donts

- Do use any of the predefined input sizes but make sure to use the corresponding button size if required.
- Do keep labels in close proximity above the input field.

#### Error State

All form elements have associated error states, see [Error messages](/content/guidelines/error-message) in our content guidelines for more.

```tsx
<Field label="Select an option" hintMessage="This is a select with labels" errorMessage="If there is an error it can go here">
        <Select invalid>
          <option value="option-1">Option 1</option>
          <option value="option-2">Option 2</option>
          <option value="option-3">Option 3</option>
          <option value="option-4">Option 4</option>
        </Select>
      </Field>
```

#### Fixed Widths

Use fix width selects to help indicate the length of the data required. For example, if you are asking for an area code use a select with a width of 3 (i.e. 3 characters), this type of affordance helps with scanning and supports quick and easy form completion. The select widths are calculated to fit the respective number capital W's - the widest character.

```tsx
<div className="flex flex-col gap-2">

<Select size="medium" width={1}>
  <React.Fragment key=".0">
    <option value="W">
      W
    </option>
  </React.Fragment>
</Select>

<Select size="medium" width={2}>
  <React.Fragment key=".0">
    <option value="WW">
      WW
    </option>
  </React.Fragment>
</Select>

<Select size="medium" width={3}>
  <React.Fragment key=".0">
    <option value="WWW">
      WWW
    </option>
  </React.Fragment>
</Select>

<Select size="medium" width={4}>
  <React.Fragment key=".0">
    <option value="WWWW">
      WWWW
    </option>
  </React.Fragment>
</Select>

<Select size="medium" width={5}>
  <React.Fragment key=".0">
    <option value="WWWWW">
      WWWWW
    </option>
  </React.Fragment>
</Select>

<Select size="medium" width={6}>
  <React.Fragment key=".0">
    <option value="WWWWWW">
      WWWWWW
    </option>
  </React.Fragment>
</Select>

<Select size="medium" width={7}>
  <React.Fragment key=".0">
    <option value="WWWWWWW">
      WWWWWWW
    </option>
  </React.Fragment>
</Select>

<Select size="medium" width={8}>
  <React.Fragment key=".0">
    <option value="WWWWWWWW">
      WWWWWWWW
    </option>
  </React.Fragment>
</Select>

<Select size="medium" width={9}>
  <React.Fragment key=".0">
    <option value="WWWWWWWWW">
      WWWWWWWWW
    </option>
  </React.Fragment>
</Select>

<Select size="medium" width={10}>
  <React.Fragment key=".0">
    <option value="WWWWWWWWWW">
      WWWWWWWWWW
    </option>
  </React.Fragment>
</Select>

<Select size="medium" width={20}>
  <React.Fragment key=".0">
    <option value="WWWWWWWWWWWWWWWWWWWW">
      WWWWWWWWWWWWWWWWWWWW
    </option>
  </React.Fragment>
</Select>


<Select size="medium" width={30}>
  <React.Fragment key=".0">
    <option value="WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW">
      WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    </option>
  </React.Fragment>
</Select>

<Select size="medium" width="full">
  <React.Fragment key=".0">
    <option value="WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW">
      WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    </option>
  </React.Fragment>
</Select>

</div>
```

#### Select With Labels

All inputs require labels for usability and accessibility.

```tsx
<Field label="Select an option" hintMessage="This is a select with labels">
        <Select >
          <option value="option-1">Option 1</option>
          <option value="option-2">Option 2</option>
          <option value="option-3">Option 3</option>
          <option value="option-4">Option 4</option>
        </Select>
      </Field>
```

#### Sizes

Selects come in four different sizes (heights) with the default being Medium 36px. Ensure when you are designing forms that you alway use the same size across element types.

```tsx
() => {
  const DEFAULT_OPTIONS = ['1', '2', '3'] as const;
  const SIZES = ['small', 'medium', 'large', 'xlarge'] as const;
  return (
    <div className="flex flex-col gap-4">
      {SIZES.map(size => (
        <div key={size}>
          <ComponentTitle>{size}</ComponentTitle>
          <Select width="20" size={size}>
            <option value="">Select</option>
            {DEFAULT_OPTIONS.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
      ))}
    </div>
  );
};
```

#### User Experience

In order to be most effective, form inputs must focus on usability and accessibility above all else. Like every component in this system, our design decisions are driven by what will provide the most robust solution across all scenarios.

###### Borders

We use a solid border as it is simple and universally understood. Using single lines as an input 'field' undermines the integrity of the affordance making it difficult to recognise. These fields can be easily confused with horizontal rules, that are often used in design to denote a break in content or a new section. Replacing the border also affects those with low vision (see the Text Inputs accessibility tab for more).

###### Placeholder text

We don't use placeholder text for a few reasons. Placeholder text needs to be visually very different from the text that gets entered into the field by the user, otherwise it appears as though the field has already been completed, causing the user to unintentionally skip it. Finding a colour that is different enough from ‘entered text’ colour, but still meets accessibility contrast requirements is incredibly difficult.

As placeholder text disappears once the field is in focus, it also places increased cognitive load on the user, requiring them to recall the instructions once they've gone.

###### Labels

We don't use floating labels. Floating labels often start off as placeholder text so inherit some of those issues described above. Additionally floating labels come with restrictions on label length (when a label is longer than the input field), hint text location challenges, and consistency with error validation.

###### Hint text and error messages

We do place hint text and errors messages directly under the input label for context. This approach also guarantees that on mobile devices, the hint text or error message remains visible and is not hidden by activated select boxes or keypads.

###### Layout

These components are designed to be stacked and do not work so well in column based executions as long wrapping labels, and hint text length can create misalignment when fields are horizontally laid out.

#### Visual Design

Most operating systems provide default styling for common UI elements such as input fields. We've overridden this default styling for several reasons:

1. The default styling does not align with our brands look and feel.
1. The default styling often fails accessibility requirements such as colour contrast ratio for borders and placeholder text.
1. The default styling is proportionately not aligned with the other UI elements.
1. The default styling often looks dated and poorly rendered.

We’ve addressed all these issues in the styling of our input fields making them simpler, more accessible, more consistent and more functional.

We’ve also provided several sizes (heights) to accommodate different layout scenarios and styled the tab focus state to better align with the brand.

These overrides ensure that all input field components will adapt automatically when building multi-brand applications.

### Accessibility

#### Accessibility Features

- An indicator outline appears around the input when focused via a keyboard or assistive technology
- The Text input, Select and Textarea shapes are visible in Windows High Contrast Mode (WHCM). The Select dropdown icon is not visible in WHCM, however the recommended default option text of ‘Select’ provides a sufficient affordance.

#### Notes On Accessibility

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility) – Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Perceivable

**Selects** - These fields have been carefully designed and tested to achieve optimal contrast and border line weight. This is crucial for users to quickly identify the element as a Select, providing significant assistance to individuals with low vision and those less familiar with prevailing web design trends. The border colour was modified from the original "Border" colour to a darker version named "Border Dark," to ensure ongoing compliance with WCAG colour contrast guidelines.

**Labels** *-* Input labels should be placed above the input field. This helps promote scanning, readability and faster progress.

**Hint text** *-* Hint text should be placed directly under the input label for context. This also ensures on mobile the hint text is visible ‘on canvas’ and is not obscured by any select boxes or keypads when activated.

###### Robust

A label and a form control should be associated with each other either implicitly or explicitly. Web browsers provide the label as a larger clickable area, for example, to select or activate the control. It also ensures that assistive technology can refer to the correct label when presenting a form control.

---


## Selector

**Description:** A Selector is essentially a large stylised radio, checkbox or link button that can be configured in many different ways for different uses.

### Design Guidelines

#### Error State

All form elements have associated error states, see [Error messages](/content/guidelines/error-message) in our content guidelines for more.

```tsx
<Grid>
  <GridItem span={{ initial: 12, sm: 6 }}>
    <Selector label="Select an option" description="This is a select with labels" errorMessage="If there is an error it can go here" type="radio" validationState="invalid">
      <SelectorRadio key="1" value="1">
        <SelectorLabel>Option 1</SelectorLabel>
        <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">This selector has the same fucntionality as radios</SelectorHint>
      </Selector.Radio>
      <SelectorRadio key="2" value="2">
        <SelectorLabel>Option 2</SelectorLabel>
        <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">This selector has the same fucntionality as radios</SelectorHint>
      </Selector.Radio>
      <SelectorRadio key="3" value="3">
        <SelectorLabel>Option 3</SelectorLabel>
        <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">This selector has the same fucntionality as radios</SelectorHint>
      </Selector.Radio>
    </Selector>
  </GridItem>
</Grid>
```

#### Selector Design

Any of the variations described above can come in either a simple or complex layouts depending on the content required to be displayed.

###### Simple layout

The minimum content requirement is a label.

```tsx
() => {
  const [value, setValue] = useState<string>('2');
  return (
    <Grid>
      <GridItem span={{ initial: 12, sm: 6 }}>
        <Selector type="radio" value={value} onChange={value => setValue(value)}>
          <SelectorRadio key="1" value="1">
            <SelectorLabel>Label</SelectorLabel>
          </Selector.Radio>
          <SelectorRadio key="2" value="2">
            <SelectorLabel>Label</SelectorLabel>
          </Selector.Radio>
          <SelectorRadio key="3" value="3">
            <SelectorLabel>Label</SelectorLabel>
          </Selector.Radio>
        </Selector>
      </GridItem> 
    </Grid>
  );
};
```

###### Complex layout

Some experiences may require more detail such as monetary values or product names. This can be accommodated using hint text or a secondary label. Icons and pictograms can also be used to help convey meaning. They are defaulted to 24px however can be made larger or smaller.

Any combination of these elements may be used as long as they are used consistently throughout a set, and should always at least have a label.

```tsx
<Grid>
  <GridItem span={{ initial: 12, sm: 6 }}>
    <Selector type="radio">
      <SelectorRadio
        key="1"
        checkIcon="arrow"
        value="1"
        before={
          <SelectorAdornment align="top">
            <SettingsIcon color="hero" />
          </SelectorAdornment>
        }
      >
        <div className="flex flex-row justify-between">
          <SelectorLabel>Label</SelectorLabel>
          <SelectorLabel className="max-sm:typography-body-9 sm:typography-body-8 font-normal">
            $10,000.00
          </SelectorLabel>
        </div>
        <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">Some supporting hint text can go here</SelectorHint>
      </Selector.Radio>
      <SelectorRadio
        key="2"
        checkIcon="arrow"
        value="2"
        before={
          <SelectorAdornment align="top">
            <WatchIcon color="hero" />
          </SelectorAdornment>
        }
      >
        <div className="flex flex-row justify-between">
          <SelectorLabel>Label</SelectorLabel>
          <SelectorLabel className="max-sm:typography-body-9 sm:typography-body-8 font-normal">
            $10,000.00
          </SelectorLabel>
        </div>        
        <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">Some supporting hint text can go here</SelectorHint>
      </Selector.Radio>
      <SelectorRadio
        key="3"
        checkIcon="arrow"
        value="3"
        before={
          <SelectorAdornment align="top">
            <EmailIcon color="hero"/>
          </SelectorAdornment>
        }
      >
        <div className="flex flex-row justify-between">
          <SelectorLabel>Label</SelectorLabel>
          <SelectorLabel className="max-sm:typography-body-9 sm:typography-body-8 font-normal">
            $10,000.00
          </SelectorLabel>
        </div>
        <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">Some supporting hint text can go here</SelectorHint>
      </Selector.Radio>
    </Selector>
  </GridItem>
</Grid>
```

#### Selector Functionality

###### Button select

The Button select variation, or 'Select and go' functionality is used to direct the user to a new destination or to present them with something new (eg a new question). The hover state includes a micro-interaction of the chevron, as well as an increase in border thickness.

```tsx
<Grid>
  <GridItem span={{ initial: 12, sm: 6 }}>
    <Selector type="radio">
      <SelectorRadio key="1" checkIcon="arrow" value="1">
        <SelectorLabel>Button select</SelectorLabel>
        <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">Some supporting hint text can go here</SelectorHint>
      </Selector.Radio>
      <SelectorRadio key="2" checkIcon="arrow" value="2">
        <SelectorLabel>Button select</SelectorLabel>
        <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">Some supporting hint text can go here</SelectorHint>
      </Selector.Radio>
      <SelectorRadio key="3" checkIcon="arrow" value="3">
        <SelectorLabel>Button select</SelectorLabel>
        <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">Some supporting hint text can go here</SelectorHint>
      </Selector.Radio>
    </Selector>
  </GridItem>
</Grid>
```

###### Single select

The single-select variation mimics the functionality of radio buttons, allowing only one item from the set to be selected. When an item is selected, the border increases in thickness with a tick icon used for further aid in visual confirmation.

```tsx
<Grid>
  <GridItem span={{ initial: 12, sm: 6 }}>
    <Selector type="radio">
      <SelectorRadio key="1" value="1">
        <SelectorLabel>Single-select</SelectorLabel>
        <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">Some supporting hint text can go here</SelectorHint>
      </Selector.Radio>
      <SelectorRadio key="2" value="2">
        <SelectorLabel>Single-select</SelectorLabel>
        <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">Some supporting hint text can go here</SelectorHint>
      </Selector.Radio>
      <SelectorRadio key="3" value="3">
        <SelectorLabel>Single-select</SelectorLabel>
        <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">Some supporting hint text can go here</SelectorHint>
      </Selector.Radio>
    </Selector>
  </GridItem>
</Grid>
```

###### Multi-select

The multi-select variation mimics the functionality of checkboxes, allowing multiple items from the set to be selected. When an Griditem is selected, the border increases in thickness with a tick icon used for further aid in visual confirmation.

```tsx
() => {
  const [selectedValues, setSelectedValues] = useState<string[]>(['2', '3']);
  return (
    <Grid>
      <GridItem span={{ initial: 12, sm: 6 }}>
        <Selector
          type="checkbox"
          value={selectedValues}
          onChange={value => {
            setSelectedValues(value);
          }}
        >
          <SelectorCheckbox key="1" value="1">
            <SelectorLabel>Multi-select</SelectorLabel>
            <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">Some supporting hint text can go here</SelectorHint>
          </SelectorCheckbox>
          <SelectorCheckbox key="2" value="2">
            <SelectorLabel>Multi-select</SelectorLabel>
            <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">Some supporting hint text can go here</SelectorHint>
          </SelectorCheckbox>
          <SelectorCheckbox key="3" value="3">
            <SelectorLabel>Multi-select</SelectorLabel>
            <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">Some supporting hint text can go here</SelectorHint>
          </SelectorCheckbox>
        </Selector>
      </GridItem>
    </Grid>
  );
};
```

#### Selector With Labels

Although it does not appear as a typical form input, the Selector component requires labels as all inputs do for usability and accessibility.

```tsx
<Grid>
  <GridItem span={{ initial: 12, sm: 6 }}>
    <Selector label="Select an option" description="This is a select with labels" type="radio" >
      <SelectorRadio key="1" value="1">
        <SelectorLabel>Option 1</SelectorLabel>
        <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">This is hint text for the selector item</SelectorHint>
      </Selector.Radio>
      <SelectorRadio key="2" value="2">
        <SelectorLabel>Option 2</SelectorLabel>
        <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">This is hint text for the selector item</SelectorHint>
      </Selector.Radio>
      <SelectorRadio key="3" value="3">
        <SelectorLabel>Option 3</SelectorLabel>
        <SelectorHint className="max-sm:typography-body-10 sm:typography-body-9">This is hint text for the selector item</SelectorHint>
      </Selector.Radio>
    </Selector>
  </GridItem>
</Grid>
```

#### User Experience

The Selector is a component for helping users make a choice about a product, usually at the acquisition stage, or at the service end as the large container helps distinguish it from a form control (despite it being a big radio or checkbox!).

In order to be accessible, [radios](/components/radio-group) and [checkboxes](/components/checkbox-group) need a fieldset legend—essentially a descriptive label above the choices that gives context to the options presented which is also beneficial from a usability standpoint.

As the Selector can be used as a radio or checkbox, we strongly recommend making that distinction in the label. Eg, “Select one account below” or “Select all accounts below that apply”.

Note, the label is not part of the Selector and will have to be designed and integrated.

When using hint text, bear in mind how much copy you use as this impacts the way the selector appears on mobile. Hint text should aid in the decision or provide greater context rather than tell a story.

#### Visual Design

The selector border radius needs to be accessible and so uses the Border Dark colour which meets WCAG’s contrast ratio requirements. When selected, the border thickens to 3px as well as taking on the Hero colour to make it clear it has been selected.

The labels inside and hint text follow the established sizing and weight conventions we use in all our form controls.

While [icons](/foundation/icon) and [pictograms](/foundation/pictogram) can be used, be careful not to rely on them to convey the primary meaning of the content. They are available to be used as a supplementary visual cue. Be aware with pictograms that at small sizes they lose some of their detail and in turn their effectiveness as a communication device.

When the selector is used with the chevron, on desktop devices it will produce a micro-interaction on hover by shifting 10px to the right. This helps inform users that when selected, they will navigate to another page or screen, matching the established convention in all Westpac Group brands.

### Accessibility

#### Accessibility Features

- An indicator outline appears around the Selector option when focused
- Selector behaves as radio, checkbox, button or link depending on requirements; implementation of each has been considered to provide an optimal experience for assistive technology users
- Optionally use visually hidden text within hint text (e.g. When announcing a bank account: “*Bank account:* 123-456 123456”)
- The Selector option text, icons and pictograms are visible in Windows High Contrast Mode (WHCM). The Selector option tick is rendered using CSS borders to ensure visibility in WHCM.

###### Accessibility in the HTML

- The button and link selector options use the useField hook from React Aria to handle the accessibility code. Read the [full specifications](https://react-spectrum.adobe.com/react-aria/useField.html) for more information.
- The radio selector uses the useRadioGroup and useRadio hooks from React Aria to handle the accessibility code. Read the [full specifications](https://reactspectrum.blob.core.windows.net/reactspectrum/d77b35e970e5549f66b47a83f07423f5c93b7297/docs/react-aria/useRadioGroup.html) for more information.
- · The checkbox selector option uses the useCheckboxGroup and useCheckboxGroupItem hooks from React Aria to handle the accessibility code. Read the [full specifications](https://reactspectrum.blob.core.windows.net/reactspectrum/d77b35e970e5549f66b47a83f07423f5c93b7297/docs/react-aria/useCheckboxGroup.html) for more information.
- `<svg aria-hidden="true">`: Indicator check/tick and next icons are hidden from assistive technologies; any selected/checked state is provided by the input
- `<button aria-pressed="false|true">`: Button Selector: state is provided with aria-pressed attribute. Note: Button (and Link) Selector hint text is not associated as with Checkbox and Radio Selector; hint text is announced as standard button (or link) text.
- `<svg aria-hidden="true">`: Hides icon or pictogram SVGs from assistive technologies; they are visual embellishment

###### Keyboard support

- Navigation pattern is consistent with standard checkbox, radio, button or link inputs (depending on Selector type)
- Checkbox: *tab* key navigates the options, *space* key toggles the selection
- Radio: *arrow* keys change the selection
- Button: *tab* key navigates the options, *space* or *enter* key toggles the selection
- Link: *tab* key navigates the options, *enter* key triggers the link

#### Notes On Accessibility

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility) – Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Operable

Selector options have a large hit area to aid those with low vision and those challenged with motor skills.

---


## Switches

**Description:** Switches are a toggle element with a binary value. They are an effective way to quickly define settings or preferences at an account or system level.

### Design Guidelines

#### Block

Use block-level switches in small break points to align the label and element to either side of the screen. This behaviour can be set up to work responsively, and change depending on breakpoint. Use the 'Demo' button to see this component working responsively.

```tsx
<div className="flex flex-col">
  <Switch block label="eStatements" />
  <Switch block label="Quick balance" />
</div>
```

#### Dos And Donts

- Avoid changing the toggle switch styles (colour, border, size etc).
- Do use the corresponding size when using switches with form inputs etc.
- Don't use switches to answer Yes/No questions - they should reflect On/Off.


```tsx
<p className="typography-body-10"><span className="text-text-success font-bold">Do</span> - Use switches to reflect On or Off.</p>
```


```tsx
<p className="typography-body-10"><span className="text-text-danger font-bold">Avoid</span> - Using switches to indicate a Yes or No answer to a question.</p>
```

#### Responsive Breakpoint Control

As well as determining if the switch is a Block switch, the switch's size can also change based on breakpoint. Use the 'Demo' button to see this component working responsively.

```tsx
<div className="flex flex-col">
  <em className="typography-body-10 mb-2">Medium size switch becomes Extra large from the MD breakpoint</em>
  <Switch block size={{ initial: 'medium', md: 'xlarge' }} label="Medium → Extra large" />

  <hr className="border-border-muted-soft my-4" />
  <em className="typography-body-10 mb-2">Extra large size switch becomes small from the SM breakpoint</em>
  <Switch block size={{ initial: 'xlarge', sm: 'small' }} label="Extra large → Small" />

  <hr className="border-border-muted-soft my-4" />
  <em className="typography-body-10 mb-2">
    Small size switch becomes medium at the SM breakpoint, large at the MD breakpoint and Extra large at the LG
    breakpoint
  </em>
  <Switch block size={{ initial: 'small', sm: 'medium', md: 'large', lg: 'xlarge' }} label="Small → Medium → Large → Extra large" />
</div>
```

#### Sizes

We have one simple switch style that is available in four sizes (heights), with the default being Medium 36px. These four sizes align with other form element sizes.

```tsx
<div className="grid gap-6">
  <Switch size="small" label="Small 30px" />
  <Switch label="Medium 36px" />
  <Switch size="large" label="Large 42px" />
  <Switch size="xlarge" label="X Large 48px" />
</div>
```

#### User Experience

Switches are used primarily as toggles for settings and are a strong metaphor for light switches, essentially they a simple Boolean, either on or off. As switches usually relate to task based interactions, the switch animation should be relatively fast. Be careful how you word the labels that accompany a switch, the label needs to be answered as On or Off, they do not reflect Yes or No. If you need an answer of Yes or No, you could use a [button group](/components/button-groups).

#### Visual Design

Toggle switches inherit many of the button styles, they are designed to be subtle and understated so as not to detract from the content. They also come in multiple sizes (heights) and work on any background light or dark.

### Accessibility

#### Accessibility Features

- The switch behaves as a checkbox input for assistive technology users. Leveraging standard HTML form inputs to maintain state and store data provides optimal support in assistive technologies.
- An indicator outline appears around the switch toggle when focused
- The switch toggle and label text is visible in Windows High Contrast Mode (WHCM). The enabled (‘on’) state appears as a simple filled switch toggle for WHCM users.

###### Accessibility in the HTML

- `<input type="checkbox" id="{ID}">`: Switch is defined as a (hidden) checkbox *input* and must have a unique *id* value. [React component: *id* is auto-generated]
- `<label for="{ID}">`: Checkbox *input* is wrapped with a *label* element and uses explicit association (connected to the input using a *for* attribute) for optimal support in assistive technologies. [React component: *for* is auto-generated]

###### Keyboard support

- Navigation pattern is consistent with standard checkbox inputs; *tab* key navigates, *space* key toggles the selection

---


## Symbols

**Description:** These symbols and are commonly used in Westpac interfaces. They are implemented as scalable vector graphics (SVGs) which ensures the highest quality rendering on all devices. It also allows styling using code and complies with WGAG AA accessibility requirements.

### Design Guidelines

#### Dos And Donts

- Do ensure that you are using the latest version of the symbol. If the symbol in the Design System is not the latest version please contact us to let us know.
- Avoid changing the symbols (colour, shape etc).
- Avoid using png or jpeg versions of these symbols as quality may be compromised when displayed on high resolution displays etc.

#### User Experience

The Symbols library is a collection of commonly used brand identity logos and logotypes (logos, badges, buttons etc) from 3rd party vendors. They have a wide range of uses from e-commerce, marketing, social media, and communications.

#### Visual Design

Each symbol in the library has been carefully crafted (where possible aligning with the pixel grid), optimised and converted to SVG format, which:

- Ensures that the graphic can be resized to any dimension with no loss of quality
- Ensures the highest quality rendering on all devices
- Allows us to style the symbols using code
- Complies with AA accessibility requirements

These symbols are updated when the 3rd party refreshes their brand or adds more sub brands.

### Accessibility

#### Accessibility Features

- A `<svg>` element labeled with a description identifies the Symbol
- The Symbol shape is visible in Windows High Contrast Mode
- When using alongside descriptive visual text ensure `aria-hidden="true"` is used to hide the Symbol from assistive technologies, otherwise users will receive duplicate descriptions

###### Accessibility in the HTML

- `<svg aria-label="{DESCRIPTION}">`: Provides a label that describes the Symbol
- `<svg role="img" focusable="false">`: Prevents the Symbol SVG element from being traversed by browsers that map the SVG to the ‘group’ role and from unnecessarily receiving focus in Internet Explorer (IE)

---


## Tables

**Description:** Tables are a way to organise small to large data sets. As financial products and services are often complex, they are effective at communicating and comparing values.

### Design Guidelines

#### Basic Table

The basic table has a simple table structure without borders, that can be used when stretching edge to edge within a container.

```tsx
<div>
  <Table>
    <TableHeader>
      <TableHeaderRow>
        <TableHeaderCell>Column 1</TableHeaderCell>
        <TableHeaderCell>Column 2</TableHeaderCell>
        <TableHeaderCell>Column 3</TableHeaderCell>
      </TableHeaderRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Cell 1</TableCell>
        <TableCell>Cell 7</TableCell>
        <TableCell>Cell 13</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 2</TableCell>
        <TableCell>Cell 8</TableCell>
        <TableCell>Cell 14</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 3</TableCell>
        <TableCell>Cell 9</TableCell>
        <TableCell>Cell 15</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 4</TableCell>
        <TableCell>Cell 10</TableCell>
        <TableCell>Cell 16</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 5</TableCell>
        <TableCell>Cell 11</TableCell>
        <TableCell>Cell 17</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 6</TableCell>
        <TableCell>Cell 12</TableCell>
        <TableCell>Cell 18</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

#### Bordered Striped Table

You can combine multiple classes to configure your table style.

```tsx
<div>
  <Table bordered striped>
    <TableHeader>
      <TableHeaderRow>
        <TableHeaderCell>Column 1</TableHeaderCell>
        <TableHeaderCell>Column 2</TableHeaderCell>
        <TableHeaderCell>Column 3</TableHeaderCell>
      </TableHeaderRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Cell 1</TableCell>
        <TableCell>Cell 7</TableCell>
        <TableCell>Cell 13</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 2</TableCell>
        <TableCell>Cell 8</TableCell>
        <TableCell>Cell 14</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 3</TableCell>
        <TableCell>Cell 9</TableCell>
        <TableCell>Cell 15</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 4</TableCell>
        <TableCell>Cell 10</TableCell>
        <TableCell>Cell 16</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 5</TableCell>
        <TableCell>Cell 11</TableCell>
        <TableCell>Cell 17</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 6</TableCell>
        <TableCell>Cell 12</TableCell>
        <TableCell>Cell 18</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

#### Bordered Table

The bordered table outlines each cell, use a bordered table if displaying lots of complex data e.g. spreadsheet style.

```tsx
<div>
  <Table bordered>
    <TableHeader>
      <TableHeaderRow>
        <TableHeaderCell>Column 1</TableHeaderCell>
        <TableHeaderCell>Column 2</TableHeaderCell>
        <TableHeaderCell>Column 3</TableHeaderCell>
      </TableHeaderRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Cell 1</TableCell>
        <TableCell>Cell 7</TableCell>
        <TableCell>Cell 13</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 2</TableCell>
        <TableCell>Cell 8</TableCell>
        <TableCell>Cell 14</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 3</TableCell>
        <TableCell>Cell 9</TableCell>
        <TableCell>Cell 15</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 4</TableCell>
        <TableCell>Cell 10</TableCell>
        <TableCell>Cell 16</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 5</TableCell>
        <TableCell>Cell 11</TableCell>
        <TableCell>Cell 17</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 6</TableCell>
        <TableCell>Cell 12</TableCell>
        <TableCell>Cell 18</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

#### Dos And Donts

- Avoid changing the table styles (border, colour, size etc).
- Avoid using tables for content that is not tabular data.

#### Striped Row Table

The striped row table has alternate rows styled to help with content scanning.

```tsx
<div>
  <Table striped>
    <TableHeader>
      <TableHeaderRow>
        <TableHeaderCell>Column 1</TableHeaderCell>
        <TableHeaderCell>Column 2</TableHeaderCell>
        <TableHeaderCell>Column 3</TableHeaderCell>
      </TableHeaderRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Cell 1</TableCell>
        <TableCell>Cell 7</TableCell>
        <TableCell>Cell 13</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 2</TableCell>
        <TableCell>Cell 8</TableCell>
        <TableCell>Cell 14</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 3</TableCell>
        <TableCell>Cell 9</TableCell>
        <TableCell>Cell 15</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 4</TableCell>
        <TableCell>Cell 10</TableCell>
        <TableCell>Cell 16</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 5</TableCell>
        <TableCell>Cell 11</TableCell>
        <TableCell>Cell 17</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 6</TableCell>
        <TableCell>Cell 12</TableCell>
        <TableCell>Cell 18</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
```

#### User Experience

There are several versions of tables from basic to striped row to bordered. Basic tables are designed to display simple data sets with 2 or 3 columns. Bordered and striped row tables are designed to display more complex data sets with multiple columns and text heavy values. Using borders and alternating tints in the rows aids legibility by clearly separating the data and grouping it by row.

Avoid having large amounts of content in an individual cell, if you are finding your content cannot easily fit in to the table cells, revisit your data and content, and look for other ways to communicate or solve your problem.

If required, you can use a table component within a [Panel](/components/panel).

###### Responsive tables

Working in financial services means that tables are frequently encountered in our content. Usually to display rows of numeric data, rates, transactions etc. When building responsively we need to ensure these tables are legible in smaller devices where screen space is limited.

There are a few ways to approach this:

1. Shrinking the tables to fit a small screen and relying on people to pinch and zoom.
1. Re-structuring/stacking the table cells at the small views.
1. Allowing the table to scroll horizontally within the viewport.

**Option 1:** Shrinking the table is a bit lazy, and not very effective.

**Option 2:** Re-stacking table cells can work, but defining how the table reconfigures is wholly dependant on each specific use case and the content being displayed. Which means it’s not possible to provide a solution within the Design System that will cater for every type of content scenario required.

**Option 3:** Allowing the table to scroll horizontally is the most widely used solution and is also very effective and able to be applied in most situations. This is the solution that is used in the GEL Design System for responsive tables. Even with this solution, it still requires tables to be relatively short. In general tables on mobile are difficult.

We often have no choice in using tables, they need to be used to display tabular data, however we would recommend that tables are not used unless they are necessary. For example do not use a table to layout content, instead, stack the content under headings, this will create a more flexible layout.

#### Comparison functionality – to table or not to table

One of the functions that is critical to online research is comparison. Before the prevalence of mobile devices massively increased, the standard way to compare products was a comparison table. It is often a very large, data-heavy experience that allows the user to compare the same aspects of multiple products across rows. This obviously becomes problematic when trying to recreate the same experience on small screens, where you can only see one or two products at a time – making it very difficult to compare.

As we know, the device usage ratio from desktop to mobile has swapped – design is now mobile first, sometimes mobile only. So, the standard approach of a large format comparison table has to change as well. We still need to offer the functionality of comparison, but we need to be more creative in how we achieve that. Consider using other forms of filtering to narrow down a user’s product choices before they compare the full features of the products.

#### Visual Design

As with most of the UI elements Tables have been designed to be as unobtrusive and subtle as possible so as not to detract from the content. Hero colour is used in the table header to clearly separate the column headers from the data and to add some branding into what could be dry, text heavy screens.

### Accessibility

#### Accessibility Features

- Tables with many columns scroll horizontally within a wrapping block element in order to mitigate horizontal document scrolling
- The Table shape, row/cell highlights and text content is visible in Windows High Contrast Mode

###### Accessibility in the HTML

- `<th scope="{VALUE}">`: Add attribute scope="col", scope="row", scope="colgroup" or scope="rowgroup" if required to inform assistive technologies the header cell is a header for a column, row, or group of columns or rows

---


## Tabs

**Description:** Tabs are grouped sets of hide/show panels. Use them to group and simplify large amounts of content such as product information.

### Design Guidelines

#### Dos And Donts

- Avoid using too much content and consider smaller viewports when designing responsive web apps.
- Avoid changing the styles of Tabs and Accordions (border, colour, size etc )
- Do use Tabs and Accordions on any background (light or dark).
- Avoid making Tab and Accordion labels too long. Although they will wrap the interface will become cluttered very quickly.

#### Tabset

**Default tabs:** See Visual design for the usage recommendations for the default style. Tabs can appear both ranged to the right, or justified.

```tsx
<Tabs>
  <TabsPanel  title="Mole" key="mole">
The Mole had been working very hard all the morning, spring-cleaning his little home. First with brooms, then with dusters; then on ladders and steps and chairs, with a brush and a pail of whitewash; till he had dust in his throat and eyes, and splashes of whitewash all over his black fur, and an aching back and weary arms. Spring was moving in the air above and in the earth below and around him, penetrating even his dark and lowly little house with its spirit of divine discontent and longing. It was small wonder, then, that he suddenly flung down his brush on the floor, said ‘Bother!’ and ‘O blow!’ and also ‘Hang spring-cleaning!’ and bolted out of the house without even waiting to put on his coat.
  </Tab>
  <TabsPanel  title="Rat" key="rat">
The Rat said nothing, but stooped and unfastened a rope and hauled on it; then lightly stepped into a little boat which the Mole had not observed. It was painted blue outside and white within, and was just the size for two animals; and the Mole’s whole heart went out to it at once, even though he did not yet fully understand its uses. The Rat sculled smartly across and made fast. Then he held up his forepaw as the Mole stepped gingerly down. ‘Lean on that!’ he said. ‘Now then, step lively!’ and the Mole to his surprise and rapture found himself actually seated in the stern of a real boat.
  </Tab>
  <TabsPanel  title="Toad" key="toad">
‘Toad’s out, for one,’ replied the Otter. ‘In his brand-new wager-boat; new togs, new everything!’ The two animals looked at each other and laughed. ‘Once, it was nothing but sailing,’ said the Rat, ‘Then he tired of that and took to punting. Nothing would please him but to punt all day and every day, and a nice mess he made of it. Last year it was house-boating, and we all had to go and stay with him in his house-boat, and pretend we liked it. He was going to spend the rest of his life in a house-boat. It’s all the same, whatever he takes up; he gets tired of it, and starts on something fresh.’
  </Tab>
</Tabs>
```

**Lego tabs:** See Visual design for the usage recommendations for the lego style. Tabs can appear both ranged to the right, or justified.

```tsx
<Tabs color="hero" >
  <TabsPanel  title="Mole" key="mole">
The Mole had been working very hard all the morning, spring-cleaning his little home. First with brooms, then with dusters; then on ladders and steps and chairs, with a brush and a pail of whitewash; till he had dust in his throat and eyes, and splashes of whitewash all over his black fur, and an aching back and weary arms. Spring was moving in the air above and in the earth below and around him, penetrating even his dark and lowly little house with its spirit of divine discontent and longing. It was small wonder, then, that he suddenly flung down his brush on the floor, said ‘Bother!’ and ‘O blow!’ and also ‘Hang spring-cleaning!’ and bolted out of the house without even waiting to put on his coat.
  </Tab>
  <TabsPanel  title="Rat" key="rat">
The Rat said nothing, but stooped and unfastened a rope and hauled on it; then lightly stepped into a little boat which the Mole had not observed. It was painted blue outside and white within, and was just the size for two animals; and the Mole’s whole heart went out to it at once, even though he did not yet fully understand its uses. The Rat sculled smartly across and made fast. Then he held up his forepaw as the Mole stepped gingerly down. ‘Lean on that!’ he said. ‘Now then, step lively!’ and the Mole to his surprise and rapture found himself actually seated in the stern of a real boat.
  </Tab>
  <TabsPanel  title="Toad" key="toad">
‘Toad’s out, for one,’ replied the Otter. ‘In his brand-new wager-boat; new togs, new everything!’ The two animals looked at each other and laughed. ‘Once, it was nothing but sailing,’ said the Rat, ‘Then he tired of that and took to punting. Nothing would please him but to punt all day and every day, and a nice mess he made of it. Last year it was house-boating, and we all had to go and stay with him in his house-boat, and pretend we liked it. He was going to spend the rest of his life in a house-boat. It’s all the same, whatever he takes up; he gets tired of it, and starts on something fresh.’
  </Tab>
</Tabs>
```

**Responsive tabcordion:** This a responsive component that can render as either a tabs or an [accordion](/components/accordion), depending on the screen width available. The tabcordion, can appear in either the default or lego style, see Visual design for the usage recommendations for either style.

```tsx
<>
  <Accordion className="sm:hidden">
    <AccordionItem title="Mole">
The Mole had been working very hard all the morning, spring-cleaning his little home. First with brooms, then with dusters; then on ladders and steps and chairs, with a brush and a pail of whitewash; till he had dust in his throat and eyes, and splashes of whitewash all over his black fur, and an aching back and weary arms. Spring was moving in the air above and in the earth below and around him, penetrating even his dark and lowly little house with its spirit of divine discontent and longing. It was small wonder, then, that he suddenly flung down his brush on the floor, said ‘Bother!’ and ‘O blow!’ and also ‘Hang spring-cleaning!’ and bolted out of the house without even waiting to put on his coat.
    </AccordionItem>
    <AccordionItem title="Rat">
The Rat said nothing, but stooped and unfastened a rope and hauled on it; then lightly stepped into a little boat which the Mole had not observed. It was painted blue outside and white within, and was just the size for two animals; and the Mole’s whole heart went out to it at once, even though he did not yet fully understand its uses. The Rat sculled smartly across and made fast. Then he held up his forepaw as the Mole stepped gingerly down. ‘Lean on that!’ he said. ‘Now then, step lively!’ and the Mole to his surprise and rapture found himself actually seated in the stern of a real boat.
    </AccordionItem>
    <AccordionItem title="Toad">
‘Toad’s out, for one,’ replied the Otter. ‘In his brand-new wager-boat; new togs, new everything!’ The two animals looked at each other and laughed. ‘Once, it was nothing but sailing,’ said the Rat, ‘Then he tired of that and took to punting. Nothing would please him but to punt all day and every day, and a nice mess he made of it. Last year it was house-boating, and we all had to go and stay with him in his house-boat, and pretend we liked it. He was going to spend the rest of his life in a house-boat. It’s all the same, whatever he takes up; he gets tired of it, and starts on something fresh.’
    </AccordionItem>
  </Accordion>
  <Tabs className="max-sm:hidden">
    <TabsPanel title="Mole">
The Mole had been working very hard all the morning, spring-cleaning his little home. First with brooms, then with dusters; then on ladders and steps and chairs, with a brush and a pail of whitewash; till he had dust in his throat and eyes, and splashes of whitewash all over his black fur, and an aching back and weary arms. Spring was moving in the air above and in the earth below and around him, penetrating even his dark and lowly little house with its spirit of divine discontent and longing. It was small wonder, then, that he suddenly flung down his brush on the floor, said ‘Bother!’ and ‘O blow!’ and also ‘Hang spring-cleaning!’ and bolted out of the house without even waiting to put on his coat.
    </TabsPanel>
    <TabsPanel title="Rat">
The Rat said nothing, but stooped and unfastened a rope and hauled on it; then lightly stepped into a little boat which the Mole had not observed. It was painted blue outside and white within, and was just the size for two animals; and the Mole’s whole heart went out to it at once, even though he did not yet fully understand its uses. The Rat sculled smartly across and made fast. Then he held up his forepaw as the Mole stepped gingerly down. ‘Lean on that!’ he said. ‘Now then, step lively!’ and the Mole to his surprise and rapture found himself actually seated in the stern of a real boat.
    </TabsPanel>
    <TabsPanel title="Toad">
‘Toad’s out, for one,’ replied the Otter. ‘In his brand-new wager-boat; new togs, new everything!’ The two animals looked at each other and laughed. ‘Once, it was nothing but sailing,’ said the Rat, ‘Then he tired of that and took to punting. Nothing would please him but to punt all day and every day, and a nice mess he made of it. Last year it was house-boating, and we all had to go and stay with him in his house-boat, and pretend we liked it. He was going to spend the rest of his life in a house-boat. It’s all the same, whatever he takes up; he gets tired of it, and starts on something fresh.’
    </TabsPanel>
  </Tabs>
</>
```

#### User Experience

The Tabs component has two modes:

1. **Tabs** – traditional horizontal tabs, allowing only one content panel to be visible at a time, by selecting the relevant tab.
1. **Tabcordion** – a responsive combination of accordions and tabs.

‘Tabcordion’ is the term we use to describe responsive tabs. When using a tabs in our web applications we typically experience layout issues when the application needs to display on small viewports (phones). Often the tabs won’t fit horizontally in the limited screen size. To remedy this problem, we developed the Tabcordion where the Tabs will turn into an Accordion when viewed on smaller devices (phones).

This component is useful when trying to simplify and group content for users to view when they need it, as opposed to displaying everything at once.

#### Visual Design

Tabs and Accordions can have one of two styles applied to them *Default* and *Lego*:

The **Default style** is designed to be subtle and understated while still providing a clear indication of which tab or accordion bar is selected, and its related content. To further reinforce this relationship a transition is used to display related content when a tab or accordion bar is selected. Generous padding provides a larger hit area and important breathing space to provide emphasis without adding noise.

The **Lego tabs** are designed to be more prominent. This design came out of a project request for a more emphasised component which would also add some brand colour to an otherwise dry, text heavy interface.

Tab sets and accordions are intended to visually group related content. When used correctly with moderate content they do this extremely well. However, if too much content is used it becomes difficult to visualise this relationship as content extends below the viewport.

### Accessibility

#### Accessibility Features

- The tabset is implemented as a set of buttons, rather than tabs. This approach has shown to provide a better user experience.
- An indicator outline appears around the toggle buttons when focused
- The tab shape, text and accordion toggle icons are visible in Windows High Contrast Mode

###### Accessibility in the HTML

- The tab group, tab panel and tabs use the useTablist, useTabPanel and useTab hooks from React Aria to handle the accessibility code. Read the [full specifications](https://react-spectrum.adobe.com/react-aria/useTabList.html) for more information.

###### Keyboard support

Keyboard users navigate the tabset as a set of buttons, rather than ‘tabs’. Keyboard interaction requires use of ‘tab’ and ‘enter’ (or ‘space’) keys to select, rather than arrow keys. The accordion toggles are also buttons; interaction is as expected, consistent with tabset toggles.

---


## Text areas

**Description:** Use text areas when users are required to input and edit multiple lines of text.

### Design Guidelines

#### Dos And Donts

- Do use any of the predefined input sizes but make sure to use the corresponding button size if required.
- Do keep labels and errors in close proximity above the input field.

#### Error State

All form elements have associated error states, see [Error messages](/content/guidelines/error-message) in our content guidelines for more.

```tsx
  <InputGroup label="Label" hint="Hint text"  errorMessage="If there is an error it can go here">
          <Textarea invalid />
        </InputGroup>
```

#### Sizes

Text areas come in four sizes, they dictate the size of the displayed input text. These input text sizes are aligned with the [Input](/components/input) and [Select](/components/select) components. The text area field can be stretched by the user to expose more text if required.

```tsx
() => {
  const SIZES = ['small', 'medium', 'large', 'xlarge'] as const;
  return (
    <div className="flex flex-col gap-4">
      {SIZES.map(size => (
        <div key={size}>
          <ComponentTitle>{size}</ComponentTitle>
          <Textarea size={size} width="20" />
        </div>
      ))}
    </div>
  );
};
```

#### Text Area With Labels

Use the [Input group](/components/input-group) component to accessibly define the labels used with Text areas and [Inputs](/components/input). All inputs require labels for usability and accessibility.

```tsx
  <InputGroup label="Label" hint="Hint text" >
          <Textarea />
        </InputGroup>
```

#### User Experience

In order to be most effective, form inputs must focus on usability and accessibility above all else. Like every component in this system, our design decisions are driven by what will provide the most robust solution across all scenarios.

###### Borders

We use a solid border as it is simple and universally understood. Using single lines as an input 'field' undermines the integrity of the affordance making it difficult to recognise. These fields can be easily confused with horizontal rules, that are often used in design to denote a break in content or a new section. Replacing the border also affects those with low vision (see the Text Inputs accessibility tab for more).

###### Placeholder text

We don't use placeholder text for a few reasons. Placeholder text needs to be visually very different from the text that gets entered into the field by the user, otherwise it appears as though the field has already been completed, causing the user to unintentionally skip it. Finding a colour that is different enough from ‘entered text’ colour, but still meets accessibility contrast requirements is incredibly difficult.

As placeholder text disappears once the field is in focus, it also places increased cognitive load on the user, requiring them to recall the instructions once they've gone.

###### Labels

We don't use floating labels. Floating labels often start off as placeholder text so inherit some of those issues described above. Additionally floating labels come with restrictions on label length (when a label is longer than the input field), hint text location challenges, and consistency with error validation.

###### Hint text and error messages

We do place hint text and errors messages directly under the input label for context. This approach also guarantees that on mobile devices, the hint text or error message remains visible and is not hidden by activated select boxes or keypads.

###### Layout

These components are designed to be stacked and do not work so well in column based executions as long wrapping labels, and hint text length can create misalignment when fields are horizontally laid out.

#### Visual Design

Most operating systems provide default styling for common UI elements such as input fields. We've overridden this default styling for several reasons:

1. The default styling does not align with our brands look and feel.
1. The default styling often fails accessibility requirements such as colour contrast ratio for borders and placeholder text.
1. The default styling is proportionately not aligned with the other UI elements.
1. The default styling often looks dated and poorly rendered.

We’ve addressed all these issues in the styling of our input fields making them simpler, more accessible, more consistent and more functional.

We’ve also provided several sizes (heights) to accommodate different layout scenarios and styled the tab focus state to better align with the brand.

These overrides ensure that all input field components will adapt automatically when building multi-brand applications.

### Accessibility

#### Accessibility Features

- An indicator outline appears around the input when focused via keyboard, mouse or touch
- The Text input, Select and Textarea shapes are visible in Windows High Contrast Mode (WHCM). The Select dropdown icon is not visible in WHCM, however the recommended default option text of ‘Select’ provides a sufficient affordance.

#### Notes On Accessibility

All components comply with WCAG 2.1 AA guidelines and Success Criteria. These fall under the [four principles of accessibility](/accessibility/design-system-accessibility) – Perceivable, Operable, Understandable and Robust. Below are some specific ways in which this component follows these principles:

###### Perceivable

**Text areas** - These fields have been carefully designed and tested to achieve optimal contrast and border line weight. This is crucial for users to quickly identify the element as a Select, providing significant assistance to individuals with low vision and those less familiar with prevailing web design trends. The border colour was modified from the original "Border" colour to a darker version named "Border Dark," to ensure ongoing compliance with WCAG colour contrast guidelines.

**Labels** *-* Input labels should be placed above the input field. This helps promote scanning, readability and faster progress.

**Hint text** *-* Hint text should be placed directly under the input label for context. This also ensures on mobile the hint text is visible ‘on canvas’ and is not obscured by any select boxes or keypads when activated.

###### Robust

A label and a form control should be associated with each other either implicitly or explicitly. Web browsers provide the label as a larger clickable area, for example, to select or activate the control. It also ensures that assistive technology can refer to the correct label when presenting a form control.

---


## Wells

**Description:** Wells are containers with simple text. They are designed to house content without interfering with the primary content on a page.

### Design Guidelines

#### Default Well

Choose the colour of your well and the background it appears on to help your content either stand out or recede. Contrasting colours will always make an impact.

```tsx
<>
  <Well className="typography-body-10 mb-3">
    It was a bright morning in the early part of summer; the river had resumed its wonted banks and its accustomed pace,
    and a hot sun seemed to be pulling everything green and bushy and spiky up out of the earth towards him, as if by
    strings. The Mole and the Water Rat had been up since dawn, very busy on matters connected with boats and the opening
    of the boating season; painting and varnishing, mending paddles, repairing cushions, hunting for missing boat-hooks,
    and so on; and were finishing breakfast in their little parlour and eagerly discussing their plans for the day, when a
    heavy knock sounded at the door.
  </Well>

  <Well color="white" className="typography-body-10 mb-3">
    It was a bright morning in the early part of summer; the river had resumed its wonted banks and its accustomed pace,
    and a hot sun seemed to be pulling everything green and bushy and spiky up out of the earth towards him, as if by
    strings. The Mole and the Water Rat had been up since dawn, very busy on matters connected with boats and the opening
    of the boating season; painting and varnishing, mending paddles, repairing cushions, hunting for missing boat-hooks,
    and so on; and were finishing breakfast in their little parlour and eagerly discussing their plans for the day, when a
    heavy knock sounded at the door.
  </Well>
</>
```

#### User Experience

Wells are used to group and separate content, they are a consciously simple component, with the purpose of showcasing the content they contain. They're often used for secondary legal information e.g. terms and conditions, things you should know etc.

If you need to associate an action with the content in your well then you could try using a [panel](/components/panels) component, which includes an optional header and/or footer, for this purpose.

#### Visual Design

Wells have been designed to use responsive padding. As the viewport increases so too does the padding. This reduces long line widths and creates a more considered layout across all viewports.

A simple approach to make content stand out is to contrast the colour of your well with the background colour of the page. A white well on background colour, or vice versa, will highlight your content in a subtle yet effective way.

### Accessibility

#### Accessibility Features

- The Well shape and text content is visible in Windows High Contrast Mode
- A `<div>` element is used to define the Well. Consider using a more semantically meaningful element to suit the use case, depending on the Well content and its context within the document.

---
