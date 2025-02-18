export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type Todo = {
    id: number;
    user_id: number;
    title: string;
    description: string | null;
    completed: boolean;
    deadline: string | null;
    created_at: string;
    updated_at: string;
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
