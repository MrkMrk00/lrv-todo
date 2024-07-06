import type { PageProps, Todo } from '@/types';
import { Input, RequiredStar } from '@/components/Form';
import { Button } from '@/components/Button';
import { router, useForm } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
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

        post(route('todos.store'), {
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
            action={route('todos.store')}
            method="post"
            className="w-full flex flex-row justify-between p-4 border gap-4 bg-gray-100"
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                     stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </Button>
        </form>
    );
}

function TodoRow({ todo }: { todo: Todo }) {
    const { put } = useForm({

    });

    return (
        <div>
            {todo.title}
            <Button
                onClick={() => {
                    router.delete(route('todos.destroy', todo.id), {
                        onSuccess: () => {
                            toast.success(`TODO ${todo.title} úspěšně smazáno.`);
                        },
                    });
                }}
                className="bg-red-500 text-white"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </Button>
        </div>
    );
}

export default function Home(props: HomeProps) {
    const { todos } = props;
    const [showAddTodo, setShowAddTodo] = useState(!todos?.length);

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

            {!todos.length && (
                <strong className="text-2xl mx-auto pt-4">Ještě nemáš žádný TODOčka :(</strong>
            )}

            {todos.map(todo => (
                <TodoRow todo={todo} key={`todo-${todo.id}`} />
            ))}
        </main>
    );
}
