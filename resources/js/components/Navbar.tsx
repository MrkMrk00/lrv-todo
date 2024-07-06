import { Button } from '@/components/Button';
import type { User } from '@/types';
import { doFetch } from '@/utils';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { router } from '@inertiajs/react';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

function useLogout() {
    const { mutate, data, error } = useMutation({
        mutationFn: () => doFetch.post<1>('logout'),
        mutationKey: ['logout'],
        networkMode: 'always',
    });

    return { logout: mutate, isLoggedOut: !!data, error };
}

function LogoutSuccessDialog(props: { isOpen: boolean }) {
    const { isOpen } = props;

    function onLogoutModalClose() {
        router.visit(route('login'));
    }

    return (
        <Dialog
            open={isOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={onLogoutModalClose}
        >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-slate-400 shadow-sm p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <DialogTitle as="h3" className="font-medium">
                            Odhlášení dopadlo úspěšně
                        </DialogTitle>
                        <p>
                            Kliknutím na tlačítko <em>OK</em> budete
                            přesměrováni na stránku s přihlášením.
                        </p>
                        <div className="mt-4">
                            <Button
                                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                onClick={onLogoutModalClose}
                            >
                                OK
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

export function Navbar({ user }: { user: User | null }) {
    const { logout, isLoggedOut, error } = useLogout();

    useEffect(() => {
        if (!error) {
            return;
        }

        console.error(error);
        window.alert('Odhlášení se nezdařilo :(');
    }, [error]);

    return (
        <>
            <nav className="flex flex-row w-full justify-between items-center">
                <h1 className="px-4 py-2 text-4xl font-semibold">TODOs</h1>
                <hr className="w-full border-b border-slate-300" />

                {!!user && (
                    <form
                        onSubmit={ev => {
                            ev.preventDefault();
                            logout();
                        }}
                        className="px-4 py-2"
                    >
                        <Button type="submit" className="bg-red-500 text-white">
                            Odhlásit se
                        </Button>
                    </form>
                )}
            </nav>

            <LogoutSuccessDialog isOpen={isLoggedOut} />
        </>
    );
}
