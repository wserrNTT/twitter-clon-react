// Hooks
import { useTitle } from '@/hooks';

// Types
import type { FC } from 'react';
import type { pageProps } from '@/common/types';
const Notifications: FC<pageProps> = ({ title }) => {
  useTitle(title);

  return <div>Notificaciones</div>;
};

export default Notifications;
