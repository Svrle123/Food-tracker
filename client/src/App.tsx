import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { ServiceProvider } from './core/contexts/ServiceProvider';
import { RegisterLogin } from './pages/user-form';
import { Navbar, NotFound } from './core/components';
import { MainLayout } from './pages/home';
import { login } from './features/user/userSlice';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App: FC = () => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const sessionUser: string | null = window.sessionStorage.getItem('user');

  if (sessionUser && !user._id) {
    dispatch(login({ ...JSON.parse(sessionUser) }));
  }

  return (
    <>
      <ServiceProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={!user._id ? <RegisterLogin /> : <MainLayout />} />
            {user?._id && (
              <Route path='/home' element={<MainLayout />} />
            )}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </ServiceProvider>
      <ToastContainer
        theme='dark'
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;