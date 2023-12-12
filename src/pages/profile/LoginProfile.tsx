// Hooks
import { useState, useEffect } from 'react';
import { useTitle } from '@/hooks';
import { useNavigate } from 'react-router-dom';

//Components
import { Icon } from '@iconify/react';
import Loader from '@/components/Loader';
import Tweet from '@/components/Tweet';

// Types
import type { FC } from 'react';
import type { profileProps } from '.';
import type { ITweet } from '@/common/types';

// Utils
import { getTweetsByUser } from '@/utils/axios';

// Assets
import defaultProfile from '@/assets/img/default_profile.png';

const LoginProfile: FC<profileProps> = ({ profile }) => {
  useTitle(`${profile.displayName} (@${profile.userName}) /X`);
  const navigate = useNavigate();
  const [profileTweets, setProfileTweets] = useState<{
    tweets: ITweet[];
    loading: boolean;
  }>({ tweets: [], loading: false });
  const [currentTab, setCurrentTab] = useState<string>('posts');

  const fetchTweets = async (userIDs: string[]) => {
    setProfileTweets({ ...profileTweets, loading: true });
    const { data } = await getTweetsByUser(userIDs);
    setProfileTweets({ tweets: data, loading: false });
  };

  useEffect(() => {
    fetchTweets([profile._id]);
  }, []);

  return (
    <div className='profile-container'>
      <div className='title'>
        <div className='back-button' onClick={() => navigate(-1)}>
          <Icon className='icon' icon='fa6-solid:arrow-left' />
        </div>
        <div className='data'>
          <p className='display-name'>{profile.displayName}</p>
          <p className='posts-amount'>{profileTweets.tweets?.length} posts</p>
        </div>
      </div>
      <div className='header-container'></div>
      <div className='profile-options'>
        <div className='profile-picture-container'>
          <img
            src={profile.profilePicture || defaultProfile}
            alt=''
            className='profile-picture'
          />
        </div>
        <button type='button' className='edit-button'>
          Editar Perfil
        </button>
      </div>
      <div className='profile-data'>
        <p className='display-name'>{profile.displayName}</p>
        <p className='user-name'>@{profile.userName}</p>
        <div className='follow-container'>
          <p className='following'>
            <span className='bold'>{profile.following.length} </span>
            Siguiendo
          </p>
          <p className='followers'>
            <span className='bold'>{profile.followers.length} </span>
            Seguidores
          </p>
        </div>
      </div>
      <div className='tabs'>
        <div
          className={`tab ${currentTab === 'posts' && 'tab-active'}`}
          onClick={() => setCurrentTab('posts')}
        >
          <p className='text'>Posts</p>
        </div>
        <div
          className={`tab ${currentTab === 'replies' && 'tab-active'}`}
          onClick={() => setCurrentTab('replies')}
        >
          <p className='text'>Respuestas</p>
        </div>
      </div>
      <div className='tweets-container'>
        {profileTweets.loading ? (
          <div className='loader-container'>
            <Loader />
          </div>
        ) : (
          profileTweets.tweets.map((tweet) => <Tweet tweet={tweet} key={tweet._id} />)
        )}
      </div>
    </div>
  );
};

export default LoginProfile;
