import { createSlice, Dispatch } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { INotificationProps } from '../../core/interfaces';

const initialState: INotificationProps = {
    type: '',
    message: '',
    timeStamp: '',
}

export const clearAndSetError = (params: INotificationProps) => async (dispatch: Dispatch) => {
    dispatch(clearError());
    setTimeout(() => {
        dispatch(setError(params))
    }, 0); //Finish clear before setting new state to reset Notification component
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<INotificationProps>) => {
            return { ...state, ...action.payload };
        },
        clearError: (state) => {
            return { ...state, ...initialState };
        }
    },
})

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer; 