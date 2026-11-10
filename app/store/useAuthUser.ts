import { defineStore } from 'pinia';
import type { User } from '~/models/users/Users';

interface SavedIdentity {
  name: string;
  number: string;
}

const LOCAL_STORAGE_AUTH_KEY = 'auth_identity';

export const useAuthUser = defineStore('authUser', () => {
  const token = useCookie<string | null>('auth_token', { default: () => null });
  const id = useCookie<string | null>('auth_id', { default: () => null });
  const name = useCookie<string | null>('auth_name', { default: () => null });
  const number = useCookie<string | null>('auth_number', { default: () => null });

  const isLoggedIn = computed(() => !!token.value);

  const saveIdentity = (identity: SavedIdentity) => {
    if (!process.client) {
      return;
    }

    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(identity));
  };

  const getSavedIdentity = (): SavedIdentity | null => {
    if (!process.client) {
      return null;
    }

    const rawIdentity = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

    if (!rawIdentity) {
      return null;
    }

    try {
      const parsedIdentity = JSON.parse(rawIdentity) as SavedIdentity;

      if (!parsedIdentity.name || !parsedIdentity.number) {
        return null;
      }

      return parsedIdentity;
    } catch {
      return null;
    }
  };

  const clearSavedIdentity = () => {
    if (!process.client) {
      return;
    }

    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
  };

  const login = (loggedInUser: User) => {
    token.value = loggedInUser.token;
    id.value = String(loggedInUser.id);
    name.value = loggedInUser.name;
    number.value = loggedInUser.number;

    saveIdentity({
      name: loggedInUser.name,
      number: loggedInUser.number,
    });
  };

  const logout = () => {
    token.value = null;
    id.value = null;
    name.value = null;
    number.value = null;

    clearSavedIdentity();
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
    getSavedIdentity,
  };
});


