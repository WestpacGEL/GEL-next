# @westpac/ui Component Reference

## className Support

Most components accept a `className` prop (inherited from HTML attributes). How it behaves depends on the component's styling architecture:

### How className Merging Works

Components use `tailwind-variants` (`tv()`) for styling. The `className` you pass is **merged** with the component's built-in styles via tailwind-variants, which uses `tailwind-merge` under the hood. This means:

- **Conflicting utilities are resolved in your favour** — e.g., passing `className="p-8"` will override the component's default padding
- **Non-conflicting utilities are added** — e.g., passing `className="mt-4"` adds margin without affecting other styles
- **You cannot target internal sub-elements** — for slotted components, `className` only affects the root/base element

### Components with Tailwind-Variants Merging

These components pass `className` through `styles({ className })` or `styles.base({ className })`. Your classes are intelligently merged with and can override the component's built-in Tailwind classes:

| Component             | Merge Target                      | What You Can Override                                                                    |
| --------------------- | --------------------------------- | ---------------------------------------------------------------------------------------- |
| **Accordion**         | Root `div`                        | Border, rounded corners, flex layout                                                     |
| **AccordionItem**     | Root element                      | Item-level styles                                                                        |
| **Alert**             | Root element (base slot)          | Padding, border, background, text color                                                  |
| **Autocomplete**      | Root `div` (base slot)            | Wrapper layout                                                                           |
| **Badge**             | Root element                      | Padding, border-radius, font size, colors                                                |
| **Button**            | Root element (base slot)          | Height, padding, border-radius, colors, font. Cannot target inner `text` or `icon` slots |
| **ButtonGroup**       | Root `div` (base slot)            | Flex layout, gap                                                                         |
| **CheckboxGroup**     | Root `div` (base slot)            | Layout, gap                                                                              |
| **Circle**            | Root element                      | Size, background, colors                                                                 |
| **Collapsible**       | Root element (base slot)          | Wrapper styles                                                                           |
| **DatePicker**        | Root `div` (base slot)            | Wrapper layout                                                                           |
| **Dropdown**          | Root element (base slot)          | Button-level styles                                                                      |
| **ErrorMessage**      | Root element (base slot)          | Text, spacing                                                                            |
| **FlexiCell**         | Root element (base slot)          | Padding, border, layout                                                                  |
| **Footer**            | Root `footer` (base slot)         | Background, padding                                                                      |
| **Grid**              | Root element                      | Layout, gap                                                                              |
| **Header**            | Root `header` (base slot)         | Background, positioning, z-index                                                         |
| **Heading**           | Root heading element              | Font size, color, margin                                                                 |
| **Hint**              | Root element                      | Text color, spacing                                                                      |
| **Icon**              | Root `svg`                        | Size, color                                                                              |
| **Input**             | Root `input`                      | Height, padding, border, background, font                                                |
| **InputGroup**        | Root element (base slot)          | Wrapper layout                                                                           |
| **Label**             | Root `label`/`legend`             | Font size, color, spacing                                                                |
| **Link**              | Root `a` (base slot)              | Text color, decoration                                                                   |
| **List**              | Root `ul`/`ol` (base slot)        | Spacing, list style                                                                      |
| **ListItem**          | Root `li` (base slot)             | Item spacing                                                                             |
| **Modal**             | Backdrop (base slot)              | Backdrop color, z-index                                                                  |
| **ModalBody**         | Root `div` (base slot)            | Padding, overflow                                                                        |
| **ModalFooter**       | Root `div` (base slot)            | Padding, layout                                                                          |
| **Pagination**        | Root element (base slot)          | Layout, spacing                                                                          |
| **Panel**             | Root `div` (base slot)            | Border, background                                                                       |
| **PassCode**          | Root `div` (base slot)            | Layout                                                                                   |
| **PassCodeView**      | Root element (base slot)          | Layout                                                                                   |
| **Pictogram**         | Root `span`                       | Size                                                                                     |
| **Popover**           | Root `div` (base slot)            | Background, border, shadow                                                               |
| **ProgressBar**       | Root element (base slot)          | Width, height                                                                            |
| **ProgressIndicator** | Root SVG (base slot)              | Size                                                                                     |
| **RadioGroup**        | Root `div` (base slot)            | Layout, gap                                                                              |
| **Select**            | Passed to internal `StyledSelect` | Height, padding, border, background                                                      |
| **SkipLink**          | Root element                      | Positioning                                                                              |
| **Switch**            | Root `label` (base slot)          | Layout                                                                                   |
| **Symbol**            | Root `span`                       | Size                                                                                     |
| **Table**             | Root `table` (base slot)          | Width, border                                                                            |
| **Tabs**              | Root `div` (base slot)            | Layout                                                                                   |
| **Textarea**          | Root `textarea`                   | Height, padding, border, background                                                      |
| **VisuallyHidden**    | Root element                      | Overriding defeats the purpose of this component                                         |
| **Well**              | Root element                      | Padding, background, border-radius                                                       |

### Components with Direct className Pass-through

These components pass `className` directly to an HTML element without tailwind-variants merging. Your classes are appended as-is (standard React className behaviour — last class wins only if specificity matches):

| Component        | Element    | Notes                                                      |
| ---------------- | ---------- | ---------------------------------------------------------- |
| **Breadcrumb**   | `<nav>`    | Directly applied, no merging with built-in styles          |
| **Field**        | Root `div` | Directly applied, no built-in root styles to conflict with |
| **ProgressRope** | Root `nav` | Directly applied, internal `<ol>` has its own styles       |

### Components where className is Not Explicitly Handled

These components do **not** destructure `className` — it may flow through via `...props` to an internal component, but behaviour is not guaranteed:

| Component       | Notes                                                |
| --------------- | ---------------------------------------------------- |
| **BottomSheet** | Props spread to internal `BottomSheetModal`          |
| **Compacta**    | Props spread to wrapper `div`                        |
| **MultiSelect** | Not destructured; internal structure handles styling |
| **Repeater**    | Props spread to wrapper `div`                        |
| **Selector**    | Delegates to internal sub-components                 |

### Usage Examples

```tsx
// ✅ Override padding on a Button
<Button className="px-8 py-4" look="primary">Wide button</Button>

// ✅ Add margin to a Badge
<Badge className="ml-2" color="success">New</Badge>

// ✅ Set width on an Input
<Input className="max-w-md" size="large" />

// ✅ Add spacing to a Field wrapper
<Field className="mb-6" label="Email">
  <Input />
</Field>

// ⚠️ Cannot target Button's inner text span or icon slots
// className only affects the root <button> element
<Button className="[&>span]:text-red-500">This won't work reliably</Button>

// ✅ Instead, use the component's own props for sub-elements
<Button iconColor="danger">Correct approach</Button>
```

---

## Accordion

**Import:** `import { Accordion, AccordionItem } from '@westpac/ui/accordion';`

Expandable content panels. Multiple panels can be open simultaneously.

