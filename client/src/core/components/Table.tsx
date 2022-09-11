import { FC, Fragment, MouseEvent } from 'react'
import { map } from 'lodash';
import { ITableProps } from '../interfaces';
import { TableFilter, TableHeader, TableRow, TablePagination } from '.';

const Table: FC<ITableProps> = ({ currentPage, data, totalPages, dropdownData }) => {
    return (
        <Fragment>
            <TableFilter dropdownData={dropdownData} />
            <table>
                <TableHeader isSelected={false} />
                <tbody>
                    {map(data, item => (
                        <TableRow key={item.name} {...item} />
                    ))}
                </tbody>
                <tfoot>
                    <TablePagination currentPage={currentPage} totalPages={totalPages} />
                </tfoot>
            </table>
        </Fragment>
    )
}

export default Table;