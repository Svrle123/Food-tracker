import { FC } from 'react'
import { map } from 'lodash';

const defaultHeaders = {
    name: "Name",
    type: "Type",
    calories: "Calories",
    carbohydrates: "Carbohydrates",
    fat: "Fat",
    protein: "Protein",
    fiber: "Fiber",
}

const selectedHeaders = {
    calories: "Calories",
    carbohydrates: "Carbohydrates",
    fat: "Fat",
    protein: "Protein",
    fiber: "Fiber",
}

const TableHeader: FC<{ isSelected: boolean }> = ({ isSelected }) => {
    return (
        <thead>
            <tr>
                {map(isSelected ? selectedHeaders : defaultHeaders, header => (
                    <td key={header}>{header}</td>
                ))}
            </tr>
        </thead>
    )
}

export default TableHeader;