---
name: migrating-to-westpac-ui-v1
description: 'Guides migration from pre-@westpac/ui 1.0 to v1.0. Use when upgrading GEL, migrating to v1, updating design tokens, running the token codemod, or fixing breaking changes from the v1 upgrade.'
---

# Migrating to @westpac/ui v1.0

Guide for migrating existing applications from pre-1.0 `@westpac/ui` to v1.0. For fresh installations, use the `installing-westpac-ui` skill instead.

## When to Use

Reference this guide when a user is using and older version of `@westpac/ui` (check `package.json`) and wants to upgrade to v1.0. This includes understanding the major breaking changes, running the token codemod, updating Tailwind CSS configuration, and fixing component API changes.

## Major Changes from v0.x

v1.0 introduces a new architecture separating UI components from style configuration:

- `@westpac/style-config` is a **new required package** that provides:
  - Tailwind tokens
  - Light/dark theming
  - CSS + W3C design tokens
- Tailwind CSS upgraded from v3 to **v4**
- All color tokens renamed to support multi-brand + dual-theme

## Steps

1. Upgrade Tailwind CSS to v4

Remove your existing `tailwind.config.js` and follow the [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide). If the automated upgrade command doesn't work, follow the manual instructions on that page.

2. Install Updated Dependencies

```bash
npm i @westpac/ui @westpac/style-config tailwindcss@4 postcss tailwind-variants@~3.1.1
```

3. Update CSS Imports

Replace your existing Tailwind/GEL CSS setup with:

```css
@import 'tailwindcss';
@import '@westpac/style-config/tailwind';

/* Import brand themes you need: */
@import '@westpac/style-config/themes/wbc';
@import '@westpac/style-config/themes/stg';
@import '@westpac/style-config/themes/bom';
@import '@westpac/style-config/themes/bsa';

/* Brand font @font-face declarations (update paths to your font files) */
/* WBC fonts */
@font-face {
  src:
    url('/fonts/Westpac-Bold-v2.007.woff2') format('woff2'),
    url('/fonts/Westpac-Bold-v2.007.woff') format('woff');
  font-family: 'Westpac';
  font-weight: 100 900;
  font-style: normal;
}

/* STG fonts */
@font-face {
  src:
    url('/fonts/dragonbold-bold-webfont.woff2') format('woff2'),
    url('/fonts/dragonbold-bold-webfont.woff') format('woff');
  font-family: 'Dragon Bold';
  font-weight: 100 900;
  font-style: normal;
}
```

4. Update Brand Attribute

The brand attribute has changed from `data-theme` to `data-brand`:

##### Before

```html
<html data-theme="wbc"></html>
```

##### After

```html
<html data-brand="wbc" data-theme="light"></html>
```

> **Note:** Dark mode (`data-theme="dark"`) is disabled in this release.

5. Update ESLint Config (Optional if using @westpac/eslint-config)

```js
// eslint.config.mjs
import eslintConfig from '@westpac/eslint-config/nextjs';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...eslintConfig,
  {
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/globals.css',
      },
    },
  },
]);
```

6. Run the Token Codemod

```bash
# Install jscodeshift if needed
npm install -g jscodeshift

# Run the codemod against your source files
npx jscodeshift --parser=tsx -t node_modules/@westpac/ui/scripts/codemods/gel-tokens-tailwind-v1.cjs <path>/**/*.tsx
```

## Change References

1. Token Updates
   - 1.1 Update Examples
   - 1.2 Running the Token Codemod
2. Import Path Changes
   - 2.1 Style Constants
3. Component API Changes
   - 3.1 Accordion
   - 3.2 ButtonGroup
   - 3.3 DatePicker
   - 3.4 Compacta
   - 3.5 Repeater
   - 3.6 BottomSheet
   - 3.7 Pictogram
4. Deprecated Components & APIs
5. Form Migration Example
6. Removed Symbols & Logos
   - 6.1 Logos
   - 6.2 Symbols

### 1. Token Updates

All color tokens have been renamed to support the multi-brand + dual-theme system. **This is the largest change and affects all custom Tailwind classes in your codebase.**

