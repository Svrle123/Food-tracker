import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IFood } from '../../core/interfaces';
import { findIndex } from 'lodash';
import { calculateSelectedFood } from '../../core/utils';

const initialState: IFood[] = [];

export const foodEntriesSlice = createSlice({
    name: 'foodEntries',
    initialState,
    reducers: {
        addEntry: (state, action: PayloadAction<IFood>) => {
            state.push(action.payload);
        },
        removeEntry: (state, action: PayloadAction<string>) => {
            const index = findIndex(state, (entry) => entry._id === action.payload);
            state.splice(index, 1);
        },
        editEntry: (state, action: PayloadAction<{ amount: number, _id: string }>) => {
            const index = findIndex(state, (entry) => entry._id === action.payload._id);
            const reCalculatedFood = calculateSelectedFood(state[index], action.payload.amount);
            state.splice(index, 1, { ...reCalculatedFood });
        },
        clearLog: (state) => {
            state.splice(0, state.length);
        }
    },
})

export const { addEntry, removeEntry, editEntry, clearLog } = foodEntriesSlice.actions;


export default foodEntriesSlice.reducer;