/* #region  imports */
import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { ServiceProvider } from './core/contexts/ServiceProvider';
import { RegisterLogin } from './pages/user-form';
import { Navbar, NotFound } from './core/components';
import { MainLayout } from './pages/home';
import { login } from './features/user/userSlice';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Grid } from '@mui/material';
/* #endregion */

/* #region  constants */
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
/* #endregion */

const App: FC = () => {
  /* #region  state */
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const sessionUser: string | null = window.sessionStorage.getItem('user');

  if (sessionUser && !user._id) {
    dispatch(login({ ...JSON.parse(sessionUser) }));
  }
  /* #endregion */

  /* #region  render */
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <ServiceProvider>
          <Router>
            <Grid container spacing={10}>
              <Grid item xs={1}>
                <Navbar />
              </Grid>
              <Grid item xs={11}>
                <Routes>
                  <Route path='/' element={!user._id ? <RegisterLogin /> : <MainLayout />} />
                  {user?._id && (
                    <Route path='/home' element={<MainLayout />} />
                  )}
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </Grid>
            </Grid>
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
      </ThemeProvider>
    </>
  );
  /* #endregion */
}

export default App;