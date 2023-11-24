import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout
import Layout from '@/layout/Layout';

// Pages
import Register from '@/pages/Register';
import Home from '@/pages/Home';
import Explore from '@/pages/Explore';
import Notifications from '@/pages/Notifications';
import Messages from '@/pages/Messages';
import Profile from '@/pages/Profile';
import Lists from '@/pages/Lists';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Register title='X. Es lo que está pasando /X' />}
        />
        <Route element={<Layout />}>
          <Route path='/home' element={<Home title='Inicio /X' />} />
          <Route
            path='/explore'
            element={<Explore title='Explorar /X' />}
          />
          <Route
            path='/notifications'
            element={<Notifications title='Notificaciones /X' />}
          />
          <Route
            path='/messages'
            element={<Messages title='Mensajes /X' />}
          />
          <Route path='/:id' element={<Profile />} />
          <Route path='/:id/lists' element={<Lists />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
