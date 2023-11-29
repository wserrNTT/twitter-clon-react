// Redux
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

// Hooks
import { useTitle } from '@/hooks';
// Types
import type { FC } from 'react';

const Profile: FC = () => {
  const userData = useSelector((state: RootState) => state.login?.data);

  useTitle(`${userData?.displayname} (@${userData?.username}) /X`);

  return <div>{userData?.displayname}'s Profile</div>;
};

export default Profile;
