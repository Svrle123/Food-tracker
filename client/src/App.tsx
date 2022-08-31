import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './core/components/Navbar';
import { ServiceProvider } from './core/contexts/ServiceProvider';
import RegisterLogin from './pages/user-form/RegisterLogin';

const App: FC = () => {
  return (
    <ServiceProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<RegisterLogin />} />
        </Routes>
      </Router>
    </ServiceProvider>
  );
}

export default App;
