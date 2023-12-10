// Types
import type { FC } from 'react';
import { profileProps } from '.';

const DefaultProfile: FC<profileProps> = ({ profile }) => {
  return <div>Cualquier usuario {profile.userName}</div>;
};

export default DefaultProfile;
