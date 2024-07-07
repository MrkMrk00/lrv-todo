import { cn } from '@/utils';
import {
    ComponentProps,
    type ComponentPropsWithoutRef,
    forwardRef,
} from 'react';

export const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
    (props, ref) => {
        const { className, ...restProps } = props;

        return (
            <input
                ref={ref}
                className={cn(
                    'px-4 py-2 rounded border disabled:brightness-95',
                    className,
                )}
                {...restProps}
            />
        );
    },
);

export const ErrorMessage = forwardRef<HTMLSpanElement, ComponentProps<'span'>>(
    (props, ref) => {
        const { className, children, ...restProps } = props;

        return (
            <span
                ref={ref}
                className={cn('w-full min-h-[1em] text-red-600', className)}
                {...restProps}
            >
                {children}
            </span>
        );
    },
);

export function InputHint(props: ComponentPropsWithoutRef<'small'>) {
    const { className, ...restProps } = props;

    return <small className={cn('text-gray-600', className)} {...restProps} />;
}

export function RequiredStar() {
    return <small className="inline-flex justify-start text-red-600">*</small>;
}
