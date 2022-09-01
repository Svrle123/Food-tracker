import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IFoodResponse, IFoodState } from '../../core/interfaces';

const initialState: IFoodState = {
    data: {
        data: [],
        currentPage: 0,
        totalPages: 0
    },
    foodTypes: [],
}
export const foodSlice = createSlice({
    name: 'foodData',
    initialState,
    reducers: {
        setFood: (state, action: PayloadAction<IFoodResponse>) => {
            return { ...state, data: { ...action.payload } };
        },
        setTypes: (state, action: PayloadAction<string[]>) => {
            return { ...state, foodTypes: [...action.payload] };
        }
    },
})

export const { setFood, setTypes } = foodSlice.actions;

export default foodSlice.reducer;