import { User } from '@app/types/user';

export type ManualAuthResponse = {
  user: User;
  token: string;
};

export type AutoAuthResponse = {
  user: User;
};
