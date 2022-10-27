import { FC } from 'react'
import { setParams } from '../../../features/table/tableSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ITablePaginationProps } from '../../interfaces';

import { Pagination, PaginationItem } from '@mui/material';


const TablePagination: FC<ITablePaginationProps> = ({ totalPages }) => {
    const dispatch = useAppDispatch();
    const tableParams = useAppSelector(state => state.table);

    const handlePageChange = (event: unknown, newPage: number): void => {
        dispatch(setParams({ ...tableParams, page: newPage }))
    }

    return (
        <Pagination
            count={totalPages}
            sx={{ display: 'flex', justifyContent: 'center' }}
            onChange={handlePageChange}
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                />
            )}
        />
    )
}

export default TablePagination;