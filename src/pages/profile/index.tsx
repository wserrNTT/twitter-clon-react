// Redux
import { selectUserStore } from '@/store/slices/user.store';
import { selectLoginStore } from '@/store/slices/login.store';

// Subpages
import EmptyProfile from './EmptyProfile';
import DefaultProfile from './DefaultProfile';
import LoginProfile from './LoginProfile';

// Hooks
import { useParams } from 'react-router';
import { useAppSelector } from '@/hooks';

// Types
import type { FC } from 'react';
import type { IUser } from '@/common/types';

// Styles
import '@/assets/Profile.scss';
export interface profileProps {
  profile: IUser;
}

const Profile: FC = () => {
  const { username } = useParams();
  const userStore = useAppSelector(selectUserStore);
  const loginStore = useAppSelector(selectLoginStore);

  const profileUser = userStore.users.find((user) => user.userName === username);
  return !profileUser ? (
    <EmptyProfile /> // Renders if user does not exists
  ) : username === loginStore.data.userName ? (
    <LoginProfile profile={profileUser} /> // Renders if user is logged
  ) : (
    <DefaultProfile profile={profileUser} /> // Renders any user
  );
};

export default Profile;
