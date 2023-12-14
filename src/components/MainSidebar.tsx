// React-router
import { Link, useNavigate } from 'react-router-dom';

// Redux
import { selectCurrentRoute, setCurrentRoute } from '@/store/slices/route.store';
import { selectLoginStore } from '@/store/slices/login.store';

// Hooks
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';

// Components
import { Icon } from '@iconify/react';

// Utils
import { showIn } from '@/utils';

// Types
import type { FC } from 'react';

const MainSidebar: FC = () => {
  const [showMenu, setShowMenu] = useState<boolean>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginStore = useAppSelector(selectLoginStore);
  const currentRoute = useAppSelector(selectCurrentRoute);

  return (
    <aside className='main-sidebar'>
      <div className='item-list'>
        <Link to='/home' className='item home'>
          <Icon className='icon' icon='simple-icons:x' />
        </Link>
        <Link
          to='/home'
          className='item'
          onClick={() => dispatch(setCurrentRoute('home'))}
        >
          <Icon
            className='icon'
            icon={
              showIn(['home'], currentRoute)
                ? 'material-symbols:home'
                : 'material-symbols:home-outline'
            }
          />
          <p className={`text ${showIn(['home'], currentRoute) && 'bold'}`}>Inicio</p>
        </Link>
        <Link
          to='/explore'
          className='item'
          onClick={() => dispatch(setCurrentRoute('explore'))}
        >
          <Icon
            className='icon'
            icon={
              showIn(['explore'], currentRoute)
                ? 'iconamoon:search-bold'
                : 'iconamoon:search'
            }
          />
          <p className={`text ${showIn(['explore'], currentRoute) && 'bold'}`}>
            Explorar
          </p>
        </Link>
        <Link
          to='/notifications'
          className='item'
          onClick={() => dispatch(setCurrentRoute('notifications'))}
        >
          <Icon
            className='icon'
            icon={
              showIn(['notifications'], currentRoute) ? 'ph:bell-fill' : 'ph:bell-light'
            }
          />
          <p className={`text ${showIn(['notifications'], currentRoute) && 'bold'}`}>
            Notificaciones
          </p>
        </Link>
        <Link
          to='/messages'
          className='item'
          onClick={() => dispatch(setCurrentRoute('messages'))}
        >
          <Icon
            className='icon'
            icon={
              showIn(['messages'], currentRoute)
                ? 'teenyicons:envelope-solid'
                : 'teenyicons:envelope-outline'
            }
          />
          <p className={`text ${showIn(['messages'], currentRoute) && 'bold'}`}>
            Mensajes
          </p>
        </Link>
        <Link
          to={`/${loginStore.data?.userName}/lists`}
          className='item'
          onClick={() => dispatch(setCurrentRoute('lists'))}
        >
          <Icon
            className='icon'
            icon={
              showIn(['lists'], currentRoute)
                ? 'fluent:document-one-page-24-filled'
                : 'fluent:document-one-page-24-regular'
            }
          />
          <p className={`text ${showIn(['lists'], currentRoute) && 'bold'}`}>Listas</p>
        </Link>
        <div className='item'>
          <Icon className='icon' icon='simple-icons:x' />
          <p className='text'>Premium</p>
        </div>
        <Link
          to={`/${loginStore.data?.userName}`}
          className='item'
          onClick={() => dispatch(setCurrentRoute('profile'))}
        >
          <Icon
            className='icon'
            icon={
              showIn(['profile'], currentRoute)
                ? 'heroicons:user-solid'
                : 'heroicons:user'
            }
          />
          <p className={`text ${showIn(['profile'], currentRoute) && 'bold'}`}>Perfil</p>
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
      <div className={`user ${!showMenu && 'hover'}`} onClick={() => setShowMenu(true)}>
        <img src={loginStore.data?.profilePicture} alt='' className='user-pfp' />
        <div className='user-info'>
          <span className='display-name'> {loginStore.data?.displayName} </span>
          <span className='user-name'>@{loginStore.data?.userName}</span>
        </div>
        <Icon icon='mi:options-horizontal' className='icon' />
        {showMenu && (
          <div className='submenu'>
            <div className='items'>
              <p className='item'>Agregar una cuenta existente</p>
              <p className='item' onClick={() => navigate('/logout')}>
                Cerrar la sesión de @{loginStore.data?.userName}
              </p>
            </div>
          </div>
        )}
      </div>
      {showMenu && <div className='background' onClick={() => setShowMenu(false)}></div>}
    </aside>
  );
};

export default MainSidebar;
