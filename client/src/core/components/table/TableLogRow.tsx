import { FC, ChangeEvent, useState } from 'react';
import { removeEntry, editEntry } from '../../../features/foodEntries/foodEntriesSlice';
import { useAppDispatch } from '../../../store/hooks';
import { IFood } from '../../interfaces';
import { Button, Input } from '../';

const TableLogRow: FC<IFood> = (food) => {
    const [amount, setAmount] = useState(food.amount || 0)
    const dispatch = useAppDispatch()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (isNaN(parseInt(event.currentTarget.value))) {
            setAmount(0);
            return;
        }
        setAmount(parseInt(event.currentTarget.value));
    }

    return (
        <tr>
            <td>{food.name}</td>
            <td>
                <Input
                    className={''}
                    onChange={(e) => handleInputChange(e)}
                    value={amount}
                    type={"text"}
                    id={'amount'}
                />
                <Button
                    className={''}
                    label={'X'}
                    onClick={() => { dispatch(editEntry({ _id: food._id, amount })) }}
                />
            </td>
            <td onClick={() => dispatch(removeEntry(food._id))}>{"X"}</td>
        </tr>
    )
}

export default TableLogRow