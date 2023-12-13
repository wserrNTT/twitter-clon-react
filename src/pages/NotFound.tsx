// Hooks
import { useNavigate } from 'react-router-dom';

// Components
import { Icon } from '@iconify/react';

// Styles
import '@/assets/NotFound.scss';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='notfound-container'>
      <div className='title'>
        <div className='back-button' onClick={() => navigate('/home')}>
          <Icon className='icon' icon='fa6-solid:arrow-left' />
        </div>
      </div>
      <div className='message'>
        <p className='text'>Esta página no existe. Intenta hacer otra búsqueda.</p>
      </div>
    </div>
  );
};

export default NotFound;
