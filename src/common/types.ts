import type { Dispatch, SetStateAction } from 'react';

export interface ILogin {
  data: IUser;
  isLoggedIn: boolean;
  error: string;
}

export interface IUser {
  _id: string;
  userName: string;
  displayName: string;
  profilePicture: string;
  following: IUser[];
  followers: IUser[];
}

export interface IHashtag {
  name: string;
  tweet_volume?: number;
}

export interface ITweet {
  _id: string;
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
  author: string;
  timeStamp: string;
  body: string;
  picture?: string;
}

export interface pageProps {
  title: string;
}
export interface modalProps {
  setShow: Dispatch<SetStateAction<boolean>>;
}
