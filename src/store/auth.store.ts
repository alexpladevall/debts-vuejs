import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import appHelper from '@/helpers/app.helper';
import authService from '@/services/auth.service';
import { ISignUpUserDto, IStoreResponse, IUser } from '@/interfaces';

export const useAuthStore = defineStore('auth', () => {
  // State
  const userLogged = ref<IUser | null>(null);

  // Getters
  const getUsername = computed((): string | null => userLogged.value && userLogged.value.username);
  const getFullName = computed((): string | null => {
    const user = userLogged.value;
    if (!user) return null;
    if (!user.lastName) return `${user.firstName}`;
    return `${user.firstName} ${user.lastName}`;
  });

  // Actions
  const signUp = async (user: ISignUpUserDto): Promise<IStoreResponse> => {
    try {
      const token = await authService.signUp(user);
      localStorage.setItem('token', JSON.stringify(token));

      return { ok: true, message: 'Authenticated' };
    } catch (error: any) {
      signOff();
      return { ok: false, message: error.message };
    }
  };

  const signIn = async (username: string, password: string): Promise<IStoreResponse> => {
    try {
      const token = await authService.signIn(username, password);
      localStorage.setItem('token', JSON.stringify(token));

      return { ok: true, message: 'Authenticated' };
    } catch (error: any) {
      signOff();
      return { ok: false, message: error.message };
    }
  };

  const signOff = (): void => {
    localStorage.clear();
    userLogged.value = null;
  };

  const checkAuthentication = async (): Promise<IStoreResponse> => {
    try {
      const token = appHelper.getToken();
      const user = await authService.checkAuthentication(JSON.parse(token));

      userLogged.value = user;
      return { ok: true, message: 'Authenticated' };

    } catch (error: any) {
      signOff();
      return { ok: false, message: error.message };
    }
  };

  return {
    getUsername,
    getFullName,
    signUp,
    signIn,
    signOff,
    checkAuthentication,
  };
});