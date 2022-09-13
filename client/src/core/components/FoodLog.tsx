import { FC, Fragment } from 'react'
import { clearLog } from '../../features/entries/entriesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useService } from '../contexts/ServiceProvider';
import { TableLogRow } from './';

const FoodLog: FC = () => {
    const { foodLogRouteService } = useService()
    const { entries, user } = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    const getTotalCalories = () => {
        let totalCalories = 0;
        entries.forEach(entry => {
            totalCalories += entry.calories;
        })
        return totalCalories.toFixed(2);
    }

    const submitLog = async () => {
        const payloadEntries = entries.map((entry) => ({ foodId: entry._id, amount: entry.amount }));
        const payload = {
            entries: payloadEntries,
            userId: user._id,
        }

        await foodLogRouteService.post(payload);
        dispatch(clearLog())
    }

    return (
        <Fragment>
            {entries.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <td>{"Current food log"}</td>
                            <td onClick={() => dispatch(clearLog())}>{"Clear"}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry, idx) => (
                            <TableLogRow key={idx} {...entry} />
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>{"Calories total:"}</td>
                            <td>{getTotalCalories()}</td>
                        </tr>
                        <tr>
                            <td onClick={() => submitLog()}>
                                {"SUBMIT LOG"}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            }
        </Fragment>
    )
}

export default FoodLog