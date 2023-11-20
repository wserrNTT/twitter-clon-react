export interface IUser {
  data: {
    username: string;
    displayname: string;
    profilePicture: string;
  } | null;
  isLoggedIn: boolean;
}
