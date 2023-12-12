// Hooks
import { useTitle } from '@/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
// Components
import { Icon } from '@iconify/react';

const EmptyProfile = () => {
  useTitle('Perfil /X');
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className='profile-container'>
      <div className='title'>
        <div className='back-button' onClick={() => navigate(-1)}>
          <Icon className='icon' icon='fa6-solid:arrow-left' />
        </div>
        <div className='data'>
          <p className='display-name'>Perfil</p>
        </div>
      </div>
      <div className='empty-header-container'></div>
      <div className='profile-options'>
        <div className='profile-picture-container'>
          <div className='empty-profile-picture'></div>
        </div>
      </div>
      <div className='empty-data'>
        <p className='display-name'>@{location.pathname.split('/')[1]}</p>
      </div>
      <div className='empty-message'>
        <div className='message'>
          <p className='heading'>Esta cuenta no existe</p>
          <p className='subheading'>Intenta hacer otra búsqueda</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyProfile;
