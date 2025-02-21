import { BASE_URL } from '@app/config';
import { APIErrorResp } from '@app/types/api';
import axios, { AxiosError } from 'axios';

export type ErrorObject = {
  message: string;
  statusCode: number;
};

const genericErrorMsg = 'Something went wrong';

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': localStorage.getItem('accessToken') || ''
  }
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<APIErrorResp>) => {
    const m = error?.response?.data?.message || genericErrorMsg;
    const err = {
      message: m,
      statusCode: error.response?.status
    };
    return Promise.reject(err as ErrorObject);
  }
);

export const setSession = (token: string) => {
  localStorage.setItem('accessToken', token);
  axiosInstance.defaults.headers['x-auth-token'] = token;
};

export const clearSession = () => {
  localStorage.clear();
  axiosInstance.defaults.headers['x-auth-token'] = '';
};

export default axiosInstance;

export const errorHandler = (
  error: unknown,
  onError: (errorObj: ErrorObject) => void
): void => {
  const apiErr = error as ErrorObject;
  if (typeof error === 'string') {
    onError({ message: error || genericErrorMsg, statusCode: 500 });
  } else if (apiErr?.message) {
    onError(apiErr);
  } else {
    onError({ message: genericErrorMsg, statusCode: 500 });
  }
};
