// React
import { useState, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

// Utils
import { updateDocumentTitle } from '@/utils';

// Types
import type { FC } from 'react';
import type { pageProps } from '@/common/types';

// Components
import { Icon } from '@iconify/react';

// Styles
import '@/assets/Home.scss';

const Home: FC<pageProps> = ({ title }) => {
  const [currentTab, setCurrentTab] = useState('forYou');
  const userData = useSelector((state: RootState) => state.login.data);
  useEffect(() => {
    updateDocumentTitle(title);
  });
  return (
    <div className='home-container'>
      <div className='tabs'>
        <div
          className={`tab ${currentTab === 'forYou' && 'tav-active'}`}
          onClick={() => setCurrentTab('forYou')}
        >
          <p className='text'>Para ti</p>
        </div>
        <div
          className={`tab ${currentTab === 'following' && 'tav-active'}`}
          onClick={() => setCurrentTab('following')}
        >
          <p className='text'>Siguiendo</p>
        </div>
        <div className='settings'>
          <Icon className='icon' icon='mi:settings' />
        </div>
      </div>
      <div className='post-container'>
        <div className='profile-container'>
          <img
            src={userData?.profilePicture}
            alt={`profile picture of ${userData?.displayname}`}
          />
        </div>
        <div className='input-container'>
          <input
            className='new-tweet'
            type='text'
            placeholder='¡¿Qué está pasando?!'
          />
          <div className='options'>
            <button type='button' className='post-button'>
              Postear
            </button>
          </div>
        </div>
      </div>
      <div className='tweets-container'></div>
    </div>
  );
};

export default Home;
