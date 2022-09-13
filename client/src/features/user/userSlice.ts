import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../core/interfaces';

const initialState: IUser = {
    userName: '',
    password: '',
    isAdmin: false,
    email: '',
    name: '',
    _id: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state: IUser, action: PayloadAction<IUser>) => {
            window.sessionStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, ...action.payload };
        },
        logout: () => {
            window.sessionStorage.removeItem('user');
            return { ...initialState };
        },
    },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer