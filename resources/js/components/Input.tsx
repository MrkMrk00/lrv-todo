import { cn } from '@/utils';
import { ComponentPropsWithRef } from 'react';

export function Input(props: ComponentPropsWithRef<'input'>) {
    const { className, ...restProps } = props;

    return (
        <input
            className={cn('px-4 py-2 rounded border', className)}
            {...restProps}
        />
    );
}
