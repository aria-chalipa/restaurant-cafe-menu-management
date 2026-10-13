export interface User {
    id: number;
    name: string;
    number: string;
    token: string;
}

export type NewUser = Omit<User, 'id' >;