import axios, { AxiosResponse } from 'axios';
import type { IHashtag, ITweet, IUser, rawTweet } from '@/common/types';

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

// Make one user follow another user
export const follow = async (followerID: string, followingID: string) =>
  await axiosTwitter.patch(`/follow?followerid=${followerID}&followingid=${followingID}`);

// Make one user stop following another user
export const unfollow = async (followerID: string, followingID: string) =>
  await axiosTwitter.patch(`/unfollow?followerid=${followerID}&followingid=${followingID}`);

// GET all tweets
export const getTweets = async (): Promise<AxiosResponse<ITweet[]>> =>
  await axiosTwitter.get('/api/tweets');

// GET tweet by id
export const getTweetById = async (id: string): Promise<AxiosResponse<ITweet>> =>
  await axiosTwitter.get(`/api/tweets/${id}`);

// GET all tweets by user
export const getTweetsByUser = async (
  userIDs: string[]
): Promise<AxiosResponse<ITweet[]>> =>
  await axiosTwitter.get(`/api/tweets?users=${userIDs.join('+')}`);

// POST new Tweet
export const postTweet = async (newTweet: rawTweet) => {
  await axiosTwitter.post('/api/tweets', newTweet);
};

// GET all users
export const getUsers = async (): Promise<AxiosResponse<IUser[]>> =>
  await axiosTwitter.get('/api/users');

// GET user by username
export const getUserByUsername = async (
  username: string
): Promise<AxiosResponse<ITweet>> =>
  await axiosTwitter.get(`/api/users?username=${username}`);

// GET all hashtags
export const getHashtags = async (): Promise<AxiosResponse<IHashtag[]>> =>
  await axiosTwitter.get('/api/hashtags');
