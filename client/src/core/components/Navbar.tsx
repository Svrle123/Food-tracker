import packageInfo from '../../../package.json';
import { FC } from 'react';
import { Location, useLocation, useNavigate } from 'react-router';
import { logout } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import logo from '../images/logo.png'
import Button from './Button';
import styles from './Navbar.module.css';

const appVersion = packageInfo.version;

const availableRoutes = ['/home', '/summary']

const Navbar: FC = () => {
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location: Location = useLocation()

    //dont show navbar on login screen or on 404 screen
    if (!availableRoutes.includes(location.pathname) || !user?._id) {
        return null;
    }

    const handleLogOut = (): void => {
        dispatch(logout());
        navigate('/');
    }

    return (
        <header className={styles.navbar}>
            <div className={styles.nav__logo}>
                <img src={logo} alt='Logo' />
                <figcaption className='app__version'>{'v' + appVersion}</figcaption>
            </div>
            <ul className={styles.nav__options}>
                <li><a className={styles.nav__button} onClick={() => navigate('/home')}>{"Home"}</a></li>
                <li><a className={styles.nav__button} onClick={() => navigate('/summary')}>{"Summary"}</a></li>
                <li><a className={styles.nav__button} onClick={() => handleLogOut()}>{"Sign out"} </a></li>
            </ul>
        </header>
    );
}

export default Navbar;