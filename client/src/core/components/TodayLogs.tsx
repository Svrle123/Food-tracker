import { FC, Fragment, useEffect } from 'react';
import { upperFirst } from 'lodash';
import { setTodayLogs } from '../../features/foodLogs/foodLogsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useService } from '../contexts/ServiceProvider';
import moment from 'moment';
import styles from './TodayLog.module.css'

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <table className={styles.today__table}>
            {todayLogs.length > 0 &&
                <Fragment>
                    <thead className={styles.today__header}>
                        <tr>
                            <td></td>
                            <th colSpan={5}>{"Today"}</th>
                        </tr>
                        <tr>
                            <td></td>
                            {todayLogs.map((log) => (
                                <th key={log._id}>{moment(log.timeStamp).format('hh:mm:ss a')}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_ROWS.map((row, idx) => (
                            <tr key={row}>
                                <td key={idx + row}>{upperFirst(row)}</td>
                                {todayLogs.map((log) => (
                                    <td key={log._id + row}>
                                        {(log?.total && log.total[row]) || 0}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Fragment>
            }
        </table>
    )
}

export default TodayLogs