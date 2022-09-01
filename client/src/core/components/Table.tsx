import { map } from 'lodash';
import React, { FC } from 'react'
import { IFoodResponse } from '../interfaces';
import Pagination from './TablePagination';
import TableFilter from './TableFilter';
import TableHeader from './TableHeader'
import TableRow from './TableRow';

const Table: FC<IFoodResponse> = ({ currentPage, data, totalPages }) => {
    return (
        <React.Fragment>
            <TableFilter />
            <table>
                <TableHeader />
                <tbody>
                    {map(data, item => (  //check this potential fire hazard
                        <TableRow key={item.name} {...item} onClick={() => { }} />
                    ))}
                </tbody>
                <tfoot>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onClick={() => { }} />
                </tfoot>
            </table>
        </React.Fragment>
    )
}

export default Table;