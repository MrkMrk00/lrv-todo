import { Button } from '@/components/Button';
import { Input } from '@/components/Form';
import { CollapseChevron } from '@/components/Icons';
import { Toggle } from '@/components/Toggle';
import { toIsoDatetime } from '@/utils';
import { router } from '@inertiajs/react';
import {
    type Dispatch,
    type MouseEvent,
    type SetStateAction,
    useEffect,
    useState,
} from 'react';

function Clear({
    onClick,
}: {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
    return (
        <Button
            type="button"
            onClick={onClick}
            className="text-white bg-red-500"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                />
            </svg>
        </Button>
    );
}

type Filter = {
    only_uncompleted: 1 | null;
    from: Date | null;
    to: Date | null;
};

export function TodoFilter() {
    const [hasChanged, setHasChanged] = useState(false);
    const [filter, setFilterValue] = useState<Filter>(() => {
        const search = new URLSearchParams(window.location.search);

        return {
            only_uncompleted: search.has('only_uncompleted') ? 1 : null,
            from: search.has('from') ? new Date(search.get('from')!) : null,
            to: search.has('to') ? new Date(search.get('to')!) : null,
        };
    });

    const setFilter: Dispatch<SetStateAction<typeof filter>> = param => {
        setFilterValue(param);
        setHasChanged(true);
    };

    const [showFilter, setShowFilter] = useState(true);

    useEffect(() => {
        if (!hasChanged) {
            return;
        }

        handleFilter();
    }, [hasChanged, filter]);

    function handleFilter() {
        const search = new URLSearchParams(window.location.search);
        for (const [key, value] of Object.entries(filter)) {
            if (value === null) {
                search.delete(key);
                continue;
            }

            if (value instanceof Date) {
                search.set(key, toIsoDatetime(value));

                continue;
            }

            search.set(key, value.toString());
        }

        // Při změně filtru se může změnit i počet stránek - reset query parametru page
        search.delete('page');

        router.visit(route('todos.index', Object.fromEntries(search)), {
            preserveState: true,
        });
    }

    return (
        <form className="flex flex-col gap-2">
            <button
                onClick={() => setShowFilter(prev => !prev)}
                type="button"
                className="w-full flex justify-between bg-gray-50 p-2 border-y-2"
            >
                <h3 className="text-lg font-semibold">Filtrování</h3>
                <CollapseChevron isOpen={showFilter} />
            </button>

            {showFilter && (
                <>
                    <div className="flex justify-between gap-4 px-2 py-4">
                        <label className="inline-flex gap-4 items-center">
                            <small>
                                Pouze
                                <br />
                                nesplněné
                            </small>
                            <Toggle
                                onChange={checked => {
                                    setFilter(prev => ({
                                        ...prev,
                                        only_uncompleted: checked ? 1 : null,
                                    }));
                                }}
                                checked={filter.only_uncompleted === 1}
                                name="only_uncompleted"
                            />
                        </label>

                        <label className="inline-flex gap-4 items-center">
                            <small>
                                Deadline
                                <br />
                                od
                            </small>
                            <Input
                                value={
                                    filter.from
                                        ? toIsoDatetime(filter.from)
                                        : ''
                                }
                                onChange={ev => {
                                    if (!ev.currentTarget) {
                                        return;
                                    }

                                    setFilter(prev => ({
                                        ...prev,
                                        from: ev.currentTarget?.valueAsDate,
                                    }));
                                }}
                                type="datetime-local"
                                name="from"
                            />
                            <Clear
                                onClick={() =>
                                    setFilter(prev => ({ ...prev, from: null }))
                                }
                            />
                        </label>

                        <label className="inline-flex gap-4 items-center">
                            <small>
                                Deadline
                                <br />
                                do
                            </small>
                            <Input
                                value={
                                    filter.to ? toIsoDatetime(filter.to) : ''
                                }
                                onChange={ev => {
                                    if (!ev.currentTarget) {
                                        return;
                                    }

                                    setFilter(prev => ({
                                        ...prev,
                                        to: ev.currentTarget?.valueAsDate,
                                    }));
                                }}
                                type="datetime-local"
                                name="to"
                            />
                            <Clear
                                onClick={() =>
                                    setFilter(prev => ({ ...prev, to: null }))
                                }
                            />
                        </label>
                    </div>
                    <hr />
                </>
            )}
        </form>
    );
}
