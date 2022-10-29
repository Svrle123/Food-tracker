import { TableCell, TableRow } from '@mui/material'
import { FC } from 'react'
import { IFood } from '../../interfaces'

const TableEntry: FC<IFood> = (food) => {
    return (
        <TableRow>
            <TableCell align="center">{food?.calories}</TableCell>
            <TableCell align="center">{food?.carbohydrates}</TableCell>
            <TableCell align="center">{food?.fat}</TableCell>
            <TableCell align="center">{food?.protein}</TableCell>
            <TableCell align="center">{food?.fiber}</TableCell>
        </TableRow>
    )
}

export default TableEntry