import type { User, NewUser } from '~/models/users/Users';
import { fetchUsers } from '~/utils/users/userFetch';

export const postUsers = (user: NewUser) => {
    return fetchUsers<User, NewUser>('/users', {
        method: 'POST',
        body: user
    })
}