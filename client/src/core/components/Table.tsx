import { map } from 'lodash';
import React, { FC } from 'react'
import { IFood } from './interfaces/IFood';
import TableFilter from './TableFilter';
import TableHeader from './TableHeader'
import TableRow from './TableRow';

const Table: FC<IFood[]> = (data: IFood[]) => {
    return (
        <React.Fragment>
            <TableFilter />
            <table>
                <TableHeader />
                <tbody>
                    {map(data, item => (
                        <TableRow key={item.name} {...item} onClick={() => { }} />
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default Table;