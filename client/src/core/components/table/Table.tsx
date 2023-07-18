/* #region  imports */
import { FC, Fragment, useEffect } from 'react'
import { map } from 'lodash';
import { IFoodResponse } from 'core/interfaces';
import { TableFilter, TableHeader, TableRow, TablePagination } from '.';
import { useService } from 'core/contexts/ServiceProvider';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setFood } from 'features/food/foodSlice';

import { Box, Paper, Table as MuiTable, TableBody, TableContainer, } from '@mui/material';
/* #endregion */

/* #region  constants */
const MIN_TABLE_HEIGHT = 837;
const MIN_TABLE_WIDTH = 750;
/* #endregion */

const Table: FC = () => {
    /* #region  state */
    const { foodRouteService } = useService();

    const { table, food: { foodData: { data, totalPages } } } = useAppSelector(state => state);
    const dispatch = useAppDispatch();
    /* #endregion */

    /* #region  effect */
    useEffect(() => {
        const fetchData = async () => {
            const response: IFoodResponse = await foodRouteService.get({ ...table });
            dispatch(setFood(response));
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        table.searchQuery,
        table.type,
        table.page,
        table.rpp,
    ])
    /* #endregion */

    /* #region  render */
    return (
        <Fragment>
            <TableFilter />
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer sx={{ minHeight: MIN_TABLE_HEIGHT }}>
                        <MuiTable
                            sx={{ minWidth: MIN_TABLE_WIDTH }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <TableHeader />
                            <TableBody>
                                {data.length > 0 &&
                                    <Fragment>
                                        {map(data, item => (
                                            <TableRow key={item._id} {...item} />
                                        ))}
                                    </Fragment>
                                }
                            </TableBody>
                        </MuiTable>
                    </TableContainer>
                    <TablePagination totalPages={totalPages} />
                </Paper>
            </Box>
        </Fragment>
    )
    /* #endregion */
}

export default Table;