| Prop      | Type                                   | Default | Description                 |
| --------- | -------------------------------------- | ------- | --------------------------- |
| `look`    | `ResponsiveVariants<'soft' \| 'lego'>` | `soft`  | Visual style                |
| `rounded` | `ResponsiveVariants<boolean>`          | `true`  | Rounded corners             |
| `justify` | `boolean`                              | `false` | Stretch tab to fill content |

**Compound:** Requires `AccordionItem` children with `id`, `title`, and `key` props.

**Incorrect (missing required `id`/`key` on items)**

```tsx
<Accordion look="soft" rounded>
  <AccordionItem title="Section 1">Content 1</AccordionItem>
  <AccordionItem title="Section 2">Content 2</AccordionItem>
</Accordion>
```

**Correct**

```tsx
<Accordion look="soft" rounded>
  <AccordionItem key="1" id="1" title="Section 1">
    Content 1
  </AccordionItem>
  <AccordionItem key="2" id="2" title="Section 2">
    Content 2
  </AccordionItem>
</Accordion>
```

**Capabilities:** Responsive `look` and `rounded` · Multiple panels open · Keyboard accessible (react-stately) · Cannot control individual open/close programmatically (always allows multiple)

---

## Alert

**Import:** `import { Alert } from '@westpac/ui/alert';`

Contextual feedback messages.

| Prop          | Type                                                                           | Default | Description                         |
| ------------- | ------------------------------------------------------------------------------ | ------- | ----------------------------------- |
| `look`        | `ResponsiveVariants<'info' \| 'success' \| 'warning' \| 'danger' \| 'system'>` | `info`  | Alert style                         |
| `mode`        | `ResponsiveVariants<'box' \| 'text'>`                                          | `box`   | Display mode                        |
| `heading`     | `string`                                                                       | —       | Alert heading                       |
| `headingTag`  | `'h1'-'h6'`                                                                    | `h2`    | Heading element                     |
| `icon`        | `React.ElementType`                                                            | auto    | Custom icon (auto-selected by look) |
| `iconSize`    | `IconProps['size']`                                                            | —       | Icon size                           |
| `dismissible` | `boolean`                                                                      | `false` | Allow dismissal                     |
| `onClose`     | `() => void`                                                                   | —       | Close callback                      |
| `open`        | `boolean`                                                                      | —       | Controlled open state               |
| `tag`         | `keyof JSX.IntrinsicElements`                                                  | `div`   | HTML element                        |

**Incorrect (wrong prop names — `variant`/`title`/`closable`)**

```tsx
<Alert variant="success" title="Done!" closable onDismiss={() => {}}>
  Your changes have been saved.
</Alert>
```

**Correct**

```tsx
<Alert look="success" heading="Done!" dismissible onClose={() => {}}>
  Your changes have been saved.
</Alert>
```

**Capabilities:** Responsive `look` and `mode` · Dismissible with controlled or uncontrolled state · Custom icons · All look variants have automatic icons

---

## Autocomplete

**Import:** `import { Autocomplete, AutocompleteItem } from '@westpac/ui/autocomplete';`

Searchable dropdown with filtering.

| Prop               | Type                                                             | Default | Description          |
| ------------------ | ---------------------------------------------------------------- | ------- | -------------------- |
| `size`             | `ResponsiveVariants<'small' \| 'medium' \| 'large' \| 'xlarge'>` | —       | Input size           |
| `width`            | `ResponsiveVariants<...>`                                        | —       | Input width          |
| `invalid`          | `boolean`                                                        | —       | Invalid state        |
| `isDisabled`       | `boolean`                                                        | —       | Disabled state       |
| `errorMessage`     | `string \| string[]`                                             | —       | Error messages       |
| `hintMessage`      | `HintProps['children']`                                          | —       | Hint text            |
| `noOptionsMessage` | `ReactNode`                                                      | —       | No results message   |
| `loadingState`     | `boolean`                                                        | —       | Show loading spinner |
| `footer`           | `ReactNode`                                                      | —       | Footer element       |
| `name`             | `string`                                                         | —       | Form field name      |
| `portalContainer`  | `Element`                                                        | —       | Portal container     |

**Incorrect (native `<option>` children instead of `AutocompleteItem`)**

```tsx
<Autocomplete label="Search" onSelectionChange={key => console.log(key)}>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Autocomplete>
```

**Correct**

```tsx
<Autocomplete label="Search" onSelectionChange={key => console.log(key)}>
  <AutocompleteItem key="1">Option 1</AutocompleteItem>
  <AutocompleteItem key="2">Option 2</AutocompleteItem>
</Autocomplete>
```

**Capabilities:** Responsive size/width · Server-side loading state · Error/hint messages · Custom no-results message · Portal support · Built on react-aria ComboBox

---

## Badge

**Import:** `import { Badge } from '@westpac/ui/badge';`

Small status labels.

| Prop    | Type                                                                                                              | Default   | Description      |
| ------- | ----------------------------------------------------------------------------------------------------------------- | --------- | ---------------- |
| `color` | `ResponsiveVariants<'hero' \| 'neutral' \| 'faint' \| 'primary' \| 'info' \| 'success' \| 'warning' \| 'danger'>` | `hero`    | Badge color      |
| `type`  | `ResponsiveVariants<'default' \| 'pill'>`                                                                         | `default` | Badge shape      |
| `soft`  | `ResponsiveVariants<boolean>`                                                                                     | `false`   | Soft/muted style |
| `tag`   | `keyof JSX.IntrinsicElements`                                                                                     | `div`     | HTML element     |

**Incorrect (invalid `color`/`type` values)**

```tsx
<Badge color="green" type="rounded">
  Active
</Badge>
```

**Correct**

```tsx
<Badge color="success" type="pill">
  Active
</Badge>
```

**Capabilities:** Responsive color/type/soft · Polymorphic tag · Pill or default shape

---

## BottomSheet

**Import:** `import { BottomSheet } from '@westpac/ui/bottom-sheet';`

Mobile-friendly bottom drawer.

| Prop               | Type                  | Default | Description                           |
| ------------------ | --------------------- | ------- | ------------------------------------- |
| `state`            | `OverlayTriggerState` | —       | Controlled open/close (react-stately) |
| `title`            | `string`              | —       | Sheet title                           |
| `primaryLabel`     | `string`              | —       | Primary button text                   |
| `primaryOnClick`   | `() => void`          | —       | Primary button handler                |
| `secondaryLabel`   | `string`              | —       | Secondary button text                 |
| `secondaryOnClick` | `() => void`          | —       | Secondary button handler              |

**Incorrect (boolean `useState` instead of `OverlayTriggerState`)**

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>
<BottomSheet open={open} title="Title" primaryLabel="Confirm" primaryOnClick={() => setOpen(false)}>
  Content
</BottomSheet>
```

**Correct**

```tsx
import { useOverlayTriggerState } from 'react-stately';

const state = useOverlayTriggerState({});

