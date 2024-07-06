import { cn } from '@/utils';
import type { ComponentPropsWithRef } from 'react';

export function Input(props: ComponentPropsWithRef<'input'>) {
    const { className, ...restProps } = props;

    return (
        <input
            className={cn('px-4 py-2 rounded border', className)}
            {...restProps}
        />
    );
}

export function ErrorMessage(props: ComponentPropsWithRef<'span'>) {
    const { className, children, ...restProps } = props;

    console.log(children);
    console.log(props);
    return (
        <span
            className={cn('w-full min-h-[1em] text-red-600', className)}
            {...restProps}
        >
            {children}
        </span>
    );
}

export function InputHint(props: ComponentPropsWithRef<'small'>) {
    const { className, ...restProps } = props;

    return <small className={cn('text-gray-600', className)} {...restProps} />;
}

export function RequiredStar() {
    return <small className="inline-flex justify-start text-red-600">*</small>
}
