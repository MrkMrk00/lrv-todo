import { AppLayout } from '@/components/AppLayout';
import { Button } from '@/components/Button';
import { ErrorMessage, Input, InputHint } from '@/components/Form';
import type { PageProps } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

export default function Register(props: PageProps) {
    const { post, processing, errors, setData, data } = useForm({
        email: '',
        password: '',
        password_confirmation: '',
    });

    const passwordsMatch = data.password === data.password_confirmation;

    function handleRegisterAttempt(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        post(route('register'));
    }

    return (
        <AppLayout {...props}>
            <form
                action={route('register')}
                method="POST"
                onSubmit={handleRegisterAttempt}
                className="flex flex-col px-2 py-4 items-center gap-4"
            >
                <h2 className="text-xl">:O Registrace!</h2>

                <div className="flex flex-col gap-4 w-full items-center">
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
                        {errors.email && (
                            <ErrorMessage>{errors.email}</ErrorMessage>
                        )}
                    </label>

                    <label className="flex flex-col w-full max-w-xs">
                        Heslo:
                        <Input
                            name="password"
                            type="password"
                            placeholder="silneheslo"
                            onChange={ev =>
                                setData('password', ev.target.value)
                            }
                            value={data.password}
                            minLength={8}
                            required
                        />
                        <InputHint>
                            Heslo by mělo obsahovat alespoň 8 znaků.
                        </InputHint>
                        {errors.password && (
                            <ErrorMessage>{errors.password}</ErrorMessage>
                        )}
                    </label>

                    <label className="flex flex-col w-full max-w-xs">
                        Potvrzení hesla:
                        <Input
                            name="password_confirmation"
                            type="password"
                            placeholder="silneheslo"
                            onChange={ev =>
                                setData(
                                    'password_confirmation',
                                    ev.target.value,
                                )
                            }
                            value={data.password_confirmation}
                            minLength={8}
                            required
                        />
                        <small className="text-red-500">
                            {!passwordsMatch && 'Hesla se neshodují.'}
                        </small>
                    </label>
                </div>

                <div className="w-full flex flex-row justify-between items-center max-w-xs">
                    <Link
                        className="text-blue-500 hover:underline"
                        href={route('login')}
                    >
                        Už mám účet
                    </Link>

                    <Button
                        type="submit"
                        className="bg-green-500 text-white"
                        disabled={
                            processing ||
                            !data.email ||
                            data.password.length < 8 ||
                            !passwordsMatch
                        }
                    >
                        Registrovat se
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
