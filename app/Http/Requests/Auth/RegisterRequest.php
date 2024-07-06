<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'confirmed', 'min:8'],
        ];
    }

    public function tryRegister(): User
    {
        $user = new User($this->only(['email', 'password']));
        // Nechci řešit e-maily, tak vytvořím uživatele jako ověřeného (a nechci dělat custom User model).
        $user->markEmailAsVerified();

        $user->saveOrFail();

        return $user;
    }
}
