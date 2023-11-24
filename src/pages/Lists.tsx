// React
import { useEffect, FC } from 'react';

// Redux
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

// Utils
import { updateDocumentTitle } from '@/utils';

const Lists: FC = () => {
  const userData = useSelector((state: RootState) => state.login.data);
  useEffect(() => {
    updateDocumentTitle(`Listas creadas por ${userData?.username} /X`);
  });
  return <div>{userData?.displayname}'s lists</div>;
};

export default Lists;
