import { configureStore, combineReducers, PayloadAction } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import foodReducer from '../features/food/foodSlice';
import tableReducer from '../features/table/tableSlice';
import entriesReducer from '../features/foodEntries/foodEntriesSlice';
import foodLogsReducer from '../features/foodLogs/foodLogsSlice';

const combinedReducer = combineReducers({
    user: userReducer,
    food: foodReducer,
    table: tableReducer,
    entries: entriesReducer,
    foodLogs: foodLogsReducer,
});

/**
 * State reset on logout
 */
const rootReducer = (state: any, action: PayloadAction) => {
    if (action.type === 'user/logout') {
        state = undefined;
    }
    return combinedReducer(state, action);
};


export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch