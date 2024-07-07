import { Navbar } from '@/components/Navbar';
import type { PageProps } from '@/types';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

type LayoutProps = PropsWithChildren<PageProps>;

export function AppLayout({ children, auth: { user } }: LayoutProps) {
    return (
        <>
            <div className="w-full h-full max-w-4xl flex flex-col mx-auto">
                <Navbar user={user} />
                {children}
                <Toaster />
            </div>
        </>
    );
}
