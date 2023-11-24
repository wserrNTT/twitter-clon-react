// React
import { useEffect } from 'react';

// Utils
import { updateDocumentTitle } from '@/utils';

// Types
import type { FC } from 'react';
import type { pageProps } from '@/common/types';

const Home: FC<pageProps> = ({ title }) => {
  useEffect(() => {
    updateDocumentTitle(title);
  });
  return <div>Home</div>;
};

export default Home;
