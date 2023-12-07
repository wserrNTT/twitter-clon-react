import { useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector, useForm } from '@/hooks';
import { setError, login, selectLoginStore } from '@/store/slices/login.store';

// Components
import { Icon } from '@iconify/react';
import Loader from '@/components/Loader';

// Types
import type { FC, FormEvent } from 'react';
import type { modalProps } from '@/common/types';

// Axios methods
import { getLoginUser, getUserByUsername } from '@/utils/axios';

// Styes
import '@/assets/Login.scss';

interface formData {
  username: string;
  password: string;
}

const Login: FC<modalProps> = ({ setShow: showModal }) => {
  const { username, password, updateForm } = useForm<formData>({
    username: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginStore = useAppSelector(selectLoginStore);
  const dispatch = useAppDispatch();

  // validates if user exists in DB
  const checkUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    if (username.length === 0) {
      setIsLoading(false);
      return dispatch(setError('Lo sentimos, no pudimos encontrar tu cuenta'));
    }
    try {
      await getUserByUsername(username);
      dispatch(setError(''));
      setPage(2);
      setIsLoading(false);
    } catch (error) {
      dispatch(setError('Lo sentimos, no pudimos encontrar tu cuenta'));
      setIsLoading(false);
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    if (password.length === 0) {
      setIsLoading(false);
      return dispatch(setError('Ingresa una contraseña'));
    }
    try {
      const { data } = await getLoginUser(username, password);
      setIsLoading(false);
      dispatch(login(data.user));
    } catch (error) {
      setIsLoading(false);
      return dispatch(setError('Contraseña incorrecta'));
    }
  };

  return (
    <div className='login-background'>
      <div className='login-container'>
        <div className='close-button' onClick={() => showModal(false)}>
          <Icon icon='tabler:x' />
        </div>
        {loginStore.error.length > 0 && (
          <div className='error-container'>
            <p className='text'>{loginStore.error}</p>
          </div>
        )}
        {page === 1 && !isLoading && (
          <form className='username-form' onSubmit={checkUser}>
            <div className='logo'>
              <Icon icon='simple-icons:x' />
            </div>
            <p className='title'>Inicia sesión en X</p>
            <button type='button' className='empty-button'>
              <Icon className='icon' icon='devicon:google' />
              <p className='light-font'>Iniciar sesión con Google</p>
            </button>
            <button type='button' className='empty-button'>
              <Icon className='icon' icon='bi:apple' />
              <p>Iniciar sesión con Apple</p>
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
                autoFocus
                name='username'
                placeholder=' '
                onChange={updateForm}
              />
              <span className='label'>Correo o nombre de usuario</span>
            </div>
            <button type='submit'>Siguiente</button>
            <button type='button' className='forgot-button'>
              ¿Olvidaste tu contraseña?
            </button>
            <p className='register-message'>
              ¿No tienes una cuenta?{' '}
              <span className='highlighted' onClick={() => showModal(false)}>
                Regístrate
              </span>
            </p>
          </form>
        )}
        {page === 2 && !isLoading && (
          <form className='login-form' onSubmit={handleLogin}>
            <div className='logo'>
              <Icon icon='simple-icons:x' />
            </div>
            <p className='title'>Introduce tu contraseña</p>
            <div className='field disabled-field'>
              <input
                className='input'
                type='text'
                placeholder=' '
                value={username}
                disabled
              />
              <span className='label'>Nombre de usuario</span>
            </div>
            <div className='field'>
              <input
                className='input'
                type={showPassword ? 'text' : 'password'}
                autoFocus
                name='password'
                placeholder=' '
                onChange={updateForm}
              />
              <span className='label'>Contraseña</span>
              <span
                className='reveal-button'
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon icon={showPassword ? 'akar-icons:eye-slashed' : 'akar-icons:eye'} />
              </span>
            </div>
            <button
              type='submit'
              className={`login-button ${password.length === 0 && 'button-disabled'}`}
              disabled={password.length === 0}
            >
              Iniciar sesión
            </button>
            <p className='register-message'>
              ¿No tienes una cuenta?{' '}
              <span className='highlighted' onClick={() => showModal(false)}>
                Regístrate
              </span>
            </p>
          </form>
        )}

        {isLoading && (
          <div className='loader-container'>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
