// React
import { useState, useEffect } from 'react';

// Redux
import { selectTweets, setTweetsError, setTweets } from '@/store/tweet.store';
import { selectUser } from '@/store/login.store';

// Hooks
import { useTitle, useAppSelector, useAppDispatch } from '@/hooks';

// Utils
import { getTweets, postTweet } from '@/utils/axios';
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

  const [newPost, setNewPost] = useState<{
    body: string;
    loading: boolean;
    error: string;
  }>({
    body: '',
    loading: false,
    error: ''
  });
  const userData = useAppSelector(selectUser);

  const tweets = useAppSelector(selectTweets);
  const [tweetsLoading, setTweetsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const fetchTweets = async () => {
    setTweetsLoading(true);
    try {
      const { data } = await getTweets();
      dispatch(setTweets(data));
      dispatch(setTweetsError(''));
      setTweetsLoading(false);
    } catch (error) {
      dispatch(setTweetsError('Error al cargar el contenido'));
      setTweetsLoading(false);
    }
  };

  const handlePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewPost({ ...newPost, loading: true });
    try {
      await postTweet({
        author: userData._id,
        body: newPost.body,
        timeStamp: new Date().toString()
      });
      setNewPost({ body: '', loading: false, error: '' });
      fetchTweets();
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
    fetchTweets();
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
            src={userData?.profilePicture}
            alt={`profile picture of ${userData?.displayName}`}
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
        {tweetsLoading ? (
          <div className='loader-container'>
            <Loader />
          </div>
        ) : (
          tweets.map((tweet) => <Tweet tweet={tweet} key={tweet._id} />)
        )}
      </div>
    </div>
  );
};

export default Home;
