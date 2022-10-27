import { FC, ChangeEvent, useState } from 'react';
import { removeEntry, editEntry } from '../../../features/foodEntries/foodEntriesSlice';
import { useAppDispatch } from '../../../store/hooks';
import { IFood } from '../../interfaces';
import { Input } from '../';

const TableLogRow: FC<IFood> = (food) => {
    const [amount, setAmount] = useState(food.amount || 1)
    const dispatch = useAppDispatch()

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.currentTarget.value);
        if (isNaN(newValue) || newValue === 0) {
            setAmount(1);
            dispatch(editEntry({ _id: food._id, amount: 1 }));
            return;
        }
        setAmount(newValue);
        dispatch(editEntry({ _id: food._id, amount: newValue }));
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
            </td>
            <td onClick={() => dispatch(removeEntry(food._id))}>{"X"}</td>
        </tr>
    )
}

export default TableLogRow