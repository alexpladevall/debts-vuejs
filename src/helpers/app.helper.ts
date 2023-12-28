const getMessageErrorService = (error: any): string => {
  let message = error.message;

  if (error.response) {
    message = error.response?.data.message;
  }

  return message;
};

const getToken = (): string => {
  const token = localStorage.getItem('token');

  if (!token) throw new Error('Unauthorized');
  return token;
};

export default {
  getMessageErrorService,
  getToken,
};