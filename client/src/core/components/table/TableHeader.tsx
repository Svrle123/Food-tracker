import { FC } from 'react'
import { map } from 'lodash';

import { TableHead, TableRow, TableCell } from '@mui/material';

const defaultHeaders = {
    name: "Name",
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
        <TableHead>
            <TableRow>
                {map(isSelected ? selectedHeaders : defaultHeaders, header => (
                    <>
                        {
                            header == "Name" ?
                                <TableCell align={"left"} padding={"normal"} key={header}><strong>{`${header} (100g)`}</strong></TableCell>
                                :
                                <TableCell align={"center"} padding={"normal"} key={header}><strong>{header}</strong></TableCell>
                        }
                    </>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default TableHeader;