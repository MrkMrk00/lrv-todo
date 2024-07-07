<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
    private const TODOS_PER_PAGE = 20;

    public function index(): Response
    {
        $todosPager = $this->user()
            ->todos()
            ->cursorPaginate(self::TODOS_PER_PAGE);

        return Inertia::render('Home', [
            'todos' => $todosPager->items(),
            'previous' => $todosPager->previousPageUrl(),
            'next' => $todosPager->nextPageUrl(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('create', Todo::class);

        $data = Todo::validate($request->all());
        $this->user()
            ->todos()
            ->create($data);

        return to_route('todos.index');
    }

    public function update(Request $request, Todo $todo): RedirectResponse
    {
        Gate::authorize('update', $todo);

        $data = Todo::validate($request->all());
        $todo->update($data);

        return to_route('todos.index');
    }

    public function destroy(Todo $todo): RedirectResponse
    {
        Gate::authorize('delete', $todo);

        $todo->delete();

        return to_route('todos.index');
    }
}
