import { defineStore } from 'pinia';
import type { User } from '~/models/users/Users';

const STORAGE_KEY = 'auth_user';

type StoredUser = Pick<User, 'name' | 'number'>;

function readStoredUser(): StoredUser | null {
  if (!import.meta.client) return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export const useAuthUser = defineStore('authUser', () => {
  const token = useCookie<string | null>('auth_token', { default: () => null });
  const stored = readStoredUser();
  const name = ref(stored?.name ?? null);
  const number = ref(stored?.number ?? null);

  const isLoggedIn = computed(() => !!token.value);
  const loginRedirect = ref(false);

  const login = (loggedInUser: User) => {
    token.value = loggedInUser.token;
    name.value = loggedInUser.name;
    number.value = loggedInUser.number;
    if (import.meta.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: loggedInUser.name, number: loggedInUser.number }));
    }
  };

  const logout = () => {
    token.value = null;
    name.value = null;
    number.value = null;
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return {
    token,
    name,
    number,
    isLoggedIn,
    loginRedirect,
    login,
    logout,
  };
});

