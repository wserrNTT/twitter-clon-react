// React
import { FC, useEffect, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import {
  selectRandomTrends,
  selectRandomUsers
} from '@/store/sample.store';

// React-router
import { Outlet, useNavigate, Link } from 'react-router-dom';
// Components
import { Icon } from '@iconify/react';

// Styles
import '@/assets/Layout.scss';

const Layout: FC = () => {
  const isLoggenIn = useSelector(
    (state: RootState) => state.login.isLoggedIn
  );
  const userData = useSelector((state: RootState) => state.login.data);
  const randomTrends = useSelector(selectRandomTrends);
  const randomUsers = useSelector(selectRandomUsers);
  const navigate = useNavigate();

  const [itemIndex, setItemIndex] = useState<number>(0);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    if (!isLoggenIn) navigate('/');
  }, [isLoggenIn, navigate]);

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
            <p className={`text ${itemIndex === 0 && 'bold'}`}>Inicio</p>
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
            <p className={`text ${itemIndex === 1 && 'bold'}`}>Explorar</p>
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
            <p className={`text ${itemIndex === 2 && 'bold'}`}>
              Notificaciones
            </p>
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
            <p className={`text ${itemIndex === 3 && 'bold'}`}>Mensajes</p>
          </Link>
          <Link
            to={`/${userData?.userName}/lists`}
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
            <p className={`text ${itemIndex === 4 && 'bold'}`}>Listas</p>
          </Link>
          <div className='item'>
            <Icon className='icon' icon='simple-icons:x' />
            <p className='text'>Premium</p>
          </div>
          <Link
            to={`/${userData?.userName}`}
            className='item'
            onClick={() => setItemIndex(5)}
          >
            <Icon
              className='icon'
              icon={
                itemIndex === 5 ? 'heroicons:user-solid' : 'heroicons:user'
              }
            />
            <p className={`text ${itemIndex === 5 && 'bold'}`}>Perfil</p>
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
          className={`user ${!showMenu && 'hover'}`}
          onClick={() => setShowMenu(true)}
        >
          <img
            src={userData?.profilePicture}
            alt=''
            className='user-pfp'
          />
          <div className='user-info'>
            <span className='display-name'> {userData?.displayName} </span>
            <span className='user-name'>@{userData?.userName}</span>
          </div>
          <Icon icon='mi:options-horizontal' className='icon' />
          {showMenu && (
            <div className='submenu'>
              <div className='items'>
                <p className='item'>Agregar una cuenta existente</p>
                <p className='item' onClick={() => navigate('/logout')}>
                  Cerrar la sesión de @{userData?.userName}
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
      <Outlet />
      {itemIndex !== 3 && (
        // Prevent rendering on Messages Page
        <aside className='right-sidebar'>
          <div className='search-container'>
            <div className='search'>
              <Icon className='icon' icon='iconamoon:search' />
              <input
                className='input-search'
                type='text'
                placeholder='Buscar'
              />
            </div>
          </div>
          <div className='sidebar-items'>
            {itemIndex === 0 && (
              <div className='premium'>
                <p className='title'>Suscríbete a Premium</p>
                <p className='body'>
                  Suscríbete para desbloquear nuevas funciones y, si eres
                  elegible, recibir un pago de cuota de ingresos por
                  anuncios.
                </p>
                <button type='button' className='subscribe-button'>
                  Suscribirse
                </button>
              </div>
            )}
            {[0, 2, 4, 5].includes(itemIndex) && (
              <div className='trends'>
                <p className='title'>Tendencias para ti</p>

                {randomTrends.map((trend) => (
                  <div className='trend' key={trend.name}>
                    <div className='info'>
                      <p className='header'>Tendencia</p>
                      <p className='name'>{trend.name}</p>
                      <p className='volume' v-if='trend.tweet_volume'>
                        {trend.tweet_volume} posts
                      </p>
                    </div>
                    <div className='options'>
                      <Icon
                        icon='mi:options-horizontal'
                        className='icon'
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {[0, 1, 2, 4, 5].includes(itemIndex) && (
              <div className='follow'>
                <p className='title'>
                  {itemIndex === 5 ? 'Tal vez te guste' : 'A quién seguir'}
                </p>
                {randomUsers.map((user) => (
                  <div className='user' key={user.userName}>
                    <img
                      className='profile-picture'
                      src={user.profilePicture}
                      alt={user.displayName}
                    />
                    <div className='info'>
                      <p className='display-name'>{user.displayName}</p>
                      <p className='user-name'>@{user.userName}</p>
                    </div>
                    <button className='follow-button'>Seguir</button>
                  </div>
                ))}
              </div>
            )}
            <div className='footer'>
              <a className='link' href='https://twitter.com/tos'>
                Condiciones de Servicio
              </a>
              <a className='link' href='https://twitter.com/privacy'>
                Política de Privacidad
              </a>
              <a
                className='link'
                href='https://support.twitter.com/articles/20170514'
              >
                Política de cookies
              </a>
              <a
                className='link'
                href='https://help.twitter.com/resources/accessibility'
              >
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
      {showMenu && (
        <div
          className='background'
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default Layout;