<Button onClick={() => state.open()}>Open</Button>
<BottomSheet state={state} title="Title" primaryLabel="Confirm" primaryOnClick={() => state.close()}>
  Content
</BottomSheet>
```

**Capabilities:** Controlled via react-stately `useOverlayTriggerState` · Primary/secondary action buttons · Title

---

## Breadcrumb

**Import:** `import { Breadcrumb, BreadcrumbItem } from '@westpac/ui/breadcrumb';`

Navigation breadcrumbs.

**Incorrect (raw anchors instead of `BreadcrumbItem`)**

```tsx
<Breadcrumb>
  <a href="/">Home</a>
  <a href="/products">Products</a>
  <span>Current Page</span>
</Breadcrumb>
```

**Correct**

```tsx
<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/products">Products</BreadcrumbItem>
  <BreadcrumbItem>Current Page</BreadcrumbItem>
</Breadcrumb>
```

**Capabilities:** Compound component with BreadcrumbItem · Links via `href` · Last item renders as text

---

## Button

**Import:** `import { Button } from '@westpac/ui/button';`

Interactive button with multiple variants.

| Prop                | Type                                                                         | Default  | Description                 |
| ------------------- | ---------------------------------------------------------------------------- | -------- | --------------------------- |
| `look`              | `ResponsiveVariants<'primary' \| 'hero' \| 'faint' \| 'link' \| 'unstyled'>` | `hero`   | Visual style                |
| `size`              | `ResponsiveVariants<'small' \| 'medium' \| 'large' \| 'xlarge'>`             | `medium` | Button size                 |
| `soft`              | `ResponsiveVariants<boolean>`                                                | —        | Soft/outlined style         |
| `block`             | `ResponsiveVariants<boolean>`                                                | `false`  | Full width                  |
| `justify`           | `ResponsiveVariants<boolean>`                                                | `false`  | Justify content with flex   |
| `iconBefore`        | `(props: IconProps) => JSX.Element`                                          | —        | Icon before text            |
| `iconAfter`         | `(props: IconProps) => JSX.Element`                                          | —        | Icon after text             |
| `iconColor`         | `IconProps['color']`                                                         | auto     | Icon color                  |
| `iconLook`          | `IconProps['look']`                                                          | `filled` | Icon look                   |
| `iconSize`          | `IconProps['size']`                                                          | auto     | Icon size                   |
| `tag`               | `'a' \| 'span' \| 'button' \| 'div'`                                         | `button` | HTML element                |
| `removeLinkPadding` | `boolean`                                                                    | `false`  | Remove padding on link look |

**Incorrect (wrong prop names and wrapping in an anchor)**

```tsx
import { ArrowRightIcon } from '@westpac/ui/icon';

<Button variant="primary" buttonSize="large">Click me</Button>
<Button look="hero" soft icon="arrow-right">Next</Button>
<a href="/page"><Button look="link">Go to page</Button></a>
<Button block="true">Full width</Button>
```

**Correct**

```tsx
import { ArrowRightIcon } from '@westpac/ui/icon';

<Button look="primary" size="large">Click me</Button>
<Button look="hero" soft iconAfter={ArrowRightIcon}>Next</Button>
<Button tag="a" href="/page" look="link">Go to page</Button>
<Button size={{ initial: 'small', md: 'large' }}>Responsive</Button>
<Button block>Full width</Button>
```

**Capabilities:** Responsive look/size/soft/block/justify · Icons before/after · Polymorphic tag (button/a/span/div) · Soft variants for primary/hero/faint · Icon-only mode (no children) · Accessible focus ring · Disabled state via `disabled` prop · Forwards ref

---

## ButtonGroup

**Import:** `import { ButtonGroup, ButtonGroupButton } from '@westpac/ui/button-group';`

Toggle button group with single or multiple selection.

| Prop                  | Type                                      | Default | Description          |
| --------------------- | ----------------------------------------- | ------- | -------------------- |
| `look`                | `ResponsiveVariants<'hero' \| 'primary'>` | —       | Button look          |
| `size`                | `ButtonProps['size']`                     | —       | Button size          |
| `block`               | `ResponsiveVariants<boolean>`             | —       | Full width           |
| `selectionMode`       | `'single' \| 'multiple'`                  | —       | Selection mode       |
| `selectedKeys`        | `Key \| Iterable<Key>`                    | —       | Controlled selection |
| `defaultSelectedKeys` | `Key \| Iterable<Key>`                    | —       | Default selection    |
| `onSelectionChange`   | `(key) => void`                           | —       | Selection handler    |

**Incorrect (native buttons and `value`/`onChange` props)**

```tsx
<ButtonGroup value="opt1" onChange={key => {}}>
  <button id="opt1">Option 1</button>
  <button id="opt2">Option 2</button>
</ButtonGroup>
```

**Correct**

```tsx
<ButtonGroup selectionMode="single" defaultSelectedKeys="opt1" onSelectionChange={key => {}}>
  <ButtonGroupButton id="opt1">Option 1</ButtonGroupButton>
  <ButtonGroupButton id="opt2">Option 2</ButtonGroupButton>
</ButtonGroup>
```

**Capabilities:** Single or multiple selection · Controlled or uncontrolled · Responsive look/block · Built on react-aria toggle group

---

## CheckboxGroup

**Import:** `import { CheckboxGroup, CheckboxGroupCheckbox } from '@westpac/ui/checkbox-group';`

Group of checkboxes.

| Prop           | Type                                             | Default | Description                     |
| -------------- | ------------------------------------------------ | ------- | ------------------------------- |
| `size`         | `ResponsiveVariants<'medium' \| 'large'>`        | —       | Checkbox size                   |
| `orientation`  | `ResponsiveVariants<'horizontal' \| 'vertical'>` | —       | Layout direction                |
| `errorMessage` | `string \| string[]`                             | —       | Error messages                  |
| `hintMessage`  | `HintProps['children']`                          | —       | Hint text                       |
| `showAmount`   | `number`                                         | —       | Show N items then reveal button |
| `checkboxes`   | `CheckboxGroupCheckboxProps[]`                   | —       | Data-driven alternative         |

**Incorrect (native checkbox inputs instead of `CheckboxGroupCheckbox`)**

```tsx
<CheckboxGroup label="Options" orientation="vertical">
  <label>
    <input type="checkbox" value="a" /> Option A
  </label>
  <label>
    <input type="checkbox" value="b" /> Option B
  </label>
</CheckboxGroup>
```

**Correct**

```tsx
<CheckboxGroup label="Options" orientation="vertical">
  <CheckboxGroupCheckbox value="a">Option A</CheckboxGroupCheckbox>
  <CheckboxGroupCheckbox value="b">Option B</CheckboxGroupCheckbox>
