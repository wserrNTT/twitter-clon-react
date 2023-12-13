import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout
import Layout from '@/layout/Layout';

// Pages
import Register from '@/pages/Register';
import Home from '@/pages/Home';
import Explore from '@/pages/Explore';
import Notifications from '@/pages/Notifications';
import Messages from '@/pages/Messages';
import Profile from '@/pages/profile';
import Lists from '@/pages/Lists';
import Hashtag from './pages/Hashtag';
import Logout from '@/pages/Logout';
import TweetPage from './pages/TweetPage';

// Redux
import { useAppSelector } from './hooks';
import { selectLoginStore } from './store/slices/login.store';
import NotFound from './pages/NotFound';

const App = () => {
  const loginStore = useAppSelector(selectLoginStore);
  return (
    <BrowserRouter>
      <Routes>
        {loginStore.isLoggedIn ? (
          <>
            <Route element={<Layout />}>
              <Route path='/' element={<Home title='Inicio /X' />} />
              <Route path='/home' element={<Home title='Inicio /X' />} />
              <Route path='/explore' element={<Explore title='Explorar /X' />} />
              <Route
                path='/notifications'
                element={<Notifications title='Notificaciones /X' />}
              />
              <Route path='/messages' element={<Messages title='Mensajes /X' />} />
              <Route path='/:username' element={<Profile />} />
              <Route path='/:id/lists' element={<Lists />} />
              <Route path='/:id/status/:tweetId' element={<TweetPage />} />
              <Route path='/hashtag/:hashtagName' element={<Hashtag />} />
              <Route path='/notfound' element={<NotFound />} />
              <Route path='/*' element={<NotFound />} />
            </Route>
            <Route path='/logout' element={<Logout title='X' />} />
          </>
        ) : (
          <Route path='/*' element={<Register title='X. Es lo que está pasando /X' />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
