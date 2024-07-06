import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...classes: ClassValue[]) {
    return twMerge(clsx(...classes));
}

export function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length !== 2) {
        return undefined;
    }

    return decodeURIComponent(parts.pop()?.split(';').shift() as string);
}

export function doFetch<TResponse>(
    endpoint: string,
    init: RequestInit = {},
): Promise<TResponse> {
    init.headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') as string,
        'Content-Type': 'application/json',
        Accept: 'application/json',

        ...(init.headers ?? {}),
    };

    return fetch(route(endpoint), init).then(response =>
        response.json(),
    ) as Promise<TResponse>;
}

doFetch.get = <TResponse>(endpoint: string, init: RequestInit = {}) =>
    doFetch<TResponse>(endpoint, { ...init, method: 'GET' });
doFetch.post = <TResponse>(endpoint: string, init: RequestInit = {}) =>
    doFetch<TResponse>(endpoint, { ...init, method: 'POST' });
doFetch.put = <TResponse>(endpoint: string, init: RequestInit = {}) =>
    doFetch<TResponse>(endpoint, { ...init, method: 'PUT' });
doFetch.delete = <TResponse>(endpoint: string, init: RequestInit = {}) =>
    doFetch<TResponse>(endpoint, { ...init, method: 'DELETE' });
