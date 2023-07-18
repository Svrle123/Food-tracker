/* #region  imports */
import { FC, Fragment } from 'react'

import { TableHead, TableRow, TableCell } from '@mui/material';
/* #endregion */

/* #region  constants */
const defaultHeaders = [
    {
        value: "Name",
        weight: "(100g)"
    },
    {
        value: "Calories",
        weight: ""
    },
    {
        value: "Carbs",
        weight: "(g)"
    },
    {
        value: "Fat",
        weight: "(g)"
    },
    {
        value: "Protein",
        weight: "(g)"
    },
    {
        value: "Fiber",
        weight: "(g)"
    },
    {
        value: "Amount",
        weight: "(g)"
    },
    {
        value: "Add to log",
        weight: ""
    }]
/* #endregion */

const TableHeader: FC = () => {
    /* #region  render */
    return (
        <TableHead>
            <TableRow>
                {defaultHeaders.map((header, idx) => {
                    return (
                        <Fragment key={idx}>
                            {
                                header.value === "Name" ?
                                    <TableCell align={"left"} padding={"normal"} key={header.value}><strong>{`${header.value} ${header.weight}`}</strong></TableCell>
                                    :
                                    <TableCell align={"center"} padding={"normal"} key={header.value}><strong>{`${header.value} ${header.weight}`}</strong></TableCell>
                            }
                        </Fragment>
                    )
                })}
            </TableRow>
        </TableHead>
    )
    /* #endregion */
}

export default TableHeader;