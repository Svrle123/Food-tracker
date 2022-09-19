import { FC, Fragment } from 'react'
import { clearLog } from '../../features/foodEntries/foodEntriesSlice';
import { setTodayLogs } from '../../features/foodLogs/foodLogsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useService } from '../contexts/ServiceProvider';
import { TableLogRow } from './table';

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
        <Fragment>
            <table>
                <thead>
                    <tr>
                        <td>{"Current food log"}</td>
                        <td colSpan={2} onClick={() => dispatch(clearLog())}>{"Clear"}</td>
                    </tr>
                </thead>
                <tbody>
                    {entries.length > 0 && (
                        <Fragment>
                            {entries.map((entry, idx) => (
                                <TableLogRow key={idx} {...entry} />
                            ))}
                        </Fragment>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td>{"Calories total:"}</td>
                        <td colSpan={2}>{getTotalCalories()}</td>
                    </tr>
                    <tr>
                        <td colSpan={3} onClick={() => submitLog()}>
                            {"SUBMIT LOG"}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </Fragment>
    )
}

export default FoodLog