<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function showLogin(): Response
    {
        return Inertia::render('Login');
    }

    public function showRegister(): Response
    {
        return Inertia::render('Register');
    }

    public function attemptLogin(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        return to_route('home');
    }

    public function attemptRegister(RegisterRequest $request): RedirectResponse
    {
        try {
            $user = $request->tryRegister();
        } catch (\Throwable) {
            return back()->withErrors(['email' => 'Registrace se nezdařila.']);
        }

        Auth::login($user);

        return to_route('home');
    }

    public function logout(): RedirectResponse
    {
        Auth::logout();

        return to_route('logout');
    }
}
