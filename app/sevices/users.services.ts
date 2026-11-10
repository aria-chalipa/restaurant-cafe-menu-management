import type { User } from '~/models/users/Users';
import { fetchUsers } from '~/utils/users/userFetch';
import type {  NewUser } from '~/models/users/Users';

interface GetUsersParams {
  name?: string;
  number?: string;
}

export const getUsers = (params?: GetUsersParams) => {
  const searchParams = new URLSearchParams();

  if (params?.name) {
    searchParams.append('name', params.name);
  }

  if (params?.number) {
    searchParams.append('number', params.number);
  }

  const query = searchParams.toString();
  const path = query ? `/users?${query}` : '/users';

  return fetchUsers<User[]>(path, {
    method: 'GET',
  });
};

export const postUsers = (user: NewUser) => {
    return fetchUsers<User, NewUser>('/users', {
        method: 'POST',
        body: user
    })
}