</CheckboxGroup>
```

**Capabilities:** Responsive size/orientation · Error/hint messages · Show/reveal pattern · Data-driven or compositional · Built on react-aria

---

## Circle

**Import:** `import { Circle } from '@westpac/ui/circle';`

Circular container element.

| Prop  | Type                          | Default | Description  |
| ----- | ----------------------------- | ------- | ------------ |
| `tag` | `keyof JSX.IntrinsicElements` | —       | HTML element |

**Incorrect (invalid `tag` value)**

```tsx
<Circle tag="circle">42</Circle>
```

**Correct**

```tsx
<Circle tag="span">42</Circle>
```

---

## Collapsible

**Import:** `import { Collapsible } from '@westpac/ui/collapsible';`

Toggle-able content section.

| Prop      | Type                  | Default | Description        |
| --------- | --------------------- | ------- | ------------------ |
| `text`    | `string`              | —       | Toggle button text |
| `open`    | `boolean`             | —       | Open state         |
| `onClick` | `() => void`          | —       | Toggle handler     |
| `size`    | `ButtonProps['size']` | —       | Button size        |

**Incorrect (wrong prop name `label` and no toggle handler)**

```tsx
<Collapsible label="Show more">Hidden content</Collapsible>
```

**Correct**

```tsx
const [open, setOpen] = useState(false);
<Collapsible text="Show more" open={open} onClick={() => setOpen(!open)}>
  Hidden content
</Collapsible>;
```

**Capabilities:** Controlled open/close · Button size customization

---

## Compacta

**Import:** `import { Compacta, CompactaItem } from '@westpac/ui/compacta';`

Compact list with add functionality.

| Prop      | Type            | Default | Description     |
| --------- | --------------- | ------- | --------------- |
| `onAdd`   | `() => unknown` | —       | Add callback    |
| `addText` | `string`        | —       | Add button text |

**Incorrect (uses `Compacta.Item` dot-notation instead of the `CompactaItem` component)**

```tsx
<Compacta onAdd={handleAdd}>
  <Compacta.Item title={{ primary: 'Home loan' }}>
    <Field label="Amount">
      <Input />
    </Field>
  </Compacta.Item>
</Compacta>
```

**Correct**

```tsx
<Compacta onAdd={handleAdd} addText="Add item">
  <CompactaItem title={{ primary: 'Home loan' }}>
    <Field label="Amount">
      <Input />
    </Field>
  </CompactaItem>
</Compacta>
```

**Capabilities:** Compound component with CompactaItem · Add button

---

## DatePicker

**Import:** `import { DatePicker } from '@westpac/ui/date-picker';`

Date selection with calendar popup.

| Prop                | Type                                                           | Default       | Description            |
| ------------------- | -------------------------------------------------------------- | ------------- | ---------------------- |
| `size`              | `ResponsiveVariants<...>`                                      | —             | Input size             |
| `block`             | `ResponsiveVariants<...>`                                      | —             | Full width             |
| `separator`         | `string`                                                       | `"/"`         | Date field separator   |
| `placement`         | `'top left' \| 'top right' \| 'bottom left' \| 'bottom right'` | `bottom left` | Calendar placement     |
| `bottomSheetView`   | `boolean \| Partial<Record<Breakpoint, boolean>>`              | —             | Bottom sheet on mobile |
| `disableWeekends`   | `boolean`                                                      | —             | Disable weekends       |
| `disableDaysOfWeek` | `number[]`                                                     | —             | Disable specific days  |
| `portalContainer`   | `Element`                                                      | —             | Portal container       |

**Incorrect (raw JS `Date`/string instead of a parsed value)**

```tsx
<DatePicker label="Date" defaultValue={new Date('2024-01-15')} />
<DatePicker label="Date" defaultValue="2024-01-15" />
```

**Correct**

```tsx
import { parseDate } from '@internationalized/date';

<DatePicker label="Date" defaultValue={parseDate('2024-01-15')} />
<DatePicker label="Date" bottomSheetView={{ initial: true, md: false }} />
```

**Capabilities:** Responsive size/block · Calendar popup or bottom sheet (breakpoint-aware) · Disable specific days/weekends · Custom placement · Built on react-aria/react-stately DatePicker · Uses `@internationalized/date` for date values

---

## Dropdown

**Import:** `import { Dropdown, DropdownHeading } from '@westpac/ui/dropdown';`

Button with dropdown panel.

| Prop              | Type                                                     | Default | Description           |
| ----------------- | -------------------------------------------------------- | ------- | --------------------- |
| `text`            | `ReactNode`                                              | —       | Button text           |
| `look`            | `'primary' \| 'hero' \| 'faint' \| 'unstyled' \| 'link'` | —       | Button look           |
| `soft`            | `ButtonProps['soft']`                                    | —       | Soft button style     |
| `size`            | `ButtonProps['size']`                                    | —       | Button size           |
| `block`           | `ButtonProps['block']`                                   | —       | Full width            |
| `dropdownSize`    | `ResponsiveVariants<...>`                                | —       | Panel size            |
| `open`            | `boolean`                                                | —       | Controlled open state |
| `placement`       | `Placement`                                              | —       | Popover placement     |
| `iconBefore`      | `ButtonProps['iconBefore']`                              | —       | Button icon           |
| `dropDownIcon`    | `(props: IconProps) => ReactNode`                        | —       | Custom dropdown icon  |
| `portalContainer` | `Element`                                                | —       | Portal container      |

**Incorrect (wrong prop name `label` and raw heading element)**

```tsx
<Dropdown label="Options" look="primary">
  <h3>Section</h3>
  <a href="/option1">Option 1</a>
  <a href="/option2">Option 2</a>
</Dropdown>
```

**Correct**

```tsx
<Dropdown text="Options" look="primary">
  <DropdownHeading>Section</DropdownHeading>
  <a href="/option1">Option 1</a>
  <a href="/option2">Option 2</a>
</Dropdown>
```

**Capabilities:** Compound with DropdownHeading · Controlled or uncontrolled · All button styling props · Custom placement · Portal support

---

## ErrorMessage

**Import:** `import { ErrorMessage } from '@westpac/ui/error-message';`

Form field error display.

| Prop      | Type                          | Default | Description      |
| --------- | ----------------------------- | ------- | ---------------- |
| `message` | `string \| string[]`          | —       | Error message(s) |
| `icon`    | `(...args) => JSX.Element`    | —       | Custom icon      |
| `tag`     | `keyof JSX.IntrinsicElements` | —       | HTML element     |

**Incorrect (wrong prop name `error` instead of `message`)**

```tsx
<ErrorMessage error="Enter your first name" />
```

**Correct**

```tsx
<ErrorMessage message="Enter your first name" />
```

---

## Field

**Import:** `import { Field } from '@westpac/ui/field';`

Form field wrapper with label, hint, and error message.

| Prop           | Type                          | Default | Description    |
| -------------- | ----------------------------- | ------- | -------------- |
| `label`        | `string`                      | —       | Field label    |
| `errorMessage` | `string \| string[]`          | —       | Error messages |
| `hintMessage`  | `HintProps['children']`       | —       | Hint text      |
| `labelSize`    | `LabelProps['size']`          | —       | Label size     |
| `tag`          | `keyof JSX.IntrinsicElements` | —       | HTML element   |

**Incorrect (wrong prop name `error` instead of `errorMessage`)**

```tsx
<Field label="Email" error="Email is required">
  <Input invalid />
