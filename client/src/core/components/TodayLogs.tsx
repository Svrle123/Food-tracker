import { FC, Fragment, useEffect } from 'react';
import { setTodayLogs } from '../../features/foodLogs/foodLogsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useService } from '../contexts/ServiceProvider';
import moment from 'moment';

const TABLE_ROWS: string[] = [
    "carbohydrates",
    "fat",
    "protein",
    "fiber",
    "calories",
]

const TodayLogs: FC = () => {
    const { foodLogRouteService } = useService();
    const user = useAppSelector(state => state.user);
    const todayLogs = useAppSelector(state => state.foodLogs.todayLogs);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchLogs = async () => {
            const logs = await foodLogRouteService.getTodayLogs(user._id);
            dispatch(setTodayLogs(logs))
        }
        fetchLogs();
    }, [])
    // TODO: Format entries array on Backend to be single object with all entires calculated
    return (
        <Fragment>
            <table>
                {todayLogs.length > 0 &&
                    <Fragment>
                        <thead>
                            <tr>
                                <td>{"Today"}</td>
                            </tr>
                            <tr>
                                {todayLogs.map((log) => (
                                    <td key={log._id}>{moment(log.timeStamp).format('hh:mm:ss a')}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.map((row) => (
                                <tr>
                                    {todayLogs.map((log) => (
                                        <td></td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Fragment>
                }
            </table>
        </Fragment>
    )
}

export default TodayLogs