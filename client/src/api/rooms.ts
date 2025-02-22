import axiosInstance from '@app/lib/axios';

export type RoomsMetaResponse = {
  lobby: number;
};

export const getRoomMeta = () =>
  axiosInstance.get<RoomsMetaResponse>('/rooms/meta');
