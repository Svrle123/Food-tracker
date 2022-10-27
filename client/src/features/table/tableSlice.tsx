import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IQueryParams } from '../../core/interfaces';

const initialState: IQueryParams = {
    searchQuery: '',
    type: '',
    page: 1,
    rpp: 10,
}

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setParams: (state: IQueryParams, action: PayloadAction<IQueryParams>) => {
            return { ...state, ...action.payload };
        },
    },
})

export const { setParams } = tableSlice.actions

export default tableSlice.reducer