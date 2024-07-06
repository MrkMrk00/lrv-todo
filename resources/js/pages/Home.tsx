import type { PageProps, Todo } from '@/types';
import { Input, RequiredStar } from '@/components/Form';
import { Button } from '@/components/Button';
import { useForm } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';

type HomeProps = PageProps<{
    todos: Todo[];
    hasMorePages: boolean;
}>;

function AddTodoRow() {
    const { post, reset, data, setData, errors } = useForm({
        completed: false,
        title: '',
        description: '',
        deadline: null as Date | null,
    });

    function handleSubmit(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        post(route('store'), {
            onSuccess: () => {
                toast.success(`Nové todo ${data.title} přidáno`);
                reset();
            },
            onError: (err) => {
                const errorMessage = Object.entries(err)
                    .reduce((acc, [key, value]) => acc + `${key}: ${value};`, '');

                toast.error(`Vytvoření nového todo se nepodařilo: ${errorMessage}`);
            },
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            action={route('store')}
            method="post"
            className="w-full flex flex-row justify-between p-4 border rounded-md gap-4 bg-gray-100"
        >
            <input
                type="checkbox"
                name="completed"
                value="Y"
                checked={data.completed}
                onChange={ev => setData('completed', ev.target.checked)}
            />
            <Input
                type="text"
                name="title"
                placeholder="Pověsit prádlo"
                className="w-full"
                maxLength={255}
                required
                minLength={1}
                value={data.title}
                onChange={ev => setData('title', ev.target.value)}
            />
            <Input
                type="text"
                name="description"
                placeholder="..."
                className="w-full"
                value={data.description}
                onChange={ev => setData('description', ev.target.value)}
            />
            <Input
                type="datetime-local"
                name="deadline"
                value={data.deadline?.toISOString().slice(0, 16) ?? ''}
                onChange={ev => setData('deadline', ev.target.valueAsDate as Date)}
            />
            <Button
                type="submit"
                className="text-center bg-green-500 text-white p-0 px-3 py-1 text-4xl"
            >
                +
            </Button>
        </form>
    );
}

function TodoRow(props: { todo: Todo }) {
    return (
        <div>

        </div>
    );
}

export default function Home(props: HomeProps) {
    const [showAddTodo, setShowAddTodo] = useState(true);

    return (
        <main className="flex flex-col justify-center max-w-4xl mx-auto w-full pt-4 gap-2">
            <div
                onClick={() => setShowAddTodo(prev => !prev)}
                className="flex flex-row justify-between p-2 bg-gray-50 border-y-2 cursor-pointer"
            >
                <h3 className="font-semibold text-lg">Přidej nové TODOčko</h3>

                {!showAddTodo ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg>
                )}
            </div>

            {showAddTodo && (
                <>
                    <div className="flex flex-row justify-between px-2 font-semibold">
                        <span className="w-full max-w-[10%]">Splněno</span>
                        <span className="w-full">Název<RequiredStar /></span>
                        <span className="w-full">Popis</span>
                        <span className="w-full">Deadline</span>
                    </div>

                    <AddTodoRow />
                    <hr className="border-b" />
                </>
            )}
        </main>
    );
}
