// React
import type{ FC } from 'react';

// Redux
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

// Hooks
import { useTitle } from '@/hooks';

const Lists: FC = () => {
  const userData = useSelector((state: RootState) => state.login.data);
  useTitle(`Listas creadas por ${userData?.username} /X`);
  return <div>{userData?.displayname}'s lists</div>;
};

export default Lists;
