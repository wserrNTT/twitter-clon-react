// Types
import type { FC } from 'react';
import { profileProps } from '.';

const LoginProfile: FC<profileProps> = ({ profile }) => {
  return <div>Usuario autenticado {profile.userName}</div>;
};

export default LoginProfile;
