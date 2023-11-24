import type { Dispatch, SetStateAction } from 'react';

export interface ILogin {
  data: IUser | null;
  isLoggedIn: boolean;
}

export interface IUser {
  username: string;
  displayname: string;
  profilePicture: string;
  following: number;
  followers: number;
  isFollowing?: boolean;
}

export interface ITrend {
  name: string;
  url: string;
  tweet_volume: number | null;
}

export interface pageProps {
  title: string;
}
export interface modalProps {
  setShow: Dispatch<SetStateAction<boolean>>;
}
