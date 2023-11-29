// Hooks
import { useTitle } from '@/hooks';

// Types
import type { FC } from 'react';
import type { pageProps } from '@/common/types';

const Messages: FC<pageProps> = ({ title }) => {
  useTitle(title);

  return <div>Messages</div>;
};

export default Messages;
