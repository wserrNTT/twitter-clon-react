// Redux
import { selectLoginStore, updateFollowing } from '@/store/slices/login.store';
import { selectLastUsers, fetchUsers } from '@/store/slices/user.store';
import { selectLastHashtags, fetchHashtags } from '@/store/slices/hashtag.store';
import { selectCurrentRoute } from '@/store/slices/route.store';

// Hooks
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useNavigate } from 'react-router-dom';
// Components
import { Icon } from '@iconify/react';

// Utils
import { follow, unfollow } from '@/utils/axios';
import { showIn, hideIn } from '@/utils';

const RightSidebar = () => {
  const [show, setShow] = useState({
    hashtags: false,
    users: false
  });
  const dispatch = useAppDispatch();

  const loginStore = useAppSelector(selectLoginStore);

  const users = useAppSelector(selectLastUsers);
  const hashtags = useAppSelector(selectLastHashtags);
  const currentRoute = useAppSelector(selectCurrentRoute);

  const navigate = useNavigate();

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
    <aside className='right-sidebar'>
      {hideIn(['explore'], currentRoute) && (
        <div className='search-container'>
          <div className='search'>
            <Icon className='icon' icon='iconamoon:search' />
            <input className='input-search' type='text' placeholder='Buscar' />
          </div>
        </div>
      )}
      <div className='sidebar-items'>
        {showIn(['home'], currentRoute) && (
          <div className='premium'>
            <p className='title'>Suscríbete a Premium</p>
            <p className='body'>
              Suscríbete para desbloquear nuevas funciones y, si eres elegible, recibir un
              pago de cuota de ingresos por anuncios.
            </p>
            <button type='button' className='subscribe-button'>
              Suscribirse
            </button>
          </div>
        )}
        {hideIn(['explore'], currentRoute) && (
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
                <button className='follow-button' onClick={() => handleFollow(user._id)}>
                  Seguir
                </button>
              )}
            </div>
          ))}
          {!show.users && (
            <div className='show-more' onClick={() => setShow({ ...show, users: true })}>
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
  );
};

export default RightSidebar;
