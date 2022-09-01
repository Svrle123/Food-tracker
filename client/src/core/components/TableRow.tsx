import { FC } from 'react'
import { IFoodTableRow } from '../interfaces'

const TableRow: FC<IFoodTableRow> = (props) => {
    const { name, type, calories, carbohydrates, fat, protein, fiber, onClick } = props;
    return (
        <tr onClick={onClick}>
            <td>{name}</td>
            <td>{type}</td>
            <td>{calories}</td>
            <td>{carbohydrates}</td>
            <td>{fat}</td>
            <td>{protein}</td>
            <td>{fiber}</td>
        </tr>
    )
}

export default TableRow;