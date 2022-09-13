import packageInfo from '../../../package.json';
import { FC } from 'react';
import { Location, useLocation, useNavigate } from 'react-router';
import { logout } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import logo from '../images/logo.png'
import Button from './Button';

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
        <header className='navbar'>
            <div className='nav__logo'>
                <img src={logo} alt='Logo' width='50' height='50' />
                <figcaption className='app__version'>{'v' + appVersion}</figcaption>
            </div>
            <ul className='nav__options'>
                <li><Button className='nav__button' onClick={() => navigate('/home')} label='Home' /></li>
                <li><Button className='nav__button' onClick={() => navigate('/summary')} label='Summary' /></li>
                <li><Button className='nav__button' onClick={handleLogOut} label='Sign out' /></li>
            </ul>
        </header>
    );
}

export default Navbar;