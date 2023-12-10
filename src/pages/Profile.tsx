// Redux
import { selectUserStore } from '@/store/slices/user.store';

// Hooks
import { useParams } from 'react-router';
import { useTitle, useAppSelector } from '@/hooks';
// Types
import type { FC } from 'react';

const Profile: FC = () => {
  const { username } = useParams();
  const userStore = useAppSelector(selectUserStore);

  const profileUser = userStore.users.find((user) => user.userName === username);

  if (profileUser) {
    useTitle(`${profileUser?.displayName} (@${profileUser?.userName}) /X`);
  } else {
    useTitle('Perfil /X');
  }

  return <div>{profileUser?.displayName}'s Profile</div>;
};

export default Profile;
