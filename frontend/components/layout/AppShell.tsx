'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLandingPage = pathname === '/';

    return (
        <div className={isLandingPage ? "lp-wrapper" : "app-shell"} suppressHydrationWarning>
            {!isLandingPage && <Sidebar />}
            <main className="main-content" suppressHydrationWarning>{children}</main>
        </div>
    );
}
