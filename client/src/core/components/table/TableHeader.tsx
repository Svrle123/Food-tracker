import { FC } from 'react'
import { map } from 'lodash';

import { TableHead, TableRow, TableCell } from '@mui/material';

const defaultHeaders = {
    name: {
        value: "Name",
        weight: "(100g)"
    },
    calories: {
        value: "Calories",
        weight: ""
    },
    carbohydrates: {
        value: "Carbs",
        weight: "(g)"
    },
    fat: {
        value: "Fat",
        weight: "(g)"
    },
    protein: {
        value: "Protein",
        weight: "(g)"
    },
    fiber: {
        value: "Fiber",
        weight: "(g)"
    },
}

const selectedHeaders = {
    calories: {
        value: "Calories",
        weight: ""
    },
    carbohydrates: {
        value: "Carbs",
        weight: "(g)"
    },
    fat: {
        value: "Fat",
        weight: "(g)"
    },
    protein: {
        value: "Protein",
        weight: "(g)"
    },
    fiber: {
        value: "Fiber",
        weight: "(g)"
    },
}

const TableHeader: FC<{ isSelected: boolean }> = ({ isSelected }) => {
    return (
        <TableHead>
            <TableRow>
                {map(isSelected ? selectedHeaders : defaultHeaders, header => (
                    <>
                        {
                            header.value === "Name" ?
                                <TableCell align={"left"} padding={"normal"} key={header.value}><strong>{`${header.value} ${header.weight}`}</strong></TableCell>
                                :
                                <TableCell align={"center"} padding={"normal"} key={header.value}><strong>{`${header.value} ${header.weight}`}</strong></TableCell>
                        }
                    </>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default TableHeader;