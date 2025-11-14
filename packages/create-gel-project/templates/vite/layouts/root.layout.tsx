export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-brand="wbc">
      <body>
        <main
          className={`
            m-auto flex min-h-screen max-w-[1923px] flex-col overscroll-y-none
            border border-y-0 border-border-muted-soft
          `}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
