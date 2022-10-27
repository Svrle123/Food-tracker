import { FC, Fragment, ChangeEvent } from 'react'
import { Input } from '../'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setParams } from '../../../features/table/tableSlice'

const TableFilter: FC = () => {
    const tableParams = useAppSelector(state => state.table);
    const dispatch = useAppDispatch();

    const handleFilter = (field: string, event: ChangeEvent<HTMLInputElement>): void => {
        dispatch(setParams({ ...tableParams, [field]: event.currentTarget.value }));
    }

    return (
        <div>
            <Fragment>
                <Input
                    className='table__filter'
                    placeholder='Search'
                    onChange={(e) => handleFilter('searchQuery', e)}
                    value={tableParams.searchQuery}
                    label=''
                    type='text'
                    id='filter'
                />
            </Fragment>
        </div>
    )
}

export default TableFilter