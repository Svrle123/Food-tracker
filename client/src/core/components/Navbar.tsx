import { FC } from 'react';
import { Location, useLocation } from 'react-router';
import { logOut } from '../../features/user/userSlice';
import { useAppDispatch } from '../../store/hooks';
import logo from '../images/logo.png'
import Button from './Button';

const Navbar: FC = () => {
    const dispatch = useAppDispatch();
    const location: Location = useLocation()

    //dont show navbar on login screen
    if (location.pathname === '/') {
        return null;
    }

    const handleLogOut = (): void => {
        dispatch(logOut());
    }

    return (
        <header className='navbar'>
            <img className='nav__logo' src={logo} alt='Logo' width='50' height='50' />
            <ul className='nav__options'>
                <li><Button className='nav__button' onClick={() => { }} label='Home' /></li>
                <li><Button className='nav__button' onClick={() => { }} label='Summary' /></li>
                <li><Button className='nav__button' onClick={handleLogOut} label='Log out' /></li>
            </ul>
        </header>
    );
}

export default Navbar;