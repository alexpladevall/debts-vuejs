import authHelper from '@/helpers/app.helper';
import { ISignUpUserDto, IUser } from '@/interfaces';
import { customAxios } from '@/api/axios.api';

const signUp = async (user: ISignUpUserDto): Promise<string> => {
  try {
    const { data } = await customAxios.post('/signup', {
      ...user
    });

    return data.token as string;
  } catch (error: any) {
    throw new Error(authHelper.getMessageErrorService(error));
  }
};

const signIn = async (username: string, password: string): Promise<string> => {
  try {
    const { data } = await customAxios.post('/signin', {
      username, password
    });

    return data.token as string;
  } catch (error: any) {
    throw new Error(authHelper.getMessageErrorService(error));
  }
};

const checkAuthentication = async (token: string): Promise<IUser> => {
  try {
    const { data } = await customAxios.get('/verifytoken', {
      headers: { Authorization: `Bearer ${token}` }
    });

    return data;
  } catch (error: any) {
    throw new Error(authHelper.getMessageErrorService(error));
  }
};

export default {
  signUp,
  signIn,
  checkAuthentication,
};