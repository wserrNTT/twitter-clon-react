import { useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '@/hooks';
import { fetchLoginData, selectLoginError } from '@/store/login.store';

// Components
import { Icon } from '@iconify/react';

// Types
import type { FC, ChangeEvent } from 'react';
import type { modalProps } from '@/common/types';

// Styes
import '@/assets/Login.scss';

const Login: FC<modalProps> = ({ setShow }) => {
  const [username, setUsername] = useState('');
  const loginError = useAppSelector(selectLoginError);
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(fetchLoginData({ loginuser: username, loginpassword: '123456' }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setUsername(value);
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
        {loginError && (
          <div className='error-container'>
            <p className='text'>Lo sentimos, no pudimos encontrar tu cuenta</p>
          </div>
        )}
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
            <input
              className='input'
              type='text'
              placeholder=' '
              onChange={handleChange}
            />
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
