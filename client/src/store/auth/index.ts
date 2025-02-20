import { TLoginForm } from '@app/validation/auth';
import { makeObservable, observable, action, computed } from 'mobx';
import { RootStore } from '@app/store/index';
import { User } from '@app/types/user';
import axiosInstance, { clearSession, setSession } from '@app/lib/axios';
import { AutoAuthResponse, ManualAuthResponse } from './types';

class AuthStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      user: observable,
      isAuthenticated: computed,
      isInitialized: observable,
      initialize: action,
      signIn: action,
      clearAuthSession: action,
      register: action
    });

    this.rootStore = rootStore;
  }

  user: User | undefined;

  get isAuthenticated() {
    return Boolean(this.user);
  }

  isInitialized = false;

  initialize = async () => {
    try {
      const res = await axiosInstance.get<AutoAuthResponse>('/auth/initialize');
      this.user = res.data.user;
    } catch (error) {
      this.user = undefined;
      clearSession();
    } finally {
      this.isInitialized = true;
    }
  };

  signIn = (data: ManualAuthResponse) => {
    this.user = data.user;
    setSession(data.token);
  };

  clearAuthSession = () => {
    clearSession();
    this.user = undefined;
  };

  register = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await axiosInstance.post<ManualAuthResponse>(
        '/auth/register',
        { first_name, last_name, email, password }
      );
      this.user = res.data.user;
      setSession(res.data.token);
    } catch (error) {
      this.user = undefined;
      clearSession();
    }
  };
}

export default AuthStore;
