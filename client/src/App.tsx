import { lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LazyComponent from './components/generalComponents/Suspense';
import Toast from './components/generalComponents/Toast';
import { store } from './redux/store';

const Login = lazy(() => import('./pages/Login'));
const Animes = lazy(() => import('./pages/Animes'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <Provider store={store}>
      <Toast />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LazyComponent>
                <Login />
              </LazyComponent>
            }
          />
          <Route
            path="/animes"
            element={
              <LazyComponent>
                <Animes />
              </LazyComponent>
            }
          />
          <Route
            path="/profile"
            element={
              <LazyComponent>
                <Profile />
              </LazyComponent>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
