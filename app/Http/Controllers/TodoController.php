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
    private const TODOS_PER_PAGE = 10;
    private const DATETIME_FORMAT = 'Y-m-d\TH:i';

    public function index(Request $request): Response
    {
        $query = $this->user()->todos()
            ->orderBy('completed')
            ->orderBy('deadline')
            ->orderBy('created_at');

        if ($request->query->has('only_uncompleted')) {
            $query->where('completed', '=', 0);
        }

        if ($from = $request->query('from')) {
            $dateTimeFrom = \DateTimeImmutable::createFromFormat(self::DATETIME_FORMAT, $from);

            $query->where('deadline', '>=', $dateTimeFrom)
                ->whereNotNull('deadline');
        }

        if ($to = $request->query('to')) {
            $dateTimeTo = \DateTimeImmutable::createFromFormat(self::DATETIME_FORMAT, $to);

            $query->where('deadline', '<=', $dateTimeTo)
                ->whereNotNull('deadline');
        }

        $todosPager = $query->simplePaginate(self::TODOS_PER_PAGE);

        return Inertia::render('Home', [
            'todos' => $todosPager->items(),
            'page' => $todosPager->currentPage(),
            'hasMorePages' => $todosPager->hasMorePages(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('create', Todo::class);

        $data = Todo::validate($request->all());
        $this->user()
            ->todos()
            ->create($data);

        return back();
    }

    public function update(Request $request, Todo $todo): RedirectResponse
    {
        Gate::authorize('update', $todo);

        $data = Todo::validate($request->all());
        $todo->update($data);

        return back();
    }

    public function destroy(Todo $todo): RedirectResponse
    {
        Gate::authorize('delete', $todo);

        $todo->delete();

        return back();
    }
}