</Field>
```

**Correct**

```tsx
<Field label="Email" errorMessage="Email is required">
  <Input invalid />
</Field>
```

**Capabilities:** Label + hint + error composition · Accessible field grouping via react-aria

---

## Filter

**Import:** `import { Filter, FilterButtons, FilterInput } from '@westpac/ui/filter';`

Filter bar with inputs and action buttons.

**Incorrect (missing `FilterInput`/`FilterButtons` wrappers)**

```tsx
<Filter>
  <Input placeholder="Search..." />
  <Button>Apply</Button>
  <Button look="faint">Clear</Button>
</Filter>
```

**Correct**

```tsx
<Filter>
  <FilterInput>
    <Input placeholder="Search..." />
  </FilterInput>
  <FilterButtons>
    <Button>Apply</Button>
    <Button look="faint">Clear</Button>
  </FilterButtons>
</Filter>
```

**Capabilities:** Compound component with FilterInput and FilterButtons

---

## FlexiCell

**Import:** `import { FlexiCell, FlexiCellAdornment, FlexiCellBody, FlexiCellButton, FlexiCellCircle, FlexiCellFooter, FlexiCellHint, FlexiCellLabel } from '@westpac/ui/flexi-cell';`

Flexible content cell for lists and cards.

| Prop         | Type                                 | Default   | Description           |
| ------------ | ------------------------------------ | --------- | --------------------- |
| `before`     | `ReactNode`                          | —         | Left element          |
| `after`      | `ReactNode`                          | —         | Right element         |
| `body`       | `boolean`                            | —         | Wrap in FlexiCellBody |
| `size`       | `ResponsiveVariants<...>`            | `default` | Padding/spacing       |
| `tag`        | `keyof JSX.IntrinsicElements`        | `div`     | HTML element          |
| `href`       | `string`                             | —         | Link href             |
| `withArrow`  | `boolean`                            | —         | Arrow indicator       |
| `withBorder` | `ResponsiveVariants<boolean>`        | `false`   | Border and radius     |
| `topBadge`   | `(props: BadgeProps) => JSX.Element` | —         | Top-right badge       |
| `dualAction` | `boolean`                            | `false`   | Dual action mode      |
| `disabled`   | `boolean`                            | —         | Disabled state        |

**Incorrect (uses `href` without setting `tag="a"`)**

```tsx
<FlexiCell href="/accounts" withArrow>
  <FlexiCellLabel>Accounts</FlexiCellLabel>
</FlexiCell>
```

**Correct**

```tsx
<FlexiCell tag="a" href="/accounts" withArrow>
  <FlexiCellLabel tag="h3">Accounts</FlexiCellLabel>
  <FlexiCellHint>View your account balances</FlexiCellHint>
</FlexiCell>
```

**Capabilities:** Rich compound component · Polymorphic tag · Link or button mode · Dual action · Responsive size/border · Before/after adornments · Top badge

---

## Footer

**Import:** `import { Footer } from '@westpac/ui/footer';`

Application footer with brand logo.

| Prop                | Type                               | Default | Description               |
| ------------------- | ---------------------------------- | ------- | ------------------------- |
| `brand`             | `'bom' \| 'bsa' \| 'stg' \| 'wbc'` | —       | Brand logo                |
| `hideLogo`          | `boolean`                          | —       | Hide logo                 |
| `logoLink`          | `string`                           | —       | Logo link href            |
| `logoAssistiveText` | `string`                           | —       | Logo aria-label           |
| `offsetSidebar`     | `boolean`                          | —       | Offset for sidebar layout |

**Incorrect (invalid `brand` value)**

```tsx
<Footer brand="westpac">
  <p>© 2026 Westpac Banking Corporation</p>
</Footer>
```

**Correct**

```tsx
<Footer brand="wbc" logoAssistiveText="Westpac">
  <p>© 2026 Westpac Banking Corporation</p>
</Footer>
```

---

## Grid

**Import:** `import { Grid, GridContainer, GridItem } from '@westpac/ui/grid';`

Layout grid system.

**Incorrect (`GridItem` without `Grid`/`GridContainer` wrappers)**

```tsx
<GridItem span={6}>Half width</GridItem>
<GridItem span={6}>Half width</GridItem>
```

**Correct**

```tsx
<GridContainer>
  <Grid>
    <GridItem span={6}>Half width</GridItem>
    <GridItem span={6}>Half width</GridItem>
  </Grid>
</GridContainer>
```

**Capabilities:** Compound with GridContainer/GridItem · Responsive span values

---

## Header

**Import:** `import { Header } from '@westpac/ui/header';`

Application header with brand logo and navigation controls.

| Prop              | Type                                      | Default | Description          |
| ----------------- | ----------------------------------------- | ------- | -------------------- |
| `brand`           | `'bom' \| 'bsa' \| 'stg' \| 'wbc'`        | —       | Brand logo           |
| `fixed`           | `ResponsiveVariants<boolean>`             | —       | Fixed position       |
| `fixedMaxWidth`   | `CSS MaxWidth`                            | —       | Max width when fixed |
| `logoLink`        | `string`                                  | `#`     | Logo link            |
| `logoCenter`      | `ResponsiveVariants<boolean>`             | —       | Center logo          |
| `leftIcon`        | `ResponsiveVariants<'arrow' \| 'burger'>` | —       | Left button icon     |
| `leftOnClick`     | `() => void`                              | —       | Left button handler  |
| `isScrolled`      | `boolean`                                 | —       | Show scroll shadow   |
| `skipToContentId` | `string`                                  | —       | Skip link target     |

**Incorrect (invalid `leftIcon` value)**

```tsx
<Header brand="wbc" leftIcon="back" />
```

**Correct**

```tsx
<Header brand="wbc" leftIcon="arrow" leftAssistiveText="Back" leftOnClick={() => {}} />
```

**Capabilities:** Responsive fixed/logoCenter/leftIcon · Brand-aware logo · Skip link support · Scroll shadow

---

## Heading

**Import:** `import { Heading } from '@westpac/ui/heading';`

Semantic heading with GEL typography.

| Prop           | Type                          | Default | Description                       |
| -------------- | ----------------------------- | ------- | --------------------------------- |
| `size`         | `ResponsiveVariants<1-10>`    | —       | Heading size (required)           |
| `tag`          | `'h1'-'h6'`                   | auto    | Semantic element (auto from size) |
| `brandHeading` | `ResponsiveVariants<boolean>` | —       | Brand heading style               |
| `uppercase`    | `boolean`                     | —       | Uppercase                         |

**Incorrect (missing required `size` prop, wrong `level` prop)**

```tsx
<Heading level={1}>Page Title</Heading>
<Heading tag="h1">Responsive Heading</Heading>
```

**Correct**

