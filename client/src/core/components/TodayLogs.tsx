/* #region  imports */
import { FC, Fragment, useEffect } from 'react';

import { upperFirst } from 'lodash';
import moment from 'moment';

import { setTodayLogs } from 'features/foodLogs/foodLogsSlice';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useService } from 'core/contexts/ServiceProvider';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

/* #endregion */

/* #region  constants */
const TABLE_ROWS: string[] = [
    "carbohydrates",
    "fat",
    "protein",
    "fiber",
    "calories",
]
/* #endregion */

const TodayLogs: FC = () => {
    /* #region  state */
    const { foodLogRouteService } = useService();
    const user = useAppSelector(state => state.user);
    const todayLogs = useAppSelector(state => state.foodLogs.todayLogs);
    const dispatch = useAppDispatch()
    /* #endregion */

    /* #region  effects */
    useEffect(() => {
        const fetchLogs = async () => {
            const logs = await foodLogRouteService.getTodayLogs(user._id);
            dispatch(setTodayLogs(logs))
        }
        fetchLogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    /* #endregion */

    /* #region  render */
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer sx={{
                    maxWidth: 560,
                    overflowX: "auto",
                    "&::-webkit-scrollbar": {
                        width: 10
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#90caf9"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#121212",
                    }
                }}>
                    <Table stickyHeader>
                        {todayLogs.length > 0 &&
                            <Fragment>
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={6} style={{ position: "sticky", left: 0, textAlign: "center" }}>{"Today"}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='left' style={{ position: "sticky", left: 0, backgroundColor: "#1e1e1e" }}>{"Time of day"}</TableCell>
                                        {todayLogs.map((log) => (
                                            <TableCell align='center' key={log._id}>{moment(log.timeStamp).format('HH:mm:ss')}</TableCell>
                                        ))}
                                    </TableRow>
                                    {TABLE_ROWS.map((row, idx) => (
                                        <TableRow key={row}>
                                            <TableCell align='left' style={{ position: "sticky", left: 0, backgroundColor: "#1e1e1e" }} key={idx + row}>{upperFirst(row)}</TableCell>
                                            {todayLogs.map((log) => (
                                                <TableCell align='center' key={log._id + row}>
                                                    {(log.total && log.total[row].toFixed(2)) || 0}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Fragment>
                        }
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
    /* #endregion */
}

export default TodayLogs