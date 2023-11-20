// React
import { FC, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/user.store';
import type { RootState } from '@/store';

// React-router
import { Outlet, useNavigate } from 'react-router-dom';
// Components
import { Icon } from '@iconify/react';

// Styles
import '@/assets/Layout.scss';

const Layout: FC = () => {
  const isLoggenIn = useSelector(
    (state: RootState) => state.user.isLoggedIn
  );
  const userData = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggenIn) navigate('/');
  }, [isLoggenIn]);

  return (
    <div className='layout-container'>
      <aside className='sidebar'>
        <div className='item-list'>
          <div className='item home'>
            <Icon className='icon' icon='simple-icons:x' />
          </div>
          <div className='item'>
            <Icon className='icon' icon='material-symbols:home' />
            <p className='text'>Inicio</p>
          </div>
          <div className='item'>
            <Icon className='icon' icon='iconamoon:search' />
            <p className='text'>Explorar</p>
          </div>
          <div className='item'>
            <Icon className='icon' icon='ph:bell-light' />
            <p className='text'>Notificaciones</p>
          </div>
          <div className='item'>
            <Icon className='icon' icon='teenyicons:envelope-outline' />
            <p className='text'>Mensajes</p>
          </div>
          <div className='item'>
            <Icon
              className='icon'
              icon='fluent:document-one-page-24-regular'
            />
            <p className='text'>Listas</p>
          </div>
          <div className='item'>
            <Icon className='icon' icon='simple-icons:x' />
            <p className='text'>Premium</p>
          </div>
          <div className='item'>
            <Icon className='icon' icon='heroicons:user' />
            <p className='text'>Perfil</p>
          </div>
          <div className='item'>
            <Icon className='icon' icon='tabler:dots-circle-horizontal' />
            <p className='text'>Más opciones</p>
          </div>
          <div className='item item-post'>
            <Icon icon='mingcute:quill-pen-line' className='icon' />
            <p className='text'>Postear</p>
          </div>
        </div>
        <div className='user' onClick={() => dispatch(logout())}>
          <img
            src={userData?.profilePicture}
            alt=''
            className='user-pfp'
          />
          <div className='user-info'>
            <span className='display-name'> {userData?.displayname} </span>
            <span className='user-name'>@{userData?.username}</span>
          </div>
          <Icon icon='mi:options-horizontal' className='icon' />
        </div>
      </aside>
      <Outlet />
    </div>
  );
};

export default Layout;
