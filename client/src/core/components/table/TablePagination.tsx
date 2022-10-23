import { FC } from 'react'
import { setParams } from '../../../features/table/tableSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ITablePaginationProps } from '../../interfaces';

const TablePagination: FC<ITablePaginationProps> = ({ currentPage, totalPages }) => {
    const dispatch = useAppDispatch();
    const tableParams = useAppSelector(state => state.table);

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageChange = (number: number): void => {
        dispatch(setParams({ ...tableParams, page: number }))
    }

    return (
        <tr>
            <th colSpan={7}>
                <ul>
                    {pages.map((number, idx) => (
                        <li className={currentPage === number ? 'Active' : ''} key={idx} onClick={() => handlePageChange(number)}>{number}</li>
                    ))}
                </ul>
            </th>
        </tr>
    )
}

export default TablePagination;