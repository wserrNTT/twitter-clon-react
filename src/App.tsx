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
        <Route path='/' element={<Register />} />
        <Route element={<Layout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/:id' element={<Profile />} />
          <Route path='/:id/lists' element={<Lists />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
