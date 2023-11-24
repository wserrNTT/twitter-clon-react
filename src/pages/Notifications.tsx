// React
import { useEffect } from 'react';

// Utils
import { updateDocumentTitle } from '@/utils';

// Types
import type { FC } from 'react';
import type { pageProps } from '@/common/types';

const Notifications: FC<pageProps> = ({ title }) => {
  useEffect(() => {
    updateDocumentTitle(title);
  });
  return <div>Notifications</div>;
};

export default Notifications;
