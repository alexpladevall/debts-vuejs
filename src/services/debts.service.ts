import appHelper from '@/helpers/app.helper';
import { IAddDebtDto, IDebt, IUser } from '@/interfaces';
import { customAxios } from '@/api/axios.api';

const findDebts = async (token: string): Promise<IDebt[]> => {
  try {
    const { data } = await customAxios.get('/finddebts', {
      headers: { Authorization: `Bearer ${token}` }
    });

    return data as IDebt[];
  } catch (error: any) {
    throw new Error(appHelper.getMessageErrorService(error));
  }
};

const addDebt = async (token: string, addDebtDto: IAddDebtDto): Promise<{ message: string }> => {
  try {
    const { data } = await customAxios.post('/adddebt', addDebtDto, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return data;
  } catch (error: any) {
    throw new Error(appHelper.getMessageErrorService(error));
  }
};

const searchUsers = async (token: string): Promise<IUser[]> => {
  try {
    const { data } = await customAxios.get('/searchusers', {
      headers: { Authorization: `Bearer ${token}` }
    });

    return data as IUser[];
  } catch (error: any) {
    throw new Error(appHelper.getMessageErrorService(error));
  }
};

export default {
  findDebts,
  addDebt,
  searchUsers,
};