#### 1.1 Update Examples

##### Before

```tsx
<div className="bg-white">
  <div className="bg-primary rounded-full">
    <AccountIcon color="white" />
  </div>
  <h2 className="text-text">
    My title
    <BankIcon color="link" className="ml-2" />
  </h2>
  <p className="text-text">Lorem ipsum dolor sit amet</p>
</div>
```

##### After

```tsx
<div className="bg-background-white">
  <div className="bg-surface-primary rounded-full">
    <AccountIcon color="mono" />
  </div>
  <h2 className="text-text-body">
    My title
    <BankIcon color="primary" className="ml-2" />
  </h2>
  <p className="text-text-body">Lorem ipsum dolor sit amet</p>
</div>
```

#### 1.2 Running the Token Codemod

A codemod is provided to automate the token migration:

```bash
# Install jscodeshift if needed
npm install -g jscodeshift

# Run the codemod against your source files
npx jscodeshift --parser=tsx -t node_modules/@westpac/ui/scripts/codemods/gel-tokens-tailwind-v1.cjs <path>/**/*.tsx
```

**Important notes:**

- The `--parser` parameter may need to be `babel`, `flow`, `ts`, or `tsx` depending on your project
- You may need to run the codemod multiple times depending on project structure
- For classes that can't be automatically mapped, the codemod injects `[REPLACE_TOKEN]` — work with your designer to replace these with the correct token
- As a temporary measure, you can replace unknown tokens with a close match or hex value (e.g., `text-black` → `text-[#000]`)

