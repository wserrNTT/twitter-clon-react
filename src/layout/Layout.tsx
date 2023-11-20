// React
import { FC, useEffect, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/user.store';
import type { RootState } from '@/store';

// React-router
import { Outlet, useNavigate, Link } from 'react-router-dom';
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
  const [itemIndex, setItemIndex] = useState<number>(0);

  useEffect(() => {
    if (!isLoggenIn) navigate('/');
  }, [isLoggenIn]);

  return (
    <div className='layout-container'>
      <aside className='sidebar'>
        <div className='item-list'>
          <Link to='/home' className='item home'>
            <Icon className='icon' icon='simple-icons:x' />
          </Link>
          <Link
            to='/home'
            className='item'
            onClick={() => setItemIndex(0)}
          >
            <Icon
              className='icon'
              icon={
                itemIndex === 0
                  ? 'material-symbols:home'
                  : 'material-symbols:home-outline'
              }
            />
            <p className='text'>Inicio</p>
          </Link>
          <Link
            to='/explore'
            className='item'
            onClick={() => setItemIndex(1)}
          >
            <Icon
              className='icon'
              icon={
                itemIndex === 1
                  ? 'iconamoon:search-bold'
                  : 'iconamoon:search'
              }
            />
            <p className='text'>Explorar</p>
          </Link>
          <Link
            to='/notifications'
            className='item'
            onClick={() => setItemIndex(2)}
          >
            <Icon
              className='icon'
              icon={itemIndex === 2 ? 'ph:bell-fill' : 'ph:bell-light'}
            />
            <p className='text'>Notificaciones</p>
          </Link>
          <Link
            to='/messages'
            className='item'
            onClick={() => setItemIndex(3)}
          >
            <Icon
              className='icon'
              icon={
                itemIndex === 3
                  ? 'teenyicons:envelope-solid'
                  : 'teenyicons:envelope-outline'
              }
            />
            <p className='text'>Mensajes</p>
          </Link>
          <Link
            to={`/${userData?.username}/lists`}
            className='item'
            onClick={() => setItemIndex(4)}
          >
            <Icon
              className='icon'
              icon={
                itemIndex === 4
                  ? 'fluent:document-one-page-24-filled'
                  : 'fluent:document-one-page-24-regular'
              }
            />
            <p className='text'>Listas</p>
          </Link>
          <div className='item'>
            <Icon className='icon' icon='simple-icons:x' />
            <p className='text'>Premium</p>
          </div>
          <Link
            to={`/${userData?.username}`}
            className='item'
            onClick={() => setItemIndex(5)}
          >
            <Icon
              className='icon'
              icon={
                itemIndex === 5 ? 'heroicons:user-solid' : 'heroicons:user'
              }
            />
            <p className='text'>Perfil</p>
          </Link>
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
