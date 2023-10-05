export function DemoText({ children }: { children?: React.ReactNode }) {
  return (
    <p className="typography-body-10 mb-[0.875rem] text-muted">
      <em>{children}</em>
    </p>
  );
}
