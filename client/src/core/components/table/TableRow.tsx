/* #region  imports */
import { ChangeEvent, FC, useEffect, useState } from 'react'

import { removeSelected, setSelected } from 'features/food/foodSlice';
import { addEntry } from 'features/foodEntries/foodEntriesSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { calculateSelectedFood } from 'core/utils';
import { Button } from 'core/components';
import { IFood } from 'core/interfaces'

import { TableRow as MuiTableRow, TableCell, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { toast } from 'react-toastify';
/* #endregion */


const TableRow: FC<IFood> = (props) => {
    /* #region state  */
    const [calculated, setCalculated] = useState<IFood>({ ...props });
    const [amount, setAmount] = useState<number>(0);

    const selected = useAppSelector(state => state.food.selectedFood);
    const dispatch = useAppDispatch();

    const { name, calories, carbohydrates, fat, protein, fiber, _id } = calculated;
    /* #endregion */

    /* #region  effect */
    useEffect(() => {
        if (selected._id) setCalculated(calculateSelectedFood(selected, amount));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount])
    /* #endregion */

    /* #region  methods */
    const handleSelect = () => {
        dispatch(setSelected(props));
    }

    const handleAmountChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (isNaN(parseInt(event.currentTarget.value))) {
            event.currentTarget.value = "";
            setAmount(0);
            return;
        }
        setAmount(parseInt(event.currentTarget.value));
        event.currentTarget.value = String(parseInt(event.currentTarget.value));
    }

    const handleSubmitSelected = () => {
        if (!amount) return toast.warning("Amount can't be 0!")

        dispatch(addEntry({ ...calculated, amount }));
        dispatch(removeSelected());
        setCalculated({ ...props });
        setAmount(0);
    }
    /* #endregion */

    /* #region  render */
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
            <TableCell align="center">
                <Input
                    id="standard-basic"
                    onChange={(e) => handleAmountChange(e)}
                    value={amount !== 0 ? amount : ""}
                    autoComplete='off'
                    size='small'
                    sx={{
                        width: 60
                    }}
                    inputProps={{
                        sx: {
                            height: "fit-content",
                            textAlign: "center"
                        },
                        maxLength: 6
                    }}
                />
            </TableCell>
            <TableCell align="center">
                <Button
                    onClick={() => handleSubmitSelected()}
                    variant="contained"
                    label={<AddIcon />}
                />
            </TableCell>
        </MuiTableRow>
    )
    /* #endregion */
}

export default TableRow;