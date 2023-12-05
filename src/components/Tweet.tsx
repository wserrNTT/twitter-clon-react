// Components
import { Icon } from '@iconify/react';

// Types
import type { ITweet } from '@/common/types';
import type { FC } from 'react';

// Styles
import '@/assets/Tweet.scss';

const Tweet: FC<{ tweet: ITweet }> = ({ tweet }) => {
  // Formats timestamp
  const formatDate = (date: string) => {
    const dateConverted = new Date(date);
    const currentTime = new Date().valueOf();
    const seconds = (currentTime - dateConverted.valueOf()) / 1000;
    // format in case of seconds
    if (seconds <= 60) return `${Math.floor(seconds)}s`;
    // format in case of minutes
    if (seconds <= 3600) return `${Math.floor(seconds / 60)}m`;
    // format in case of hours
    if (seconds <= 86400) return `${Math.floor(seconds / 3600)}h`;
    return dateConverted
      .toLocaleString('default', { day: '2-digit', month: 'short' })
      .replace('-', ' ');
  };

  return (
    <div className='tweet'>
      <div className='profile-container'>
        <img
          src={tweet.author.profilePicture}
          alt={`profile picture of ${tweet.author.displayName}`}
        />
      </div>
      <div className='data'>
        <div className='user-data'>
          <p className='display-name'>{tweet.author.displayName}</p>
          <p className='user-name'>@{tweet.author.userName}</p>·
          <p className='timestamp'>{formatDate(tweet.timeStamp)}</p>
          <div className='options'>
            <Icon icon='mi:options-horizontal' className='icon' />
          </div>
        </div>
        <div className='tweet-body'>
          {tweet.body}
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
  );
};

export default Tweet;
