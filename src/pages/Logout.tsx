// React
import { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/login.store';

// React-router
import { useNavigate } from 'react-router-dom';

// Components
import { Icon } from '@iconify/react';

// Hooks
import { useTitle } from '@/hooks';

// Types
import type { FC } from 'react';
import type { pageProps } from '@/common/types';
import type { RootState } from '@/store';

// Styles
import '@/assets/Logout.scss';

const Logout: FC<pageProps> = ({ title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(
    (state: RootState) => state.login.isLoggedIn
  );

  useEffect(() => {
    if (!isLoggedIn) navigate('/register');
  }, [isLoggedIn, navigate]);

  useTitle(title);

  return (
    <div className='logout-container'>
      <div className='logout'>
        <div className='logo'>
          <Icon icon='simple-icons:x' />
        </div>
        <p className='title'>¿Deseas cerrar sesión en X?</p>
        <p className='body'>
          Puedes volver a iniciar sesión en cualquier momento. Si solo
          quieres cambiar de cuenta, puedes hacerlo agregando una cuenta
          existente.{' '}
        </p>
        <button
          className='close-button'
          type='button'
          onClick={() => dispatch(logout())}
        >
          Cerrar sesión
        </button>
        <button
          className='cancel-button'
          type='button'
          onClick={() => navigate('/home')}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default Logout;