```tsx
<Heading size={3} tag="h1">Page Title</Heading>
<Heading size={{ initial: 5, md: 3 }}>Responsive Heading</Heading>
```

**Capabilities:** Responsive size · Auto semantic tag from size · Brand heading variant · Uppercase option

---

## Hint

**Import:** `import { Hint } from '@westpac/ui/hint';`

Form field hint text.

| Prop      | Type                          | Default | Description  |
| --------- | ----------------------------- | ------- | ------------ |
| `spacing` | `ResponsiveVariants<...>`     | —       | Spacing      |
| `tag`     | `keyof JSX.IntrinsicElements` | —       | HTML element |

**Incorrect (unsupported `spacing` value)**

```tsx
<Hint spacing="small">We'll never share your details.</Hint>
```

**Correct**

```tsx
<Hint spacing="large">We'll never share your details.</Hint>
```

---

## Icon

**Import:** `import { ArrowRightIcon, BurgerIcon, ... } from '@westpac/ui/icon';`

> **Note:** Icons are only available via the sub-path import `@westpac/ui/icon`, not from the main `@westpac/ui` barrel export.

Over 260 SVG icons.

| Prop            | Type                                                                         | Default  | Description   |
| --------------- | ---------------------------------------------------------------------------- | -------- | ------------- |
| `look`          | `'filled' \| 'outlined'`                                                     | `filled` | Icon variant  |
| `size`          | `ResponsiveVariants<'xsmall' \| 'small' \| 'medium' \| 'large' \| 'xlarge'>` | —        | Icon size     |
| `color`         | `ResponsiveVariants<...>`                                                    | —        | Icon color    |
| `copyrightYear` | `string`                                                                     | —        | SVG copyright |

**Incorrect (importing from the main barrel instead of `/icon`)**

```tsx
import { ArrowRightIcon } from '@westpac/ui';

<ArrowRightIcon size="medium" look="outlined" color="primary" />;
```

**Correct**

```tsx
import { ArrowRightIcon } from '@westpac/ui/icon';

<ArrowRightIcon size="medium" look="outlined" color="primary" />;
```

**Capabilities:** Responsive size/color · Filled and outlined variants · Used as component references in Button/Link props

---

## Input

**Import:** `import { Input } from '@westpac/ui/input';`

Text input field.

| Prop      | Type                                                             | Default  | Description   |
| --------- | ---------------------------------------------------------------- | -------- | ------------- |
| `size`    | `ResponsiveVariants<'small' \| 'medium' \| 'large' \| 'xlarge'>` | `medium` | Input size    |
| `width`   | `ResponsiveVariants<'full' \| ...>`                              | `full`   | Input width   |
| `invalid` | `boolean`                                                        | `false`  | Invalid state |

**Incorrect (invalid `size` value, wrong `error` prop)**

```tsx
<Input size="big" placeholder="Enter text" />
<Input error aria-invalid />
```

**Correct**

```tsx
<Input size="large" placeholder="Enter text" />
<Input invalid aria-invalid />
```

**Capabilities:** Responsive size/width · Invalid state · Forwards ref · All standard `<input>` HTML attributes

---

## InputGroup

**Import:** `import { InputGroup } from '@westpac/ui/input-group';`

Input with label, hint, error, and before/after add-ons.

| Prop             | Type                                         | Default | Description     |
| ---------------- | -------------------------------------------- | ------- | --------------- |
| `label`          | `string`                                     | —       | Label text      |
| `size`           | `'small' \| 'medium' \| 'large' \| 'xlarge'` | —       | Size            |
| `width`          | `InputProps['width']`                        | —       | Input width     |
| `before`         | `ReactNode \| { element?, icon?, inset? }`   | —       | Before add-on   |
| `after`          | `ReactNode \| { element?, icon?, inset? }`   | —       | After add-on    |
| `errorMessage`   | `string \| string[]`                         | —       | Error messages  |
| `hint`           | `ReactNode`                                  | —       | Hint text       |
| `supportingText` | `ReactNode`                                  | —       | Supporting text |

**Incorrect (wrong prop names `prefix`/`suffix`)**

```tsx
<InputGroup label="Amount" prefix="$" suffix=".00">
  <Input />
</InputGroup>
```

**Correct**

```tsx
<InputGroup label="Amount" before={{ element: '$' }} after={{ element: '.00' }}>
  <Input />
</InputGroup>
```

**Capabilities:** Before/after add-ons (text, icon, or inset) · Label/hint/error composition · ARIA attributes

---

## Label

**Import:** `import { Label } from '@westpac/ui/label';`

Form field label.

| Prop      | Type                      | Default | Description         |
| --------- | ------------------------- | ------- | ------------------- |
| `size`    | `ResponsiveVariants<...>` | —       | Label size          |
| `spacing` | `ResponsiveVariants<...>` | —       | Spacing             |
| `srOnly`  | `boolean`                 | —       | Screen reader only  |
| `tag`     | `'label' \| 'legend'`     | —       | HTML element        |
| `htmlFor` | `string`                  | —       | Associated input id |

**Incorrect (unsupported `as` prop instead of `tag`)**

```tsx
<Label as="legend">Account details</Label>
```

**Correct**

```tsx
<Label tag="legend" size="medium">
  Account details
</Label>
```

---

## Link

**Import:** `import { Link } from '@westpac/ui/link';`

Styled anchor link.

| Prop         | Type                                | Default      | Description             |
| ------------ | ----------------------------------- | ------------ | ----------------------- |
| `type`       | `'inline' \| 'standalone'`          | `standalone` | Link type               |
| `underline`  | `boolean`                           | `true`       | Show underline (inline) |
| `iconBefore` | `(props: IconProps) => JSX.Element` | —            | Icon before             |
| `iconAfter`  | `(props: IconProps) => JSX.Element` | —            | Icon after              |
| `iconSize`   | `'xsmall'-'xlarge'`                 | `small`      | Icon size               |

**Incorrect (wrong prop name `variant` instead of `type`)**

```tsx
<Link href="/page" variant="standalone" iconAfter={ArrowRightIcon}>
  Learn more
</Link>
```

**Correct**

```tsx
<Link href="/page" type="standalone" iconAfter={ArrowRightIcon}>
  Learn more
</Link>
```

**Capabilities:** Inline or standalone · Icons before/after · Built on react-aria link

---

## List

**Import:** `import { List, ListItem } from '@westpac/ui/list';`

Styled lists with various bullet types.

| Prop      | Type                                                                           | Default | Description   |
| --------- | ------------------------------------------------------------------------------ | ------- | ------------- |
| `type`    | `'bullet' \| 'link' \| 'tick' \| 'cross' \| 'unstyled' \| 'icon' \| 'ordered'` | —       | Bullet type   |
| `look`    | `'primary' \| 'hero' \| 'success' \| 'danger' \| 'link'`                       | —       | Color         |
| `icon`    | `(props: IconProps) => JSX.Element`                                            | —       | Custom icon   |
| `spacing` | `'medium' \| 'large'`                                                          | —       | Spacing       |
| `nested`  | `number`                                                                       | —       | Nesting level |

