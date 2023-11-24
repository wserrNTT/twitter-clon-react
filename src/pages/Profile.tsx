// React
import { useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

// Utils
import { updateDocumentTitle } from '@/utils';

// Types
import type { FC } from 'react';

const Profile: FC = () => {
  const userData = useSelector((state: RootState) => state.login?.data);
  useEffect(() => {
    updateDocumentTitle(
      `${userData?.displayname} (@${userData?.username}) /X`
    );
  });
  return <div>{userData?.displayname}'s Profile</div>;
};

export default Profile;
