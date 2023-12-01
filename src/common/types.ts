import type { Dispatch, SetStateAction } from 'react';

export interface ILogin {
  data: IUser;
  isLoggedIn: boolean;
  status: 'IDLE' | 'LOADING' | 'SUCCEEDED' | 'FAILED';
  error: string;
}

export interface IUser {
  _id: number;
  userName: string;
  displayName: string;
  profilePicture: string;
  following: IUser[];
  followers: IUser[];
}

export interface ITrend {
  name: string;
  url: string;
  tweet_volume?: number;
}

export interface ITweet {
  _id: number;
  author: IUser;
  timeStamp: string;
  body: string;
  picture?: string;
  comments: ITweet[];
  reposts: IUser[];
  likes: IUser[];
  views: IUser[];
}

export interface rawTweet {
  _id: number;
  authorID: number;
  timeStamp: string;
  body: string;
  picture?: string;
  comments: ITweet[];
  reposts: IUser[];
  likes: IUser[];
  views: IUser[];
}

export interface pageProps {
  title: string;
}
export interface modalProps {
  setShow: Dispatch<SetStateAction<boolean>>;
}
