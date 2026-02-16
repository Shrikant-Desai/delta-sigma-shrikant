import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  headerTitle?: string;
  headerAction?: ReactNode;
}

export function Layout({ children, headerTitle, headerAction }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      {/* Navbar / Header */}
      <header className="border-b bg-muted/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 font-semibold text-lg">
            Dashboard
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-10 space-y-8">
        {/* Page Header */}
        {(headerTitle || headerAction) && (
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
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
