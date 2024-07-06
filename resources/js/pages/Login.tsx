import { Button } from '@/components/Button';
import { ErrorMessage, Input } from '@/components/Form';
import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

export default function Login() {
    const { post, processing, errors, setData, data } = useForm({
        email: '',
        password: '',
    });

    function handleLoginAttempt(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        post(route('login'));
    }

    return (
        <form
            action={route('login')}
            method="POST"
            onSubmit={handleLoginAttempt}
            className="flex flex-col px-2 py-4 items-center gap-4"
        >
            <h2 className="text-xl">
                Pro přidávání TODOček se přihlaš do appky.
            </h2>

            <div className="flex flex-col gap-2 w-full items-center">
                <label className="flex flex-col w-full max-w-xs">
                    E-mail:
                    <Input
                        name="email"
                        type="email"
                        placeholder="ahoj@gmail.com"
                        onChange={ev => setData('email', ev.target.value)}
                        value={data.email}
                        required
                    />
                    {!!errors.email && (
                        <ErrorMessage>{errors.email}</ErrorMessage>
                    )}
                </label>

                <label className="flex flex-col w-full max-w-xs">
                    Heslo:
                    <Input
                        name="password"
                        type="password"
                        placeholder="silneheslo"
                        onChange={ev => setData('password', ev.target.value)}
                        value={data.password}
                        required
                    />
                </label>
            </div>

            <div className="w-full flex flex-row justify-between items-center max-w-xs">
                <Link
                    className="text-blue-500 hover:underline"
                    href={route('register')}
                >
                    Registruj se
                </Link>

                <Button
                    type="submit"
                    className="bg-green-500 text-white"
                    disabled={processing}
                >
                    Přihlásit se
                </Button>
            </div>
        </form>
    );
}
