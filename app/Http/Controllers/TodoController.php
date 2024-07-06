<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function store(Request $request)
    {
        $data = $request->validate([
            'completed' => 'required|boolean',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'nullable|datetime',
        ]);

        $this->user()->todos()->create($data);

        return to_route('index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        //
    }

    private function user(): User
    {
        return Auth::user();
    }
}
