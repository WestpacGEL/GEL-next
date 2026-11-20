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
