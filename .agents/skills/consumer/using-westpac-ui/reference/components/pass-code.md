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
