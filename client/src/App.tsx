import { Provider } from 'react-redux';
import './App.css';
import Toast from './components/generalComponents/Toast';
import Login from './pages/Login';
import { store } from './redux/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Toast />
        <Login />
      </Provider>
    </>
  );
}

export default App;
