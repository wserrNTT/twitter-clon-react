import { useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setError, login, selectLoginError } from '@/store/login.store';

// Components
import { Icon } from '@iconify/react';
import Loader from '@/components/Loader';

// Types
import type { FC, ChangeEvent, FormEvent } from 'react';
import type { modalProps } from '@/common/types';

// Utils
import { getLoginUser, getUserByUsername } from '@/utils/axios';

// Styes
import '@/assets/Login.scss';

const Login: FC<modalProps> = ({ setShow }) => {
  const [userData, setUserData] = useState<{ username: string; password: string }>({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginError = useAppSelector(selectLoginError);
  const dispatch = useAppDispatch();

  const checkUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    if (userData.username.length === 0) {
      setIsLoading(false);
      return dispatch(setError('Lo sentimos, no pudimos encontrar tu cuenta'));
    }
    try {
      await getUserByUsername(userData.username);
      dispatch(setError(''));
      setStep(2);
      setIsLoading(false);
    } catch (error) {
      dispatch(setError('Lo sentimos, no pudimos encontrar tu cuenta'));
      setIsLoading(false);
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    if (userData.password.length === 0) {
      setIsLoading(false);
      return dispatch(setError('Ingresa una contraseña'));
    }
    try {
      const { data } = await getLoginUser(userData.username, userData.password);
      setIsLoading(false);
      dispatch(login(data.user));
    } catch (error) {
      setIsLoading(false);
      return dispatch(setError('Contraseña incorrecta'));
    }
  };
  // Updates state value from input
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  // Closes the modal window
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div className='login-background'>
      <div className='login-container'>
        <div className='close-button' onClick={handleClose}>
          <Icon icon='tabler:x' />
        </div>
        {loginError.length > 0 && (
          <div className='error-container'>
            <p className='text'>{loginError}</p>
          </div>
        )}
        {step === 1 && !isLoading && (
          <form className='username-form' onSubmit={checkUser}>
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
                autoFocus
                name='username'
                placeholder=' '
                onChange={handleChange}
              />
              <span className='label'>Correo o nombre de usuario</span>
            </div>
            <button type='submit'>Siguiente</button>
            <button type='button' className='forgot-button'>
              ¿Olvidaste tu contraseña?
            </button>
            <p className='register-message'>
              ¿No tienes una cuenta?{' '}
              <span className='highlighted' onClick={handleClose}>
                Regístrate
              </span>
            </p>
          </form>
        )}
        {step === 2 && !isLoading && (
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
                value={userData.username}
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
                onChange={handleChange}
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
              className={`login-button ${
                userData.password.length === 0 && 'button-disabled'
              }`}
            >
              Iniciar sesión
            </button>
            <p className='register-message'>
              ¿No tienes una cuenta?{' '}
              <span className='highlighted' onClick={handleClose}>
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
