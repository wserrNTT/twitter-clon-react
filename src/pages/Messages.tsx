// React
import { useEffect } from 'react';

// Utils
import { updateDocumentTitle } from '@/utils';

// Types
import type { FC } from 'react';
import type { pageProps } from '@/common/types';

const Messages: FC<pageProps> = ({ title }) => {
  useEffect(() => {
    updateDocumentTitle(title);
  });
  return <div>Messages</div>;
};

export default Messages;
