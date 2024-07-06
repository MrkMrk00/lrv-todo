import { Navbar } from '@/components/Navbar';
import type { PageProps } from '@/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

type LayoutProps = PropsWithChildren<PageProps>;

const client = new QueryClient();

export function AppLayout({ children, auth: { user } }: LayoutProps) {
    return (
        <QueryClientProvider client={client}>
            <div className="w-full h-full max-w-4xl flex flex-col mx-auto pt-8">
                <Navbar user={user} />
                {children}
            </div>

            <Toaster />
        </QueryClientProvider>
    );
}