**Incorrect (raw `<li>` instead of `ListItem`)**

```tsx
<List type="tick" look="success">
  <li>Item 1</li>
  <li>Item 2</li>
</List>
```

**Correct**

```tsx
<List type="tick" look="success">
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
</List>
```

**Capabilities:** Bullet/tick/cross/icon/ordered types · Color looks · Nesting · Custom icons

---

## Modal

**Import:** `import { Modal, ModalBody, ModalFooter } from '@westpac/ui/modal';`

Dialog overlay.

| Prop                    | Type                      | Default | Description     |
| ----------------------- | ------------------------- | ------- | --------------- |
| `size`                  | `ResponsiveVariants<...>` | —       | Modal size      |
| `fullscreen`            | `boolean`                 | —       | Fullscreen mode |
| `backdropClassName`     | `string`                  | —       | Backdrop styles |
| `open` (on backdrop)    | via ModalBackdropProps    | —       | Open state      |
| `onClose` (on backdrop) | via ModalBackdropProps    | —       | Close handler   |

**Incorrect (wrong `isOpen` prop and missing `ModalBody`/`ModalFooter`)**

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>
<Modal isOpen={open} title="Modal Title" size="medium">
  <div>Content</div>
  <Button onClick={() => setOpen(false)}>Close</Button>
</Modal>
```

**Correct**

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open</Button>
<Modal open={open} onClose={() => setOpen(false)} title="Modal Title" size="medium">
  <ModalBody>Content</ModalBody>
  <ModalFooter>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </ModalFooter>
</Modal>
```

**Capabilities:** Responsive size · Fullscreen · Compound with ModalBody/ModalFooter · Controlled open/close · Backdrop customization

---

## MultiSelect

**Import:** `import { MultiSelect } from '@westpac/ui/multi-select';`

Multiple selection dropdown.

**Incorrect (native `option` children instead of the `items` prop with a render function)**

```tsx
<MultiSelect placeholder="Select option">
  <option value="1">Aerospace</option>
  <option value="2">Mechanical</option>
</MultiSelect>
```

**Correct**

```tsx
const options = [
  { key: 1, textValue: 'Aerospace' },
  { key: 2, textValue: 'Mechanical' },
];

<MultiSelect items={options} selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
  {option => (
    <MultiSelectItem key={option.key} textValue={option.textValue}>
      {option.textValue}
    </MultiSelectItem>
  )}
</MultiSelect>;
```

**Capabilities:** Multiple item selection · Built on internal selection state

---

## Pagination

**Import:** `import { Pagination } from '@westpac/ui/pagination';`

Page navigation controls.

**Incorrect (unsupported `pages` prop)**

```tsx
<Pagination current={1} pages={10} onChange={setPage} />
```

**Correct**

```tsx
<Pagination current={1} totalPages={10} onChange={setPage} />
```

**Capabilities:** Page number display · Previous/next navigation · Custom hook available via `@westpac/ui/hook`

---

## Panel

**Import:** `import { Panel } from '@westpac/ui/panel';`

Content panel with optional header.

**Incorrect (invalid `look` value)**

```tsx
<Panel heading="Payment details" look="primary">
  <PanelBody>Review your payment details.</PanelBody>
</Panel>
```

**Correct**

```tsx
<Panel heading="Payment details" headingTag="h2" look="faint">
  <PanelBody>Review your payment details.</PanelBody>
  <PanelFooter>Last updated today</PanelFooter>
</Panel>
```

**Capabilities:** Panel wrapper for content sections

---

## PassCode / PassCodeView

**Import:** `import { PassCode } from '@westpac/ui/pass-code';`
**Import:** `import { PassCodeView } from '@westpac/ui/pass-code-view';`

PIN/passcode entry components.

**Incorrect (unsupported prop names and passcode `type`)**

```tsx
<>
  <PassCode digits={6} type="numeric" onComplete={handleComplete} />
  <PassCodeView codeLength={6} onSubmit={handleComplete} />
</>
```

**Correct**

```tsx
<>
  <PassCode length={6} type="numbers" oneTimeCode onComplete={handleComplete} />
  <PassCodeView
    header="Enter SMS code"
    description="Sent to mobile ending 1234"
    passCodeLength={6}
    onComplete={handleComplete}
    onResend={handleResend}
  />
</>
```

**Capabilities:** Secure code entry · Visual passcode display

---

## Pictogram

**Import:** `import { Pictogram } from '@westpac/ui/pictogram';`

> **Note:** Only available via the sub-path import `@westpac/ui/pictogram`, not from the main `@westpac/ui` barrel export.

Illustrative pictograms (larger than icons).

**Incorrect (no generic `Pictogram` component — use the named export)**

```tsx
import { Pictogram } from '@westpac/ui/pictogram';

<Pictogram name="padlock-locked" mode="colour" />;
```

**Correct**

```tsx
import { PadlockLockedPictogram } from '@westpac/ui/pictogram';

<PadlockLockedPictogram mode="duo" aria-label="Secure" />;
```

---

## Popover

**Import:** `import { Popover } from '@westpac/ui/popover';`

Floating content panel triggered by interaction.

**Incorrect (invalid `placement` value)**

```tsx
<Popover heading="Help" content="This explains the field." placement="right">
  More info
</Popover>
```

**Correct**

```tsx
<Popover heading="Help" content="This explains the field." placement="bottom">
  More info
</Popover>
```

**Capabilities:** Positioned relative to trigger · Portal support

---

## ProgressBar

**Import:** `import { ProgressBar } from '@westpac/ui/progress-bar';`

Visual progress indicator bar.

**Incorrect (wrong value prop name `percent`)**

```tsx
<ProgressBar percent={50} look="default" />
```

**Correct**

```tsx
<ProgressBar value={50} look="default" />
```

**Capabilities:** Value-based progress display

---

## ProgressIndicator

**Import:** `import { ProgressIndicator } from '@westpac/ui/progress-indicator';`

Step-based progress indicator.

**Incorrect (wrong prop name `text` instead of `label`)**

```tsx
<ProgressIndicator size="large" text="Signing in..." />
```

**Correct**

```tsx
import { PadlockTickIcon } from '@westpac/ui/icon';

<ProgressIndicator size="large" icon={PadlockTickIcon} label="Signing in..." />;
```

---

## ProgressRope

**Import:** `import { ProgressRope } from '@westpac/ui/progress-rope';`

Vertical progress indicator with connected steps.

**Incorrect (children instead of the `data` prop)**

```tsx
<ProgressRope current={1}>
  <div>Step 1</div>
  <div>Step 2</div>
</ProgressRope>
```

**Correct**

```tsx
<ProgressRope current={1} data={[{ text: 'Step 1' }, { text: 'Step 2' }, { text: 'Review and submit' }]} />
```

---

## RadioGroup

**Import:** `import { RadioGroup } from '@westpac/ui/radio-group';`

