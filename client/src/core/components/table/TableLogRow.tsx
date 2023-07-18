import { FC, ChangeEvent, useState, useEffect } from 'react';

import { removeEntry, editEntry } from 'features/foodEntries/foodEntriesSlice';
import { useAppDispatch } from 'store/hooks';
import { IFood } from 'core/interfaces';

import { TableCell, TableRow, Input } from "@mui/material";

const TableLogRow: FC<IFood> = (food) => {
    /* #region  state */
    const [amount, setAmount] = useState<number | undefined>(1);
    const dispatch = useAppDispatch();
    /* #endregion */

    /* #region  effects */
    useEffect(() => {
        setAmount(food.amount);
    }, [food])

    /* #endregion */
    /* #region  methods */
    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const newValue = parseInt(event.currentTarget.value);
        if (isNaN(newValue) || newValue === 0) {
            setAmount(1);
            dispatch(editEntry({ _id: food._id, amount: 1 }));
            return;
        }
        setAmount(newValue);
        dispatch(editEntry({ _id: food._id, amount: newValue }));
    }
    /* #endregion */

    /* #region  render */
    if (!food.name) {
        return (
            <TableRow style={{ height: 62 }}>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        )
    }

    return (
        <TableRow>
            <TableCell>{food.name}</TableCell>
            <TableCell align='center'>
                <Input
                    id="standard-basic"
                    onChange={(e) => handleInputChange(e)}
                    value={amount}
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
            <TableCell align='center' onClick={() => dispatch(removeEntry(food._id))}>{"X"}</TableCell>
        </TableRow>
    )
    /* #endregion */
}

export default TableLogRow