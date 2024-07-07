import { AppLayout } from '@/components/AppLayout';
import { RequiredStar } from '@/components/Form';
import { CollapseChevron } from '@/components/Icons';
import { Pager } from '@/components/Pager';
import { TodoFilter } from '@/components/TodoFilter';
import { AddTodoRow, TodoRow } from '@/components/TodoList';
import type { PageProps, Todo } from '@/types';
import { useState } from 'react';

type HomeProps = PageProps<{
    todos: Todo[];
    page: number;
    hasMorePages: boolean;
}>;

export default function Home(props: HomeProps) {
    const { todos, page, hasMorePages } = props;
    const [showAddTodo, setShowAddTodo] = useState(!todos?.length);

    return (
        <AppLayout {...props}>
            <main className="flex flex-col justify-center max-w-4xl mx-auto w-full gap-2">
                <div
                    onClick={() => setShowAddTodo(prev => !prev)}
                    className="flex flex-row justify-between p-2 bg-gray-50 border-y-2 cursor-pointer"
                >
                    <h3 className="font-semibold text-lg">
                        Přidej nové TODOčko
                    </h3>

                    <CollapseChevron isOpen={showAddTodo} />
                </div>

                {showAddTodo && (
                    <>
                        <div className="flex flex-row justify-between px-2 font-semibold">
                            <span className="w-full max-w-[10%]">Splněno</span>
                            <span className="w-full">
                                Název
                                <RequiredStar />
                            </span>
                            <span className="w-full">Popis</span>
                            <span className="w-full">Deadline</span>
                        </div>

                        <AddTodoRow />
                        <hr />
                    </>
                )}

                <TodoFilter />

                {!todos.length && (
                    <strong className="text-2xl mx-auto pt-4">
                        Nic :/
                    </strong>
                )}

                {todos.map(todo => (
                    <TodoRow todo={todo} key={`todo-${todo.id}`} />
                ))}

                {!(page === 1 && !hasMorePages) && (
                    <Pager hasMore={hasMorePages} page={page} />
                )}
            </main>
        </AppLayout>
    );
}
