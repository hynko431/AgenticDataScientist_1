import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { WizardProvider } from '@/lib/WizardContext';
import { SafeHydration } from '@/components/SafeHydration';

export const metadata: Metadata = {
  title: 'Agentic Data Scientist',
  description: 'AI-powered multi-agent data analysis platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning data-gramm="false" data-lt-active="false" data-no-translation="true">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body suppressHydrationWarning data-gramm="false" data-lt-active="false">
        <SafeHydration>
          <WizardProvider>
            <div className="app-shell" suppressHydrationWarning>
              <Sidebar />
              <main className="main-content" suppressHydrationWarning>{children}</main>
            </div>
          </WizardProvider>
        </SafeHydration>
      </body>
    </html>
  );
}
