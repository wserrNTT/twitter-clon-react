// React
import { useState } from 'react';

// Components
import { Icon } from '@iconify/react';
import Login from '@/components/Login';

// Hooks
import { useTitle } from '@/hooks';

// Types
import type { FC } from 'react';
import type { pageProps } from '@/common/types';

// Styles
import '@/assets/Register.scss';

const Register: FC<pageProps> = ({ title }) => {
  const [showLogin, setShowLogin] = useState(false);

  useTitle(title);

  return (
    <>
      <div className='register-container'>
        <div className='x-container'>
          <Icon className='icon' icon='simple-icons:x' color='#e7e9ea' />
        </div>
        <div className='info-container'>
          <h2>Lo que está pasando ahora</h2>
          <div className='buttons-container'>
            <h3>Únete Hoy</h3>
            <button type='button' className='empty-button'>
              <Icon className='icon' icon='devicon:google' />
              Registrate con Google
            </button>
            <button type='button' className='empty-button'>
              <Icon className='icon' icon='bi:apple' />
              Registrate con Apple
            </button>
            <div className='separator'>
              <span className='line'></span>
              <span>o</span>
              <span className='line'></span>
            </div>
            <button type='button' className='full-button'>
              Crear Cuenta
            </button>
            <p className='terms'>
              Al registrarte, aceptas los{' '}
              <a href='https://twitter.com/tos' className='highlighted'>
                Términos de servicio{' '}
              </a>
              y la{' '}
              <a href='https://twitter.com/privacy' className='highlighted'>
                Política de privacidad
              </a>
              , incluída la política de{' '}
              <a
                href='https://help.twitter.com/rules-and-policies/twitter-cookies'
                className='highlighted'
              >
                Uso de Cookies
              </a>
              .
            </p>
            <h4 className='login-question'>¿Ya tienes una cuenta?</h4>
            <button
              type='button'
              className='login-button'
              onClick={() => setShowLogin(true)}
            >
              Iniciar sesión
            </button>
          </div>
        </div>
        <footer>
          <a href='https://about.twitter.com/'>información</a>
          <a href='https://help.twitter.com/using-x/download-the-x-app'>
            Descargar la app de X
          </a>
          <a href='https://help.twitter.com/'>Centro de Ayuda</a>
          <a href='https://twitter.com/tos'>Condiciones de Servicio</a>
          <a href='https://twitter.com/privacy'>Política de Privacidad</a>
          <a href='https://support.twitter.com/articles/20170514'>Política de Cookies</a>
          <a href='https://help.twitter.com/resources/accessibility'>Accesibilidad</a>
          <a href='https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo'>
            Información de anuncios
          </a>
          <a href='https://blog.twitter.com/'>Blog</a>
          <a href='https://status.twitterstat.us/'>Estado</a>
          <a href='https://careers.twitter.com/'>Empleos</a>
          <a href='https://about.twitter.com/press/brand-assets'>Recursos para Marcas</a>
          <a href='https://ads.twitter.com/?ref=gl-tw-tw-twitter-advertise'>Publicidad</a>
          <a href='https://marketing.twitter.com/'>Marketing</a>
          <a href='https://business.twitter.com/?ref=web-twc-ao-gbl-twitterforbusiness&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=twitterforbusiness'>
            X para empresas
          </a>
          <a href='https://developer.twitter.com/'>Desarrolladores</a>
          <a href='https://twitter.com/i/directory/profiles'>Guía</a>
          <a href='https://twitter.com/settings'>Configuración</a>
          <span>© 2023 X Corp</span>
        </footer>
      </div>
      {showLogin && <Login setShow={setShowLogin} />}
    </>
  );
};

export default Register;
