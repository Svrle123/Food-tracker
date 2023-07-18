/* #region  imports */
import { FC } from 'react'

import { clearLog } from 'features/foodEntries/foodEntriesSlice';
import { setTodayLogs } from 'features/foodLogs/foodLogsSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks'
import { useService } from 'core/contexts/ServiceProvider';
import { TableLogRow } from 'core/components/table';
import { Button } from 'core/components';

import { Box, Paper, Table, TableContainer, TableBody, TableHead, TableRow, TableCell } from "@mui/material";
import { IFood } from 'core/interfaces';

import { toast } from 'react-toastify';
/* #endregion */

/* #region  constants */
const EMPTY_ITEM: IFood = {
    name: '',
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    protein: 0,
    fiber: 0,
    _id: '',
    __v: ''
}
/* #endregion */

const FoodLog: FC = () => {
    /* #region  state */
    const { foodLogRouteService } = useService()
    const { user, entries } = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    const renderEntries = [...entries];

    if (renderEntries.length < 5) {
        while (renderEntries.length < 5) {
            renderEntries.push(EMPTY_ITEM);
        }
    }
    /* #endregion */

    /* #region  methods */
    const getTotalCalories = () => {
        let totalCalories = 0;
        entries.forEach(entry => {
            totalCalories += entry.calories;
        })
        return totalCalories.toFixed(2);
    }

    const submitLog = async () => {
        if (entries.length < 1) {
            toast.warning("Food log cannot be empty!")
            return;
        }

        const payloadEntries = entries.map((entry) => ({ food: entry._id, amount: entry.amount }));
        const payload = {
            entries: payloadEntries,
            userId: user._id,
        }

        await foodLogRouteService.post(payload);
        const logs = await foodLogRouteService.getTodayLogs(user._id);

        dispatch(setTodayLogs(logs));
        dispatch(clearLog());
    }
    /* #endregion */

    /* #region  render */
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer sx={{
                    height: 420,
                    minHeight: 420,
                    "&::-webkit-scrollbar": {
                        width: 10
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#90caf9"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#121212",
                    }
                }} >
                    <Table
                        stickyHeader
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align='left'>{"Current food log"}</TableCell>
                                <TableCell align='center'>{"Amount"}</TableCell>
                                <TableCell align='center' onClick={() => dispatch(clearLog())}>
                                    {"Clear"}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderEntries.map((entry, idx) => (
                                <TableLogRow key={idx} {...entry} />
                            ))}
                            <TableRow style={{ position: "sticky", bottom: 0, backgroundColor: "#121212" }}>
                                <TableCell colSpan={2} align='left' >{"Total calories"}</TableCell>
                                <TableCell align='center' sx={{ maxWidth: 20 }}>{getTotalCalories()}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    sx={{
                        width: '100%',
                        borderRadius: 0,
                        fontSize: 15
                    }}
                    onClick={() => submitLog()}
                    label={'SUBMIT LOG'}
                    variant="contained"
                />
            </Paper>
        </Box >
    )
    /* #endregion */
}

export default FoodLog