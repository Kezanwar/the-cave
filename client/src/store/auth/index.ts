import { makeObservable, observable, action } from 'mobx';
import { RootStore } from '@app/store/index';
import { User } from '@app/types/user';
import axiosInstance, { clearSession, setSession } from '@app/services/axios';

type ManualAuthResponse = {
  user: User;
  token: string;
};

type AutoAuthResponse = {
  user: User;
};

class AuthStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      user: observable,
      isInitialized: observable
    });

    this.rootStore = rootStore;
  }

  user: User | undefined;

  isInitialized = false;

  async initialize() {
    try {
      const res = await axiosInstance.get<AutoAuthResponse>('/auth/initialize');
      this.user = res.data.user;
    } catch (error) {
      this.user = undefined;
      clearSession();
    } finally {
      this.isInitialized = true;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const res = await axiosInstance.post<ManualAuthResponse>(
        '/auth/sign-in',
        { email, password }
      );
      this.user = res.data.user;
      setSession(res.data.token);
    } catch (error) {
      this.user = undefined;
      clearSession();
    }
  }

  async register(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) {
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
  }
}

export default AuthStore;
