import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import foodReducer from '../features/food/foodSlice';
import errorReducer from '../features/error/errorSlice';
import tableReducer from '../features/table/tableSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        food: foodReducer,
        error: errorReducer,
        table: tableReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch