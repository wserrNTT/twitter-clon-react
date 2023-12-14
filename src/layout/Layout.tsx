// React
import { FC } from 'react';

// Redux

import { selectCurrentRoute } from '@/store/slices/route.store';

// React-router
import { Outlet } from 'react-router-dom';

// Hooks
import { useAppSelector } from '@/hooks';

// Components
import MainSidebar from '@/components/MainSidebar';
import RightSidebar from '@/components/RightSidebar';

// Styles
import '@/assets/Layout.scss';

const Layout: FC = () => {
  const currentRoute = useAppSelector(selectCurrentRoute);

  return (
    <div className='layout-container'>
      <MainSidebar />
      <Outlet />
      {currentRoute !== 'messages' && (
        // Prevent rendering on Messages Page
        <RightSidebar />
      )}
    </div>
  );
};

export default Layout;
