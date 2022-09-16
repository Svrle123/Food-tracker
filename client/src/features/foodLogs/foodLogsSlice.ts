import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFoodLog } from '../../core/interfaces';

interface InitialState {
    todayLogs: IFoodLog[],
    weeklyLogs: IFoodLog[],
    monthlyLogs: IFoodLog[],
}

const initialState: InitialState = {
    todayLogs: [],
    weeklyLogs: [],
    monthlyLogs: [],
};

export const foodLogsSlice = createSlice({
    name: 'foodLogs',
    initialState,
    reducers: {
        setTodayLogs(state, action: PayloadAction<IFoodLog[]>) {
            return { ...state, todayLogs: action.payload };
        }
    },
})

export const { setTodayLogs } = foodLogsSlice.actions;


export default foodLogsSlice.reducer;