import { FC } from 'react'
import { setSelected } from '../../../features/food/foodSlice';
import { useAppDispatch } from '../../../store/hooks';
import { IFood } from '../../interfaces'

const TableRow: FC<IFood> = (props) => {
    const { name, calories, carbohydrates, fat, protein, fiber } = props;
    const dispatch = useAppDispatch();

    const handleSelect = () => {
        dispatch(setSelected(props));
    }

    return (
        <tr onMouseDown={() => handleSelect()}>
            <td>{name}</td>
            <td>{calories}</td>
            <td>{carbohydrates}</td>
            <td>{fat}</td>
            <td>{protein}</td>
            <td>{fiber}</td>
        </tr>
    )
}

export default TableRow;