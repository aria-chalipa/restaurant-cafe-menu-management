import type { User, NewUser } from '~/models/users/users';
import { fetchUsers } from '~/utils/users/userFetch';

export const postUsers = (user: NewUser) => {
    return fetchUsers<User, NewUser>('/users', {
        method: 'POST',
        body: user
    })
}