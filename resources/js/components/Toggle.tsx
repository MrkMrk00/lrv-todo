import { cn } from '@/utils';
import { Switch } from '@headlessui/react';
import { ComponentPropsWithoutRef } from 'react';

export function Toggle({
    className,
    thumbClassName,
    ...restProps
}: ComponentPropsWithoutRef<typeof Switch> & { thumbClassName?: string }) {
    return (
        <Switch
            defaultChecked={false}
            className={cn(
                'group bg-slate-200 relative flex h-7 w-14 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white',
                className,
            )}
            {...restProps}
        >
            <span
                aria-hidden="true"
                className={cn(
                    'pointer-events-none bg-white inline-block size-5 translate-x-0 rounded-full ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7 group-data-[checked]:bg-blue-500',
                    thumbClassName,
                )}
            />
        </Switch>
    );
}
