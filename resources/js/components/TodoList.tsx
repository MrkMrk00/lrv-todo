import { Button } from '@/components/Button';
import { Input } from '@/components/Form';
import type { Todo } from '@/types';
import { cn, useDebounced } from '@/utils';
import { router, useForm } from '@inertiajs/react';
import {
    type ComponentPropsWithoutRef,
    type FormEvent,
    type ReactNode,
    useEffect,
    useState,
} from 'react';
import { toast } from 'sonner';

export type EditableTodo = Pick<Todo, 'completed' | 'title' | 'description'> & {
    deadline: Date | null;
};

export type TodoEditFormProps = {
    data: EditableTodo;
    setData: <TKey extends keyof EditableTodo>(
        key: TKey,
        value: EditableTodo[TKey],
    ) => void;
    buttons?: ReactNode;
    editDisabled?: boolean;
};

export function TodoEditForm({
    data,
    setData,
    buttons,
    editDisabled,
}: TodoEditFormProps) {
    return (
        <>
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
                disabled={editDisabled}
            />
            <Input
                type="text"
                name="description"
                placeholder="..."
                className="w-full"
                value={data.description ?? ''}
                onChange={ev => setData('description', ev.target.value)}
                disabled={editDisabled}
            />
            <Input
                type="datetime-local"
                name="deadline"
                value={data.deadline?.toISOString().slice(0, 16) ?? ''}
                onChange={ev =>
                    setData('deadline', ev.target.valueAsDate as Date)
                }
                disabled={editDisabled}
            />
            {buttons}
        </>
    );
}

function ActionButton({
    className,
    children,
    ...restProps
}: ComponentPropsWithoutRef<typeof Button>) {
    return (
        <Button
            type="button"
            className={cn(
                'text-center text-white p-0 px-3 py-1 text-4xl',
                className,
            )}
            {...restProps}
        >
            {children}
        </Button>
    );
}

export function AddTodoRow() {
    const { post, reset, data, setData } = useForm({
        completed: false,
        title: '',
        description: '',
        deadline: null as Date | null,
    });

    function handleAddNewTodo(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        post(route('todos.store'), {
            onSuccess: () => {
                toast.success(`Nové todo ${data.title} přidáno`);
                reset();
            },
            onError: err => {
                const errorMessage = Object.entries(err).reduce(
                    (acc, [key, value]) => acc + `${key}: ${value};`,
                    '',
                );

                toast.error(
                    `Vytvoření nového todo se nepodařilo: ${errorMessage}`,
                );
            },
        });
    }

    return (
        <form
            onSubmit={handleAddNewTodo}
            action={route('todos.store')}
            method="post"
            className="w-full flex flex-row justify-between p-4 border gap-4 bg-gray-100"
        >
            <TodoEditForm
                data={data}
                setData={setData}
                buttons={
                    <ActionButton type="submit" className="bg-green-500">
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
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </ActionButton>
                }
            />
        </form>
    );
}

function getInitialTodo(todo: Todo) {
    return {
        completed: todo.completed,
        title: todo.title,
        description: todo.description,
        deadline: todo.deadline ? new Date(todo.deadline) : null,
    };
}

function objectIsSame(a: object, b: object) {
    return JSON.stringify(a) === JSON.stringify(b);
}

export function TodoRow({ todo }: { todo: Todo }) {
    const [editMode, setEditMode] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const { put, data, setData, processing } = useForm(getInitialTodo(todo));
    const debouncedData = useDebounced(data, 500);

    useEffect(() => {
        let hasActuallyChanged = hasChanged;

        if (!hasChanged && !objectIsSame(data, getInitialTodo(todo))) {
            hasActuallyChanged = true;
            setHasChanged(true);
        }

        if (!hasActuallyChanged) {
            return;
        }

        put(route('todos.update', todo.id), {
            onError: err => {
                toast.error(
                    `Nepodařilo se uložit změny todo ${data.title}: ${err}`,
                );
            },
        });
    }, [debouncedData]);

    function deleteTodo() {
        router.delete(route('todos.destroy', todo.id), {
            onSuccess: () => {
                toast.success(`Todo ${data.title} bylo úspěšně smazáno.`);
            },
            onError: () => {
                toast.error(`Nepodařilo se smazat todo ${data.title}.`);
            },
        });
    }

    return (
        <div className="w-full flex flex-row justify-between px-2 xl:px-0 py-4 gap-4">
            <TodoEditForm
                data={data}
                setData={setData}
                editDisabled={!editMode}
                buttons={
                    <>
                        <ActionButton
                            disabled={processing}
                            onClick={() => setEditMode(prev => !prev)}
                            className="bg-blue-600"
                        >
                            {processing ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6 animate-spin"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                                    />
                                </svg>
                            ) : (
                                <>
                                    {editMode ? (
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
                                                d="m4.5 12.75 6 6 9-13.5"
                                            />
                                        </svg>
                                    ) : (
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
                                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                            />
                                        </svg>
                                    )}
                                </>
                            )}
                        </ActionButton>
                        <ActionButton
                            onClick={deleteTodo}
                            className="bg-red-500"
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
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                            </svg>
                        </ActionButton>
                    </>
                }
            />
        </div>
    );
}
