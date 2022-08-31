import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ServiceProvider } from './core/contexts/ServiceProvider';
import { Navbar } from './core/components';
import { RegisterLogin } from './pages/user-form/components';

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
