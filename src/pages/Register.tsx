// Assets
import logo from '/favicon.jpg';
import '@/assets/Register.scss';

// Types
import type { FC } from 'react';

const Register: FC = () => {
  return (
    <div className='register-container'>
      <div className='x-container'>
        <img className='logo' src={logo} alt='x-logo' />
      </div>
      <div className='info-container'>
        <h2>Lo que está pasando ahora</h2>
        <div className='buttons-container'>
          <h3>únete Hoy</h3>
          <button className='empty-button'>Registrate con Google</button>
          <button className='empty-button'>Registrate con Apple</button>
          <div className='separator'>
            <span className='line'></span>
            <span>o</span>
            <span className='line'></span>
          </div>
          <button className='full-button'>Crear Cuenta</button>
          <p className='terms'>
            Al registrarte, aceptas los
            <span className='highlighted'>Términos de servicio</span>y la{' '}
            <span className='highlighted'>Política de privacidad</span>,
            incluída la política de{' '}
            <span className='highlighted'>Uso de Cookies</span>.
          </p>
          <h4 className='login-question'>¿Ya tienes una cuenta?</h4>
          <button className='login-button'>Iniciar sesión</button>
        </div>
      </div>
      <footer>
        <a href=''>información</a>
        <a href=''>Descargar la app de X</a>
        <a href=''>Centro de Ayuda</a>
        <a href=''>Condiciones de Servicio</a>
        <a href=''>Política de Privacidad</a>
        <a href=''>Política de Cookies</a>
        <a href=''>Accesibilidad</a>
        <a href=''>Información de anuncios</a>
        <a href=''>Blog</a>
        <a href=''>Estado</a>
        <a href=''>Empleos</a>
        <a href=''>Recursos para Marcas</a>
        <a href=''>Publicidad</a>
        <a href=''>Marketing</a>
        <a href=''>X para empresas</a>
        <a href=''>Desarrolladores</a>
        <a href=''>Guía</a>
        <a href=''>Configuración</a>
        <span>© 2023 X Corp</span>
      </footer>
    </div>
  );
};

export default Register;