The codemod script source: [gel-tokens-tailwind-v1.cjs](https://github.com/WestpacGEL/GEL-next/blob/develop/packages/ui/scripts/codemods/gel-tokens-tailwind-v1.cjs)

### 2. Import Path Changes

#### 2.1 Style Constants

##### Before

```tsx
import { BREAKPOINTS, SPACING_UNIT } from '@westpac/ui/theme-constants';
```

##### After

```tsx
import { BREAKPOINTS, SPACING_UNIT } from '@westpac/style-config/constants';
```

### 3. Component API Changes

#### 3.1 Accordion — uses react-aria useDisclose

`defaultExpandedKeys` now works off the `id` value of AccordionItem:

##### Before

```tsx
<Accordion defaultExpandedKeys={['FoR']}>
  <AccordionItem title="Founding of Rome">Content</AccordionItem>
</Accordion>
```

##### After

```tsx
<Accordion defaultExpandedKeys={['FoR']}>
  <AccordionItem id="FoR" title="Founding of Rome">
    Content
  </AccordionItem>
</Accordion>
```

#### 3.2 ButtonGroup — compositional API

##### Before

```tsx
<ButtonGroup
  value={value}
  buttons={[
    { value: 'Left', label: 'Left' },
    { value: 'Middle', label: 'Middle' },
    { value: 'Right', label: 'Right' },
  ]}
/>
```

##### After

```tsx
<ButtonGroup selectedKeys={value}>
  <ButtonGroupButton id="Left">Left</ButtonGroupButton>
  <ButtonGroupButton id="Middle">Middle</ButtonGroupButton>
  <ButtonGroupButton id="Right">Right</ButtonGroupButton>
</ButtonGroup>
```

#### 3.3 DatePicker — react-aria based

`disableDates` prop replaced with `isDateUnavailable` function:

##### Before

```tsx
<DatePicker disableDates={['2023-10-10']} />
```

##### After

```tsx
import { DateValue } from '@internationalized/date';

const disableDates = ['2023-10-20'];
const isDateUnavailable = (date: DateValue) => disableDates.some(d => d.toString() === date.toString());

<DatePicker isDateUnavailable={isDateUnavailable} />;
```

#### 3.4 Compacta — simplified API

Moved from render-prop pattern to compositional children with `CompactaItem`:

##### Before

```tsx
<Compacta initialCompactas={[{ id: '1234', title: { primary: 'test' } }, {}]} onAdd={() => {}} onRemove={() => {}}>
  {({ id, setPrimaryTitle }) => (
    <Form>
      <FormGroup>
        <Label htmlFor={`primary-${id}`}>Primary</Label>
        <Input name={`primary-${id}`} onChange={e => setPrimaryTitle(e.target.value)} />
      </FormGroup>
    </Form>
  )}
</Compacta>
```

##### After

```tsx
<Compacta onAdd={handleAdd}>
  {items.map((item, index) => (
    <CompactaItem
      key={index}
      title={{ primary: item.primary, secondary: item.secondary, tertiary: item.tertiary }}
      onRemove={() => removeItem(index)}
    >
      <Field label="Primary" hintMessage="Primary title text">
        <Input {...register(`items.${index}.primary`)} />
      </Field>
    </CompactaItem>
  ))}
</Compacta>
```

#### 3.5 Repeater — aligned with Compacta

Same pattern change as Compacta — uses `RepeaterItem` children:

##### Before

```tsx
<Repeater>
  <FormGroup>
    <FormLabel htmlFor={`input${id}`}>Label</FormLabel>
    <Input name={`input${id}`} />
  </FormGroup>
</Repeater>
```

##### After

```tsx
<Repeater onAdd={handleAdd}>
  {items.map((item, index) => (
    <RepeaterItem key={index} title={{ primary: item.primary }} onRemove={() => removeItem(index)}>
      <Field label="Label">
        <Input {...register(`items.${index}.label`)} />
      </Field>
    </RepeaterItem>
  ))}
</Repeater>
```

#### 3.6 BottomSheet — isDismissable defaults to false

Now aligns with Modal behaviour:

##### Before

```tsx
<BottomSheet title="Title">Content</BottomSheet>
```

##### After

```tsx
<BottomSheet title="Title" isDismissable>
  Content
</BottomSheet>
```

#### 3.7 Pictogram — mode prop values renamed

##### Before

```tsx
type PictogramMode = 'dark' | 'light' | 'duo';
<Pictogram mode="dark" />;
```

##### After

```tsx
type PictogramMode = 'base' | 'mono' | 'duo';
<Pictogram mode="base" />;
```

### 4. Deprecated Components & APIs

| Deprecated                                         | Replacement / Notes                                                                  |
| -------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `ButtonDropdown`                                   | Replaced by `Dropdown`                                                               |
| `Form`, `FormGroup`, `FormChitChat`, `FormSection` | Removed — use `<form>` with `className="flex flex-col gap-4"` and `Field` components |
| `Pagination pages={[]}`                            | Removed — use `totalPages={number}` instead                                          |

### 5. Form Migration Example

##### Before

```tsx
<Form spacing="large" onSubmit={handleSubmit}>
  <FormGroup>
    <InputGroup size="large" label="Given name">
      <Input {...register('givenName')} />
    </InputGroup>
  </FormGroup>
  <FormGroup>
    <Field label="Comments:">
      <Textarea size="large" {...register('comment')} />
    </Field>
  </FormGroup>
</Form>
```

##### After

```tsx
<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
  <Field label="Given name">
    <InputGroup size="large">
      <Input {...register('givenName')} />
    </InputGroup>
  </Field>
  <Field label="Comments:">
    <Textarea size="large" {...register('comment')} />
  </Field>
</form>
```

### 6. Removed Symbols & Logos

The following have been removed. Contact the GEL design team if you believe a removal was incorrect.

#### 6.1 Logos

- BTPanormaMultibrandLargeLogo
- BTPanormaMultibrandSmallLogo
- RedAvatarCircleLogo
- RedAvatarCircleReverseLogo
- RedAvatarLogo

#### 6.2 Symbols

- GooglePlusSymbol
- MastercardAcceptedSymbol
- MastercardHorizontalSymbol
- MicrosoftStoreSymbol
- PayToBlackSymbol
- PayToDarkGreySymbol
- PayToLightGreySymbol
- PayToWhiteSymbol
- PayToWordmarkBlackSymbol
- PayToWordmarkDarkGreySymbol
- PayToWordmarkLightGreySymbol
- PayToWordmarkWhiteSymbol
- SlackSymbol
- TwitterSymbol
- VisaSymbol
- XMarkInverseSymbol
- XMarkSymbol
- YammerSymbol
