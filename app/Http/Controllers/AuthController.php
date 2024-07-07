<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function showLogin(): InertiaResponse
    {
        return Inertia::render('Login');
    }

    public function showRegister(): InertiaResponse
    {
        return Inertia::render('Register');
    }

    public function attemptLogin(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        return to_route('todos.index');
    }

    public function attemptRegister(RegisterRequest $request): RedirectResponse
    {
        try {
            $user = $request->tryRegister();
        } catch (\Throwable) {
            return back()->withErrors(['email' => 'Registrace se nezdařila.']);
        }

        Auth::login($user);

        return to_route('todos.index');
    }

    public function logout(Request $request): Response
    {
        Auth::logout();

        if ($request->isXmlHttpRequest()) {
            return response();
        }

        return to_route('login');
    }
}
