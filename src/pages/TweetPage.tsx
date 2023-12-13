// React-Router
import { Link } from 'react-router-dom';

// Redux
import { selectTweetID } from '@/store/slices/tweet.store';

// Hooks
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppSelector } from '@/hooks';

// Utils
import { extractHashtags } from '@/utils';

// Components
import { Icon } from '@iconify/react';

// Styles
import '@/assets/TweetPage.scss';

const TweetPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const tweet = useAppSelector(selectTweetID(params.tweetId));
  useEffect(() => {
    if (!tweet) navigate('/notfound');
  }, []);
  return (
    tweet && (
      <div className='tweetpage-container'>
        <div className='title'>
          <div className='back-button' onClick={() => navigate(-1)}>
            <Icon className='icon' icon='fa6-solid:arrow-left' />
          </div>
          <div className='data'>
            <p className='display-name'>Post</p>
          </div>
        </div>
        <div className='tweet'>
          <div className='profile-container'>
            <img
              src={tweet.author.profilePicture}
              alt={`profile picture of ${tweet.author.displayName}`}
            />
            <div className='user-data'>
              <p className='display-name'>{tweet.author.displayName}</p>
              <p className='user-name'>@{tweet.author.userName}</p>
            </div>
            <div className='options'>
              <Icon icon='mi:options-horizontal' className='icon' />
            </div>
          </div>
          <div className='tweet-body'>
            <div className='text'>
              {extractHashtags(tweet.body).map((word) =>
                word.startsWith('#') ? (
                  <Link to={`/hashtag/${word.split('#')[1]}`} key={word}>
                    {word}
                  </Link>
                ) : (
                  <p key={word}>{word}</p>
                )
              )}
            </div>
            {tweet.picture && <img className='picture' src={tweet.picture} alt='' />}
          </div>
          <div className='interactions'>
            <div className='interaction comments'>
              <Icon className='icon' icon='majesticons:comment-2-line' />
              {tweet.comments?.length}
            </div>
            <div className='interaction reposts'>
              <Icon className='icon' icon='bx:repost' />
              {tweet.reposts?.length}
            </div>
            <div className='interaction likes'>
              <Icon className='icon' icon='mdi:heart-outline' />
              {tweet.likes?.length}
            </div>
            <div className='interaction views'>
              <Icon className='icon' icon='ion:stats-chart' />
              {tweet.views?.length}
            </div>
            <div className=' save'>
              <Icon className='icon' icon='akar-icons:ribbon' />
            </div>
            <div className=' share'>
              <Icon className='icon' icon='fluent:share-ios-24-filled' />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TweetPage;
