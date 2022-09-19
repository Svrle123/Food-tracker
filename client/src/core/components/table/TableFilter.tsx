import { FC, Fragment, ChangeEvent } from 'react'
import Dropdown from '../Dropdown'
import Input from '../Input'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setParams } from '../../../features/table/tableSlice'

type IDropdownProps = {
    dropdownData: string[]
}

const TableFilter: FC<IDropdownProps> = ({ dropdownData }) => {
    const tableParams = useAppSelector(state => state.table);
    const dispatch = useAppDispatch();

    const handleFilter = (field: string, event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        dispatch(setParams({ ...tableParams, [field]: event.currentTarget.value }));
    }

    return (
        <div>
            {dropdownData.length > 0 &&
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
                    <Dropdown options={dropdownData} onChange={handleFilter} />
                </Fragment>
            }
        </div>
    )
}

export default TableFilter