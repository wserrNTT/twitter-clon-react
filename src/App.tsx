import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.scss';

import { useSelector, useDispatch } from 'react-redux';

import type { RootState } from './store';
import { increment, incrementBy } from './store/counter.store';

function App() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React + Redux</h1>
      <div className='card'>
        <button onClick={() => dispatch(increment())}>
          count is {count}
        </button>
        <button onClick={() => dispatch(incrementBy(5))}>
          Increment by 5
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
