<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
    public function index(): Response
    {
        $todosPager = $this->user()
            ->todos()
            ->simplePaginate(20);

        return Inertia::render('Home', [
            'todos' => $todosPager->items(),
            'hasMorePages' => $todosPager->hasMorePages(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('create', Todo::class);

        $data = $request->validate([
            'completed' => 'required|boolean',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'nullable|datetime',
        ]);

        $this->user()->todos()->create($data);

        return to_route('todos.index');
    }

    public function update(Request $request, Todo $todo)
    {
        Gate::authorize('update', $todo);
    }

    public function destroy(Todo $todo)
    {
        Gate::authorize('delete', $todo);

        $todo->delete();

        return to_route('todos.index');
    }

    private function user(): User
    {
        return Auth::user();
    }
}
