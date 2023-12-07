// Redux
import { useAppSelector } from '@/hooks';
import { selectHashtagStore } from '@/store/slices/hashtag.store';
// Hooks
import { useTitle } from '@/hooks';

// Components
import { Icon } from '@iconify/react';

// Types
import type { FC } from 'react';
import type { pageProps } from '@/common/types';

// Styles
import '@/assets/Explore.scss';
const Explore: FC<pageProps> = ({ title }) => {
  useTitle(title);

  const hashtagStore = useAppSelector(selectHashtagStore);
  return (
    <div className='explore-container'>
      <div className='search-container'>
        <div className='search'>
          <Icon className='icon' icon='iconamoon:search' />
          <input className='input-search' type='text' placeholder='Buscar' />
        </div>
      </div>
      <div className='trends'>
        <p className='title'>Tendencias para ti</p>
        {hashtagStore.hashtags.map((hashtag) => (
          <div className='trend'>
            <div className='info'>
              <p className='header'>Tendencia</p>
              <p className='name'>{hashtag.name}</p>
              <p className='volume' v-if='hashtag.tweet_volume?.length'>
                {hashtag.tweet_volume?.length} posts
              </p>
            </div>
            <div className='options'>
              <Icon icon='mi:options-horizontal' className='icon' />
            </div>
          </div>
        ))}

        <div className='show-more'>
          <p className='text'>Mostrar más</p>
        </div>
      </div>
    </div>
  );
};

export default Explore;
