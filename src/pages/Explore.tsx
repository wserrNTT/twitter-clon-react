// Hooks
import { useTitle } from '@/hooks';

// Types
import type { FC } from 'react';
import type { pageProps } from '@/common/types';

const Explore: FC<pageProps> = ({ title }) => {
  useTitle(title);
  return <div>Explore</div>;
};

export default Explore;
