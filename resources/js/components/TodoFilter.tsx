import { Button } from '@/components/Button';
import { Input } from '@/components/Form';
import { CollapseChevron } from '@/components/Icons';
import { Toggle } from '@/components/Toggle';
import { router } from '@inertiajs/react';
import { type MouseEvent, type RefObject, useRef, useState } from 'react';

function Clear({
    inputRef,
    onClick,
}: {
    inputRef: RefObject<HTMLInputElement>;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
    return (
        <Button
            type="button"
            onClick={(ev: MouseEvent<HTMLButtonElement>) => {
                const element = inputRef?.current;
                if (!element) {
                    console.error('Element to clear not found.');
                    return;
                }

                element.value = '';

                if (onClick) {
                    onClick(ev);
                }
            }}
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

export function TodoFilter() {
    const [showFilter, setShowFilter] = useState(true);

    const formRef = useRef<HTMLFormElement>(null);
    const fromRef = useRef<HTMLInputElement>(null);
    const toRef = useRef<HTMLInputElement>(null);

    const timeout = useRef<number | null>(null);

    function handleFilter() {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        timeout.current = window.setTimeout(() => {
            if (!formRef.current) {
                console.error('Form element not found.');
                return;
            }

            const formData = new FormData(formRef.current);
            const query = Object.fromEntries(
                Array.from(formData.entries()).filter(([, value]) => !!value),
            );
            console.log(query);

            router.visit(route('todos.index', query), {
                preserveState: true,
            });
        }, 200);
    }

    return (
        <form
            onChange={handleFilter}
            ref={formRef}
            className="flex flex-col gap-2"
        >
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
                            <small>Pouze nesplněné</small>
                            <Toggle
                                onChange={handleFilter}
                                name="only_uncompleted"
                            />
                        </label>

                        <label className="inline-flex gap-4 items-center">
                            <small>Od</small>
                            <Input
                                ref={fromRef}
                                type="datetime-local"
                                name="from"
                            />
                            <Clear inputRef={fromRef} onClick={handleFilter} />
                        </label>

                        <label className="inline-flex gap-4 items-center">
                            <small>Do</small>
                            <Input
                                ref={toRef}
                                type="datetime-local"
                                name="to"
                            />
                            <Clear inputRef={toRef} onClick={handleFilter} />
                        </label>
                    </div>
                    <hr />
                </>
            )}
        </form>
    );
}
