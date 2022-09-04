import { FC } from 'react'
import { ITablePaginationProps } from '../interfaces';

const TablePagination: FC<ITablePaginationProps> = ({ currentPage, totalPages, onClick }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <tr>
            {pages.map((number, idx) => (
                <td className={currentPage === number ? 'Active' : ''} key={idx} onClick={onClick}>{number}</td>
            ))}
        </tr>
    )
}

export default TablePagination;