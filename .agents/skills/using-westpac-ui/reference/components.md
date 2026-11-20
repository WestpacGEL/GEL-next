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
