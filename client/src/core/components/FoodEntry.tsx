import { ChangeEvent, FC, Fragment, useEffect, useState } from "react"
import { Button } from "./";
import { addEntry } from "../../features/foodEntries/foodEntriesSlice";
import { removeSelected } from "../../features/food/foodSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IFood } from "../interfaces";
import { calculateSelectedFood } from "../utils";
import { TableEntry, TableHeader } from "./table";
import { toast } from 'react-toastify';

import { Box, Paper, Table, TableContainer, TableBody, TextField } from "@mui/material";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            height: 48
        }
    })
);

const calculatedInitialState: IFood = {
    name: "",
    _id: "",
    __v: "",
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    protein: 0,
    fiber: 0
}

const FoodEntry: FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [calculated, setCalculated] = useState<IFood>(calculatedInitialState);

    const classes = useStyles();

    const selected = useAppSelector(state => state.food.selectedFood);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const recalculated = calculateSelectedFood(selected, amount);
        setCalculated(recalculated);
    }, [amount, selected])

    const handleAmountChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (isNaN(parseInt(event.currentTarget.value))) {
            event.currentTarget.value = "";
            setAmount(0);
            return;
        }
        setAmount(parseInt(event.currentTarget.value));
        event.currentTarget.value = String(parseInt(event.currentTarget.value));
    }

    const handleCancelSelect = () => {
        dispatch(removeSelected())
    }

    const handleSubmitSelected = () => {
        if (!calculated._id) {
            toast.info("Please select a food first!")
            return;
        }
        dispatch(addEntry({ ...calculated, amount }));
        dispatch(removeSelected());
        setAmount(0);
    }

    return (
        <Fragment>
            <Box sx={{ width: '100%' }}>
                <TextField
                    id="standard-basic"
                    label={selected?.name || "Select a food"}
                    variant="standard"
                    placeholder="Amount"
                    onChange={(e) => handleAmountChange(e)}
                    value={amount !== 0 ? amount : ""}
                    size="medium"
                />
                <Button
                    onClick={() => handleSubmitSelected()}
                    variant="contained"
                    label={"Add to log"}
                    className={classes.button}
                />
                <Button
                    onClick={() => handleCancelSelect()}
                    variant="outlined"
                    label={"X"}
                    className={classes.button}
                />
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer >
                        <Table
                            size={'medium'}
                        >
                            <TableHeader isSelected={true} />
                            <TableBody>
                                <TableEntry {...calculated} />
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Fragment>
    )
}

export default FoodEntry;