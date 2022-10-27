import { FC } from 'react'
import { setSelected } from '../../../features/food/foodSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { IFood } from '../../interfaces'

import { TableRow as MuiTableRow, TableCell } from '@mui/material';

const TableRow: FC<IFood> = (props) => {
    const { name, calories, carbohydrates, fat, protein, fiber, _id } = props;
    const selected = useAppSelector(state => state.food.selectedFood);
    const dispatch = useAppDispatch();

    const handleSelect = () => {
        dispatch(setSelected(props));
    }

    return (
        <MuiTableRow
            hover
            selected={selected._id === _id}
            onMouseDown={() => handleSelect()}
        >
            <TableCell align="left">{name}</TableCell>
            <TableCell align="center">{calories}</TableCell>
            <TableCell align="center">{carbohydrates}</TableCell>
            <TableCell align="center">{fat}</TableCell>
            <TableCell align="center">{protein}</TableCell>
            <TableCell align="center">{fiber}</TableCell>
        </MuiTableRow>
    )
}

export default TableRow;