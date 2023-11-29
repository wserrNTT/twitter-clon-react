// Hooks
import { useTitle } from '@/hooks';

// Types
import type { FC } from 'react';
import type { pageProps } from '@/common/types';
import { shuffleArray } from '@/utils';
const Notifications: FC<pageProps> = ({ title }) => {
  useTitle(title);

  return <div>
    <span>[1,2,3,4,5]</span>
    <br />
    <span>{shuffleArray([1,2,3,4,5])}</span>
  </div>;
};

export default Notifications;
