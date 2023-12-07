// Redux
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

// Hooks
import { useTitle } from '@/hooks';
// Types
import type { FC } from 'react';

const Profile: FC = () => {
  const userData = useSelector((state: RootState) => state.login?.data);

  useTitle(`${userData?.displayName} (@${userData?.userName}) /X`);

  return <div>{userData?.displayName}'s Profile</div>;
};

export default Profile;
