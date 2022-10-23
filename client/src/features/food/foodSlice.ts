import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IFood, IFoodResponse, IFoodState } from '../../core/interfaces';

const selectedFood: IFood = {
    name: "",
    _id: "",
    __v: "",
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    protein: 0,
    fiber: 0
}

const initialState: IFoodState = {
    foodData: {
        data: [],
        currentPage: 0,
        totalPages: 0
    },
    selectedFood
}
export const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
        setFood: (state, action: PayloadAction<IFoodResponse>) => {
            return { ...state, foodData: { ...action.payload } };
        },
        setSelected: (state, action: PayloadAction<IFood>) => {
            return { ...state, selectedFood: action.payload };
        },
        removeSelected: (state) => {
            return { ...state, selectedFood };
        }
    },
})

export const { setFood, setSelected, removeSelected } = foodSlice.actions;

export default foodSlice.reducer;