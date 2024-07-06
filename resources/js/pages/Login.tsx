import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { doFetch } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import type { FormEvent } from 'react';

export default function Login() {
    const {
        mutate: login,
        error,
        data,
    } = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: FormData) =>
            doFetch.post('login', {
                body: JSON.stringify(Object.fromEntries(data)),
            }),
        networkMode: 'always',
    });

    function handleLoginAttempt(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        const formData = new FormData(ev.currentTarget);
    }

    return (
        <form
            action={route('login')}
            method="POST"
            onSubmit={handleLoginAttempt}
            className="flex flex-col px-2 py-4 items-center gap-8"
        >
            <h2 className="text-xl">
                Pro přidávání TODOček se přihlaš do appky.
            </h2>

            <div className="flex flex-col gap-4 w-full items-center">
                <label className="flex flex-col w-full max-w-xs">
                    E-mail:
                    <Input
                        name="email"
                        type="email"
                        placeholder="ahoj@gmail.com"
                        required
                    />
                </label>

                <label className="flex flex-col w-full max-w-xs">
                    Heslo:
                    <Input
                        name="password"
                        type="password"
                        placeholder="silneheslo"
                        required
                    />
                </label>
            </div>

            <div className="w-full flex flex-row justify-end max-w-xs">
                <Button type="submit" className="bg-green-500 text-white">
                    Přihlásit se
                </Button>
            </div>
        </form>
    );
}
