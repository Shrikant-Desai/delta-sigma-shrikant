import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  headerTitle?: string;
  headerAction?: ReactNode;
}

export function Layout({ children, headerTitle, headerAction }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <header className="border-b bg-muted/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 w-full">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2 font-semibold text-lg">
            Dashboard
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 md:py-10 px-4 md:px-8 space-y-6 md:space-y-8">
        {(headerTitle || headerAction) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-0">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {headerTitle}
              </h2>
            </div>
            <div className="flex items-center space-x-2">{headerAction}</div>
          </div>
        )}

        <div className="flex flex-col gap-4">{children}</div>
      </main>
    </div>
  );
}
