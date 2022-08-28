import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ServiceProvider } from './core/contexts/ServiceProvider';

import SignInForm from './pages/user-form/components/SignInForm';

const App: FC = () => {
  return (
    <ServiceProvider>
      <Router>
        <Routes>
          <Route path='/' element={<SignInForm />} />
        </Routes>
      </Router>
    </ServiceProvider>
  );
}

export default App;
