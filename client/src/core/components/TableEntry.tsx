import { FC } from 'react'
import { IFood } from '../interfaces'

const TableEntry: FC<IFood> = (food) => {
    return (
        <tr>
            <td>{food?.calories}</td>
            <td>{food?.carbohydrates}</td>
            <td>{food?.fat}</td>
            <td>{food?.protein}</td>
            <td>{food?.fiber}</td>
        </tr>
    )
}

export default TableEntry