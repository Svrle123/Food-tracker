import { FC, Fragment } from 'react'
import { map } from 'lodash';
import { IFoodResponse } from '../interfaces';
import { TableFilter, TableHeader, TableRow, TablePagination } from '.';

const Table: FC<IFoodResponse> = ({ currentPage, data, totalPages }) => {
    return (
        <Fragment>
            <TableFilter />
            <table>
                <TableHeader />
                <tbody>
                    {map(data, item => (  //TODO: check this potential fire hazard
                        <TableRow key={item.name} {...item} onClick={() => { }} />
                    ))}
                </tbody>
                <tfoot>
                    <TablePagination currentPage={currentPage} totalPages={totalPages} onClick={() => { }} />
                </tfoot>
            </table>
        </Fragment>
    )
}

export default Table;