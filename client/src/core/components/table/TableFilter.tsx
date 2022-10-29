import { FC, Fragment, ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setParams } from '../../../features/table/tableSlice'

import { TextField } from '@mui/material'

const TableFilter: FC = () => {
    const tableParams = useAppSelector(state => state.table);
    const dispatch = useAppDispatch();

    const handleFilter = (field: string, event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        dispatch(setParams({ ...tableParams, [field]: event.currentTarget.value }));
    }

    return (
        <Fragment>
            <TextField
                id="standard-basic"
                label={"Search here..."}
                variant="standard"
                onChange={(e) => handleFilter('searchQuery', e)}
                value={tableParams.searchQuery}
                size="medium"
            />
        </Fragment>
    )
}

export default TableFilter