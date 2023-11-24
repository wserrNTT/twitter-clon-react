// React
import { useEffect } from 'react';

// Utils
import { updateDocumentTitle } from '@/utils';

// Types
import type { FC } from 'react';
import type { pageProps } from '@/common/types';

const Explore: FC<pageProps> = ({ title }) => {
  useEffect(() => {
    updateDocumentTitle(title);
  });
  return <div>Explore</div>;
};

export default Explore;
