import axios, { AxiosResponse } from 'axios';
import type { ITweet, IUser, rawTweet } from '@/common/types';

const axiosTwitter = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
});
// GET login user
export const getLoginUser = async (
  loginuser: string,
  loginpassword: string
): Promise<AxiosResponse<{ message?: string; user: IUser }>> =>
  await axiosTwitter.get(`/login?loginuser=${loginuser}&loginpassword=${loginpassword}`);

// GET all tweets
export const getTweets = async (): Promise<AxiosResponse<rawTweet[]>> =>
  await axiosTwitter.get('/api/tweets');

// GET tweet by id
export const getTweetById = async (id: string): Promise<AxiosResponse<ITweet>> =>
  await axiosTwitter.get(`/api/tweets/${id}`);

// POST new Tweet

// GET all users
export const getUsers = async (): Promise<AxiosResponse<IUser[]>> =>
  await axiosTwitter.get('/api/users');

// Parses raw tweets to ITweet
export const loadTweets = async (rawTweets: rawTweet[]): Promise<ITweet[]> => {
  const { data: users } = await getUsers();
  console.log(users);
  console.log(rawTweets);
  return rawTweets.map<ITweet>((tweet) => ({
    ...tweet,
    author: users.find((user) => user._id === tweet.authorID) ?? users[0]
  }));
};
