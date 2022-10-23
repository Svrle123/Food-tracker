import { FC } from 'react'
import { removeEntry } from '../../../features/foodEntries/foodEntriesSlice'
import { useAppDispatch } from '../../../store/hooks'
import { IFood } from '../../interfaces'

const TableLogRow: FC<IFood> = (food) => {
    const dispatch = useAppDispatch()

    return (
        <tr>
            <td>{food.name}</td>
            <td>{food.amount}</td>
            <td onClick={() => dispatch(removeEntry(food._id))}>{"X"}</td>
        </tr>
    )
}

export default TableLogRow