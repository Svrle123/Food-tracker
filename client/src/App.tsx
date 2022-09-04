import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import { ServiceProvider } from './core/contexts/ServiceProvider';
import { RegisterLogin } from './pages/user-form/components';
import { Navbar, Notification, NotFound } from './core/components';
import { MainLayout } from './pages/home/components';


const App: FC = () => {
  const user = useAppSelector(state => state.user);
  const error = useAppSelector(state => state.error);

  return (
    <ServiceProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<RegisterLogin />} />
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