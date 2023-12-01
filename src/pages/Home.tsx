// React
import { useState } from 'react';

// Redux
import type { RootState } from '@/store';

// Hooks
import { useTitle, useAppSelector } from '@/hooks';
import { selectTweets } from '@/store/tweet.store';
// Types
import type { FC } from 'react';
import type { pageProps } from '@/common/types';

// Components
import { Icon } from '@iconify/react';
import Tweet from '@/components/Tweet';

// Styles
import '@/assets/Home.scss';

const Home: FC<pageProps> = ({ title }) => {
  const [currentTab, setCurrentTab] = useState('forYou');
  const userData = useAppSelector((state: RootState) => state.login.data);
  const tweets = useAppSelector(selectTweets);

  useTitle(title);
  return (
    <div className='home-container'>
      <div className='tabs'>
        <div
          className={`tab ${currentTab === 'forYou' && 'tab-active'}`}
          onClick={() => setCurrentTab('forYou')}
        >
          <p className='text'>Para ti</p>
        </div>
        <div
          className={`tab ${currentTab === 'following' && 'tab-active'}`}
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
            alt={`profile picture of ${userData?.displayName}`}
          />
        </div>
        <div className='input-container'>
          <input className='new-tweet' type='text' placeholder='¡¿Qué está pasando?!' />
          <div className='options'>
            <button type='button' className='post-button'>
              Postear
            </button>
          </div>
        </div>
      </div>
      <div className='tweets-container'>
        {tweets.map((tweet) => (
          <Tweet tweet={tweet} key={tweet._id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
