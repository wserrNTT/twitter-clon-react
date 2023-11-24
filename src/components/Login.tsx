// Redux
import { useDispatch } from 'react-redux';
import { login } from '@/store/login.store';

// Components
import { Icon } from '@iconify/react';

// Types
import type { FC } from 'react';
import type { modalProps } from '@/common/types';

// Styes
import '@/assets/Login.scss';

const Login: FC<modalProps> = ({ setShow }) => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(
      login({
        username: 'user123',
        displayname: 'user',
        profilePicture:
          'https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg',
        following: 625,
        followers: 23
      })
    );
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div className='login-background'>
      <div className='login-container'>
        <div className='close-button' onClick={handleClose}>
          <Icon icon='tabler:x' />
        </div>
        <div className='login-form'>
          <div className='logo'>
            <Icon icon='simple-icons:x' />
          </div>
          <p className='title'>Inicia sesión en X</p>
          <button type='button' className='empty-button'>
            <Icon icon='devicon:google' width='1.6rem' />
            Inicia sesión con Google
          </button>
          <button type='button' className='empty-button'>
            <Icon icon='bi:apple' width='1.6rem' />
            Inicia sesión con Apple
          </button>
          <div className='separator'>
            <span className='line'></span>
            <span>o</span>
            <span className='line'></span>
          </div>
          <div className='field'>
            <input className='input' type='text' placeholder=' ' />
            <span className='label'>Correo o nombre de usuario</span>
          </div>
          <button type='button' onClick={handleLogin}>
            Siguiente
          </button>
          <button type='button' className='forgot-button'>
            ¿Olvidaste tu contraseña?
          </button>
          <p className='register'>
            ¿No tienes una cuenta?{' '}
            <span className='highlighted' onClick={handleClose}>
              Regístrate
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
