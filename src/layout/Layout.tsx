// React
import { FC, useEffect, useState } from 'react';

// Redux
import { selectLoginStore, updateFollowing } from '@/store/slices/login.store';

import { selectLastUsers, fetchUsers } from '@/store/slices/user.store';
import { selectLastHashtags, fetchHashtags } from '@/store/slices/hashtag.store';
import { selectCurrentRoute, setCurrentRoute } from '@/store/slices/route.store';

// React-router
import { Outlet, useNavigate, Link } from 'react-router-dom';

// Hooks
import { useAppSelector, useAppDispatch } from '@/hooks';

// Components
import { Icon } from '@iconify/react';

// Utils
import { follow, unfollow } from '@/utils/axios';

// Types
import type { routeName } from '@/common/types';

// Styles
import '@/assets/Layout.scss';

const Layout: FC = () => {
  const loginStore = useAppSelector(selectLoginStore);

  const users = useAppSelector(selectLastUsers);
  const hashtags = useAppSelector(selectLastHashtags);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const currentRoute = useAppSelector(selectCurrentRoute);
  const [show, setShow] = useState({
    menu: false,
    hashtags: false,
    users: false
  });

  // Hides element in given routes
  const hideIn = (routes: routeName[]) => !routes.includes(currentRoute);

  // Shows element only in given routes
  const showIn = (routes: routeName[]) => routes.includes(currentRoute);

  const handleFollow = async (profileID: string) => {
    try {
      const { data } = await follow(loginStore.data._id, profileID);
      dispatch(fetchUsers());
      dispatch(updateFollowing(data));
    } catch (error) {
      console.error(error);
    }
  };
  const handleUnfollow = async (profileID: string) => {
    try {
      const { data } = await unfollow(loginStore.data._id, profileID);
      dispatch(fetchUsers());
      dispatch(updateFollowing(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchHashtags());
  }, []);

  return (
    <div className='layout-container'>
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
                showIn(['home'])
                  ? 'material-symbols:home'
                  : 'material-symbols:home-outline'
              }
            />
            <p className={`text ${showIn(['home']) && 'bold'}`}>Inicio</p>
          </Link>
          <Link
            to='/explore'
            className='item'
            onClick={() => dispatch(setCurrentRoute('explore'))}
          >
            <Icon
              className='icon'
              icon={showIn(['explore']) ? 'iconamoon:search-bold' : 'iconamoon:search'}
            />
            <p className={`text ${showIn(['explore']) && 'bold'}`}>Explorar</p>
          </Link>
          <Link
            to='/notifications'
            className='item'
            onClick={() => dispatch(setCurrentRoute('notifications'))}
          >
            <Icon
              className='icon'
              icon={showIn(['notifications']) ? 'ph:bell-fill' : 'ph:bell-light'}
            />
            <p className={`text ${showIn(['notifications']) && 'bold'}`}>
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
                showIn(['messages'])
                  ? 'teenyicons:envelope-solid'
                  : 'teenyicons:envelope-outline'
              }
            />
            <p className={`text ${showIn(['messages']) && 'bold'}`}>Mensajes</p>
          </Link>
          <Link
            to={`/${loginStore.data?.userName}/lists`}
            className='item'
            onClick={() => dispatch(setCurrentRoute('lists'))}
          >
            <Icon
              className='icon'
              icon={
                showIn(['lists'])
                  ? 'fluent:document-one-page-24-filled'
                  : 'fluent:document-one-page-24-regular'
              }
            />
            <p className={`text ${showIn(['lists']) && 'bold'}`}>Listas</p>
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
              icon={showIn(['profile']) ? 'heroicons:user-solid' : 'heroicons:user'}
            />
            <p className={`text ${showIn(['profile']) && 'bold'}`}>Perfil</p>
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
        <div
          className={`user ${!show.menu && 'hover'}`}
          onClick={() => setShow({ ...show, menu: true })}
        >
          <img src={loginStore.data?.profilePicture} alt='' className='user-pfp' />
          <div className='user-info'>
            <span className='display-name'> {loginStore.data?.displayName} </span>
            <span className='user-name'>@{loginStore.data?.userName}</span>
          </div>
          <Icon icon='mi:options-horizontal' className='icon' />
          {show.menu && (
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
      </aside>
      <Outlet />
      {currentRoute !== 'messages' && (
        // Prevent rendering on Messages Page
        <aside className='right-sidebar'>
          {hideIn(['explore']) && (
            <div className='search-container'>
              <div className='search'>
                <Icon className='icon' icon='iconamoon:search' />
                <input className='input-search' type='text' placeholder='Buscar' />
              </div>
            </div>
          )}
          <div className='sidebar-items'>
            {showIn(['home']) && (
              <div className='premium'>
                <p className='title'>Suscríbete a Premium</p>
                <p className='body'>
                  Suscríbete para desbloquear nuevas funciones y, si eres elegible,
                  recibir un pago de cuota de ingresos por anuncios.
                </p>
                <button type='button' className='subscribe-button'>
                  Suscribirse
                </button>
              </div>
            )}
            {hideIn(['explore']) && (
              <div className='trends'>
                <p className='title'>Tendencias para ti</p>
                {/* Shows only 3 hashtags unless show More is clicked */}
                {(show.hashtags ? hashtags : hashtags.slice(0, 3)).map((hashtag) => (
                  <div
                    className='trend'
                    key={hashtag.name}
                    onClick={() => navigate(`/hashtag/${hashtag.name}`)}
                  >
                    <div className='info'>
                      <p className='header'>Tendencia</p>
                      <p className='name'>#{hashtag.name}</p>
                      <p className='volume' v-if='trend.tweet_volume'>
                        {hashtag.tweet_volume?.length} posts
                      </p>
                    </div>
                    <div className='options'>
                      <Icon icon='mi:options-horizontal' className='icon' />
                    </div>
                  </div>
                ))}
                {!show.hashtags && (
                  <div
                    className='show-more'
                    onClick={() => setShow({ ...show, hashtags: true })}
                  >
                    <div className='text'>Mostrar más</div>
                  </div>
                )}
              </div>
            )}
            <div className='follow'>
              <p className='title'>
                {currentRoute === 'profile' ? 'Tal vez te guste' : 'A quién seguir'}
              </p>
              {/* Shows only 3 users unless show More is clicked */}
              {(show.users ? users : users.slice(0, 3)).map((user) => (
                <div className='user' key={user.userName}>
                  <img
                    className='profile-picture'
                    src={user.profilePicture}
                    alt={user.displayName}
                  />
                  <div className='info' onClick={() => navigate(`/${user.userName}`)}>
                    <p className='display-name'>{user.displayName}</p>
                    <p className='user-name'>@{user.userName}</p>
                  </div>
                  {loginStore.data.following.includes(user._id) ? (
                    <button
                      className='unfollow-button'
                      onClick={() => handleUnfollow(user._id)}
                    >
                      Siguiendo
                    </button>
                  ) : (
                    <button
                      className='follow-button'
                      onClick={() => handleFollow(user._id)}
                    >
                      Seguir
                    </button>
                  )}
                </div>
              ))}
              {!show.users && (
                <div
                  className='show-more'
                  onClick={() => setShow({ ...show, users: true })}
                >
                  <div className='text'>Mostrar más</div>
                </div>
              )}
            </div>
            <div className='footer'>
              <a className='link' href='https://twitter.com/tos'>
                Condiciones de Servicio
              </a>
              <a className='link' href='https://twitter.com/privacy'>
                Política de Privacidad
              </a>
              <a className='link' href='https://support.twitter.com/articles/20170514'>
                Política de cookies
              </a>
              <a className='link' href='https://help.twitter.com/resources/accessibility'>
                Accesibilidad
              </a>
              <a
                className='link'
                href='https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo'
              >
                Información de anuncios
              </a>
              <span className='link'>Más opciones...</span>
              <span className='link'>© 2023 X Corp.</span>
            </div>
          </div>
        </aside>
      )}
      {show.menu && (
        <div
          className='background'
          onClick={() => setShow({ ...show, menu: true })}
        ></div>
      )}
    </div>
  );
};

export default Layout;

