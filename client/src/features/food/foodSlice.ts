import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IFood, IFoodResponse, IFoodState } from '../../core/interfaces';

const selectedFood: IFood = {
    name: "",
    type: "",
    _id: "",
    __v: "",
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    protein: 0,
    fiber: 0
}

const initialState: IFoodState = {
    data: {
        data: [],
        currentPage: 0,
        totalPages: 0
    },
    foodTypes: [],
    selectedFood
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
        },
        setSelected: (state, action: PayloadAction<IFood>) => {
            return { ...state, selectedFood: action.payload };
        },
        removeSelected: (state) => {
            return { ...state, selectedFood };
        }
    },
})

export const { setFood, setTypes, setSelected, removeSelected } = foodSlice.actions;

export default foodSlice.reducer;