Group of radio buttons.

**Incorrect (`RadioGroupRadio` children instead of the `radios` prop)**

```tsx
<RadioGroup label="Choose an option">
  <RadioGroupRadio value="one" label="Option 1" />
  <RadioGroupRadio value="two" label="Option 2" />
</RadioGroup>
```

**Correct**

```tsx
<RadioGroup
  label="Choose an option"
  radios={[
    { value: 'one', label: 'Option 1' },
    { value: 'two', label: 'Option 2' },
  ]}
/>
```

**Capabilities:** Responsive size/orientation · Error/hint messages · Built on react-aria · Similar API to CheckboxGroup

---

## Repeater

**Import:** `import { Repeater } from '@westpac/ui/repeater';`

Repeatable form sections with add/remove.

**Incorrect (plain `div` instead of `RepeaterItem`)**

```tsx
<Repeater onAdd={handleAdd}>
  <div>
    <Field label="Primary">
      <Input name="item-0" />
    </Field>
  </div>
</Repeater>
```

**Correct**

```tsx
<Repeater onAdd={handleAdd} addText="Add another">
  <RepeaterItem onRemove={handleRemove}>
    <Field label="Primary">
      <Input name="item-0" />
    </Field>
  </RepeaterItem>
</Repeater>
```

---

## Select

**Import:** `import { Select } from '@westpac/ui/select';`

Native `<select>` dropdown.

| Prop            | Type                      | Default  | Description                  |
| --------------- | ------------------------- | -------- | ---------------------------- |
| `size`          | `ResponsiveVariants<...>` | `medium` | Select size                  |
| `width`         | `ResponsiveVariants<...>` | `auto`   | Select width                 |
| `invalid`       | `boolean`                 | `false`  | Invalid state                |
| `enableTooltip` | `boolean`                 | `false`  | Title tooltip for truncation |

**Incorrect (invalid `size` value)**

```tsx
<Select size="big">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

**Correct**

```tsx
<Select size="large">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

**Capabilities:** Responsive size/width · Invalid state · Native `<option>` children · Tooltip for truncated options

---

## Selector

**Import:** `import { Selector } from '@westpac/ui/selector';`

Visual selection component (card-style radio/checkbox).

**Incorrect (native inputs instead of Selector options)**

```tsx
<Selector type="checkbox">
  <label>
    <input type="checkbox" value="email" /> Email alerts
  </label>
</Selector>
```

**Correct**

```tsx
<Selector type="checkbox">
  <SelectorCheckbox value="email">
    <SelectorLabel>Email alerts</SelectorLabel>
  </SelectorCheckbox>
</Selector>
```

---

## SkipLink

**Import:** `import { SkipLink } from '@westpac/ui/skip-link';`

Accessibility skip navigation link.

**Incorrect (wrong `target` prop)**

```tsx
<SkipLink target="#main-content">Skip to main content</SkipLink>
```

**Correct**

```tsx
<SkipLink href="#main-content">Skip to main content</SkipLink>
```

---

## Switch

**Import:** `import { Switch } from '@westpac/ui/switch';`

Toggle switch control.

**Incorrect (children instead of the required `label` prop)**

```tsx
<Switch checked>eStatements</Switch>
```

**Correct**

```tsx
<Switch label="eStatements" checked />
```

---

## Symbol

**Import:** `import { Symbol } from '@westpac/ui/symbol';`

> **Note:** Only available via the sub-path import `@westpac/ui/symbol`, not from the main `@westpac/ui` barrel export.

Brand symbols and logos.

**Incorrect (no generic `Symbol` component — use the named export)**

```tsx
import { Symbol } from '@westpac/ui/symbol';

<Symbol name="WBCLogo" />;
```

**Correct**

```tsx
import { WBCLogo } from '@westpac/ui/symbol';

<WBCLogo />;
```

---

## Table

**Import:** `import { Table } from '@westpac/ui/table';`

Data table component.

**Incorrect (native table elements instead of Table sub-components)**

```tsx
<Table>
  <thead>
    <tr>
      <th>Name</th>
    </tr>
  </thead>
</Table>
```

**Correct**

```tsx
<Table>
  <TableHeader>
    <TableHeaderRow>
      <TableHeaderCell>Name</TableHeaderCell>
    </TableHeaderRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Games</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## Tabs

**Import:** `import { Tabs, TabsPanel } from '@westpac/ui/tabs';`

Tabbed content panels.

| Prop           | Type                                             | Default | Description     |
| -------------- | ------------------------------------------------ | ------- | --------------- |
| `look`         | `ResponsiveVariants<...>`                        | —       | Tab style       |
| `orientation`  | `ResponsiveVariants<'horizontal' \| 'vertical'>` | —       | Layout          |
| `color`        | `TabsTabProps['color']`                          | —       | Tab color       |
| `justify`      | `boolean`                                        | —       | Full width tabs |
| `sticky`       | `ResponsiveVariants<boolean>`                    | —       | Sticky position |
| `stickyOffset` | `{ top?, bottom?, left?, right? }`               | —       | Sticky offset   |

**Incorrect (wrong prop name `label` and missing `key`)**

```tsx
<Tabs>
  <TabsPanel label="Tab 1">Content 1</TabsPanel>
  <TabsPanel label="Tab 2">Content 2</TabsPanel>
</Tabs>
```

**Correct**

```tsx
<Tabs>
  <TabsPanel key="1" title="Tab 1">
    Content 1
  </TabsPanel>
  <TabsPanel key="2" title="Tab 2">
    Content 2
  </TabsPanel>
</Tabs>
```

**Capabilities:** Responsive look/orientation/sticky · Horizontal or vertical · Justified · Sticky with offset · Built on react-aria/react-stately tabs

---

## Textarea

**Import:** `import { Textarea } from '@westpac/ui/textarea';`

Multi-line text input.

**Incorrect (invalid `size` value)**

```tsx
<Textarea size="xl" placeholder="Tell us more" />
```

**Correct**

```tsx
<Textarea size="xlarge" placeholder="Tell us more" />
```

**Capabilities:** Similar API to Input · Responsive size/width · Invalid state

---

## VisuallyHidden

**Import:** `import { VisuallyHidden } from '@westpac/ui/visually-hidden';`

Hides content visually but keeps it accessible to screen readers.

**Incorrect (`display: none` hides content from screen readers too)**

```tsx
<span style={{ display: 'none' }}>Screen reader only text</span>
```

**Correct**

```tsx
<VisuallyHidden>Screen reader only text</VisuallyHidden>
```

---

## Well

**Import:** `import { Well } from '@westpac/ui/well';`

Inset content container.

**Incorrect (invalid `color` value)**

```tsx
<Well color="grey">Look, I'm in a well</Well>
```

**Correct**

```tsx
<Well color="light" tag="aside">
  Look, I'm in a well
  <Well color="white">I am nested inside</Well>
</Well>
```

**Capabilities:** Content grouping with visual inset
