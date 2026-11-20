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
