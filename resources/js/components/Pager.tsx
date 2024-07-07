import { Button } from '@/components/Button';
import { router } from '@inertiajs/react';

export function Pager({ hasMore, page }: { hasMore: boolean, page: number }) {
    function navigate(page: number) {
        const currentSearch = new URLSearchParams(window.location.search);
        currentSearch.set('page', page.toString());

        const query = Object.fromEntries(currentSearch.entries());

        router.get(route('todos.index', query));
    }

    return (
        <div className="inline-flex">
            <div className="rounded-md overflow-hidden shadow-sm border-2">
                <Button
                    disabled={page <= 1}
                    onClick={() => navigate(page - 1)}
                    className="p-4 rounded-none shadow-none border-r bg-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </Button>

                <Button
                    disabled={!hasMore}
                    onClick={() => navigate(page + 1)}
                    className="p-4 rounded-none shadow-none border-l bg-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </Button>
            </div>
        </div>
    );
}
