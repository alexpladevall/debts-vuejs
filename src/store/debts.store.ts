import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

import debtsService from '@/services/debts.service';
import { IAddDebtDto, IDebt, IStoreResponse, IUser } from '@/interfaces';
import appHelper from '@/helpers/app.helper';

export const useDebtsStore = defineStore('debts', () => {
  // State
  const debts = ref<IDebt[]>([]);
  const users = ref<IUser[]>([]);

  // Getters
  const getDebts = computed((): IDebt[] => debts.value);
  const getUsers = computed((): IUser[] => users.value);

  // Actions
  const findDebts = async (): Promise<IStoreResponse> => {
    try {
      const token = appHelper.getToken();
      debts.value = await debtsService.findDebts(JSON.parse(token));

      return { ok: true, message: 'Debts successfully recovered' };

    } catch (error: any) {
      return { ok: false, message: error.message };
    }
  };

  const addDebt = async (addDebtDto: IAddDebtDto): Promise<IStoreResponse> => {
    try {
      const token = appHelper.getToken();
      const { message } = await debtsService.addDebt(JSON.parse(token), addDebtDto);
      
      return { ok: true, message };

    } catch (error: any) {
      return { ok: false, message: error.message };
    }
  };

  const searchUsers = async (): Promise<IStoreResponse> => {
    try {
      const token = appHelper.getToken();
      users.value = await debtsService.searchUsers(JSON.parse(token));
      
      return { ok: true, message: 'Users successfully recovered' };

    } catch (error: any) {
      return { ok: false, message: error.message };
    }
  };

  const clearDebtsStore = (): void => {
    debts.value = [];
    users.value = [];
  };

  return {
    getDebts,
    getUsers,
    findDebts,
    addDebt,
    searchUsers,
    clearDebtsStore,
  };
});