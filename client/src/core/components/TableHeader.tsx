import { FC } from 'react'
import { map } from 'lodash';

const defaultHeaders = {
    name: "Name",
    type: "Type",
    calories: "Calories",
    carbohydrates: "arbohydrates",
    fat: "Fat",
    protein: "Protein",
    fiber: "Fiber",
}

const TableHeader: FC = () => {
    return (
        <thead>
            <tr>
                {map(defaultHeaders, header => (
                    <td key={header}>{header}</td>
                ))}
            </tr>
        </thead>
    )
}

export default TableHeader;