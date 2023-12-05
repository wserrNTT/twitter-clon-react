// React
import { useState, useEffect } from 'react';

// Redux
import { selectTweetStore, fetchTweets } from '@/store/slices/tweet.store';
import { selectLoginStore } from '@/store/slices/login.store';

// Hooks
import { useTitle, useAppSelector, useAppDispatch } from '@/hooks';

// Utils
import { postTweet } from '@/utils/axios';
// Types
import type { FC, ChangeEvent, FormEvent } from 'react';
import type { pageProps } from '@/common/types';

// Components
import { Icon } from '@iconify/react';
import Tweet from '@/components/Tweet';
import Loader from '@/components/Loader';

// Styles
import '@/assets/Home.scss';

const Home: FC<pageProps> = ({ title }) => {
  useTitle(title);
  const [currentTab, setCurrentTab] = useState<string>('forYou');

  interface newTweet {
    body: string;
    loading: boolean;
    error: string;
  }

  const [newPost, setNewPost] = useState<newTweet>({
    body: '',
    loading: false,
    error: ''
  });
  const loginStore = useAppSelector(selectLoginStore);

  const tweetStore = useAppSelector(selectTweetStore);

  const dispatch = useAppDispatch();

  const handlePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewPost({ ...newPost, loading: true });
    try {
      await postTweet({
        author: loginStore.data._id,
        body: newPost.body,
        timeStamp: new Date().toString()
      });
      setNewPost({ body: '', loading: false, error: '' });
      dispatch(fetchTweets());
    } catch (error) {
      setNewPost({
        body: '',
        loading: false,
        error: 'Lo sentimos, no ha sido posible publicar'
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setNewPost({ ...newPost, body: value });
  };
  useEffect(() => {
    dispatch(fetchTweets());
  }, []);
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
            src={loginStore.data?.profilePicture}
            alt={`profile picture of ${loginStore.data?.displayName}`}
          />
        </div>
        <form className='input-container' onSubmit={handlePost}>
          {newPost.loading ? (
            <div className='loader-container'>
              <Loader />
            </div>
          ) : (
            <>
              <input
                className='new-tweet'
                type='text'
                placeholder='¡¿Qué está pasando?!'
                onChange={handleChange}
              />
              <div className='options'>
                <button
                  type='submit'
                  className={`post-button ${newPost.body.length === 0 && 'disabled'}`}
                  disabled={newPost.body.length === 0}
                >
                  Postear
                </button>
              </div>
            </>
          )}
        </form>
      </div>
      <div className='tweets-container'>
        {tweetStore.status === 'LOADING' ? (
          <div className='loader-container'>
            <Loader />
          </div>
        ) : (
          tweetStore.tweets.map((tweet) => <Tweet tweet={tweet} key={tweet._id} />)
        )}
      </div>
    </div>
  );
};

export default Home;
