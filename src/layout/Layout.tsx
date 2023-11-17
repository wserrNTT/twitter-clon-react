import { FC } from 'react';
import { Outlet } from 'react-router-dom';
const Layout: FC = () => {
  return (
    <>
      <div className=''>arriba</div>
      <Outlet />
      <div className=''>abajo</div>
    </>
  );
};

export default Layout;
