import { cn } from '@/utils';
import type { ComponentPropsWithRef, ElementType } from 'react';

type ButtonProps<T extends ElementType<{ className: string }>> = Omit<
    ComponentPropsWithRef<T>,
    'as'
> & {
    as?: T;
};

export function Button<T extends ElementType = 'button'>({
    className,
    as,
    ...restProps
}: ButtonProps<T>) {
    const TargetComponent = (as ?? 'button') as ElementType;

    return (
        <TargetComponent
            className={cn(
                'rounded-md shadow-sm p-2 hover:brightness-95 transition-all',
                restProps.disabled && 'pointer-events-none brightness-75',
                className,
            )}
            {...restProps}
        />
    );
}
