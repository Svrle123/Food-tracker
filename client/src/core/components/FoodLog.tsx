import { FC, Fragment } from 'react'
import { toast } from 'react-toastify';
import { clearLog } from '../../features/foodEntries/foodEntriesSlice';
import { setTodayLogs } from '../../features/foodLogs/foodLogsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useService } from '../contexts/ServiceProvider';
import { TableLogRow } from './table';
import { Button } from '.';

import { Box, Paper, Table, TableContainer, TableBody, TableHead, TableRow, TableCell, TableFooter, TablePagination } from "@mui/material";

const FoodLog: FC = () => {
    const { foodLogRouteService } = useService()
    const user = useAppSelector(state => state.user);
    const entries = useAppSelector(state => state.entries);
    const dispatch = useAppDispatch();

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

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer sx={{ height: 400 }} >
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
                            {entries.length > 0 && (
                                <Fragment>
                                    {entries.map((entry, idx) => (
                                        <TableLogRow key={idx} {...entry} />
                                    ))}
                                </Fragment>
                            )}
                        </TableBody>
                        <TableRow>
                            <TableCell align='left' >{"Calories total"}</TableCell>
                            <TableCell align='right'>{getTotalCalories()}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
                <Button
                    sx={{
                        width: '100%'
                    }}
                    onClick={() => submitLog()}
                    label={'SUBMIT LOG'}
                />
            </Paper>
        </Box >
    )
}

export default FoodLog