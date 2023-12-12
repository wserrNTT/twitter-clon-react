// Redux
import { selectTweetStore } from '@/store/slices/tweet.store';

// Hooks
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTitle, useAppSelector } from '@/hooks';

// Components
import { Icon } from '@iconify/react';
import Tweet from '@/components/Tweet';
import Loader from '@/components/Loader';

// Utils
import { getHashtag } from '@/utils/axios';

// Types
import type { FC } from 'react';
import type { IHashtag } from '@/common/types';

// Styles
import '@/assets/Hashtag.scss';

const Hashtag: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [routeHashtag] = useState<string>(location.pathname.split('/')[2]);
  const [hashtag, setHashtag] = useState<IHashtag>();
  const [loading, setLoading] = useState<boolean>(true);

  useTitle(`#${routeHashtag} /X`);

  const tweetStore = useAppSelector(selectTweetStore);

  const fetchHashtag = async (hashtagName: string) => {
    setLoading(true);
    try {
      const { data } = await getHashtag(hashtagName);
      setHashtag(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHashtag(location.pathname.split('/')[2]);
  }, [location]);
  return (
    <div className='hashtag-container'>
      <div className='title'>
        <div className='back-button' onClick={() => navigate(-1)}>
          <Icon className='icon' icon='fa6-solid:arrow-left' />
        </div>
        <div className='data'>
          <p className='display-name'>{routeHashtag}</p>
        </div>
      </div>
      {loading ? (
        <div className='loader-container'>
          <Loader />
        </div>
      ) : hashtag ? (
        <div className='tweets-container'>
          {hashtag.tweet_volume?.map((tweetID) => {
            const tweet = tweetStore.tweets.find((tweet) => tweet._id === tweetID);
            return tweet ? <Tweet tweet={tweet} key={tweetID} /> : null;
          })}
        </div>
      ) : (
        <div className='no-result'>
          <p className='message'>No hay resultados para "#{routeHashtag}"</p>
          <p className='suggestion'>
            Intenta buscar otra cosa o consulta tu configuración de búsqueda para ver si
            te están protegiendo de ver contenido potencialmente delicado.
          </p>
        </div>
      )}
    </div>
  );
};

export default Hashtag;
