import { defineStore } from 'pinia';
import type { User } from '~/models/users/Users';

export const useAuthUser = defineStore('authUser', () => {
  const token = useCookie<string | null>('auth_token', { default: () => null });
  const id = useCookie<string | null>('auth_id', { default: () => null });
  const name = useCookie<string | null>('auth_name', { default: () => null });
  const number = useCookie<string | null>('auth_number', { default: () => null });

  const isLoggedIn = computed(() => !!token.value);

  const login = (loggedInUser: User) => {
    token.value = loggedInUser.token;
    id.value = String(loggedInUser.id);
    name.value = loggedInUser.name;
    number.value = loggedInUser.number;
  };

  const logout = () => {
    token.value = null;
    id.value = null;
    name.value = null;
    number.value = null;
  };

  const getUser = () => {
    return {
      id: id.value,
      name: name.value,
      number: number.value,
      token: token.value,
    };
  };

  return {
    token,
    id,
    name,
    number,
    isLoggedIn,
    login,
    logout,
    getUser,
  };
});


