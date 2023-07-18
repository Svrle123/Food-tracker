/* #region  imports */
import { FC, createElement } from 'react';
import { Location, useLocation, useNavigate } from 'react-router';

import packageInfo from '../../../package.json';
import logo from 'core/images/logo.png'
import routes from 'core/config';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { logout } from 'features/user/userSlice';

import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Toolbar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
/* #endregion */

/* #region  constants */
const APP_VERSION = packageInfo.version;
/* const OPEN_DRAWER_WIDTH = 200; */
const AVAILABLE_ROUTES = routes.map(item => item.route);
/* #endregion */

const Navbar: FC = () => {
    /* #region  state */
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location: Location = useLocation()

    //dont show navbar on login screen or on 404 screen
    if (!AVAILABLE_ROUTES.includes(location.pathname) || !user?._id) {
        return null;
    }
    /* #endregion */

    /* #region  methods */
    const handleLogOut = (): void => {
        dispatch(logout());
        navigate('/');
    }
    /* #endregion */

    /* #region  render */
    return (
        <Drawer
            sx={{
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                },
            }
            }
            anchor="left"
            variant="permanent"
        >
            <Toolbar style={{ justifyContent: "center", flexDirection: "row" }} disableGutters>
                <img src={logo} alt='Logo' style={{ width: "5vh", height: "5vh" }} />
            </Toolbar>
            <Divider />
            <List>
                {routes.map(item => (
                    <ListItem key={item.title} disablePadding>
                        <ListItemButton onClick={() => navigate(item.route)} >
                            <ListItemIcon>
                                {createElement(item.icon)}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <ListItem style={{
                position: "fixed",
                bottom: 10,
                textAlign: "center",
                paddingBottom: 10,
                width: "inherit"
            }} disablePadding>
                <ListItemButton onClick={() => handleLogOut()} >
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Sign out"} />
                </ListItemButton>
            </ListItem>
            <ListItem style={{
                position: "fixed",
                bottom: -12,
                textAlign: "center",
                paddingBottom: 10,
                width: "inherit"
            }} disablePadding>
                <ListItemText secondary={'v' + APP_VERSION} />
            </ListItem>
        </Drawer >
    );
    /* #endregion */
}

export default Navbar;