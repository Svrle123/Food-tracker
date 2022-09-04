import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { ServiceProvider } from './core/contexts/ServiceProvider';
import { RegisterLogin } from './pages/user-form';
import { Navbar, Notification, NotFound } from './core/components';
import { MainLayout } from './pages/home';
import { logIn } from './features/user/userSlice';


const App: FC = () => {
  const user = useAppSelector(state => state.user);
  const error = useAppSelector(state => state.error);
  const dispatch = useAppDispatch();
  const sessionUser: string | null = window.sessionStorage.getItem('user');

  if (sessionUser && !user._id) {
    dispatch(logIn({ ...JSON.parse(sessionUser) }));
  }

  return (
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
        {error?.timeStamp && <Notification {...error} />}
      </Router>
    </ServiceProvider>
  );
}

export default App;