import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../core/interfaces';

const initialState: IUser = {
    userName: '',
    password: '',
    isAdmin: false,
    email: '',
    name: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logIn: (state: IUser, action: PayloadAction<IUser>) => {
            return { ...state, ...action.payload };
        },
        logOut: () => {
            return { ...initialState };
        },
    },
})

export const { logIn, logOut } = userSlice.actions

export default userSlice.reducer