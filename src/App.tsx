import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout
import Layout from '@/layout/Layout';

// Pages
import Home from '@/pages/Home';
import Register from '@/pages/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route element={<Layout />}>
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
