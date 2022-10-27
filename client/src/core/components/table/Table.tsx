import { FC, Fragment, useEffect } from 'react'
import { map } from 'lodash';
import { IFoodResponse } from '../../interfaces';
import { TableFilter, TableHeader, TableRow, TablePagination } from '.';
import { useService } from '../../contexts/ServiceProvider';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setFood } from '../../../features/food/foodSlice';

import { Box, Paper, Table as MuiTable, TableBody, TableContainer, } from '@mui/material';




const Table: FC = () => {
    const { foodRouteService } = useService();
    const table = useAppSelector(state => state.table);
    const { foodData: { data, totalPages } } = useAppSelector(state => state.food);

    const dispatch = useAppDispatch();

    debugger
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

    return (
        <Fragment>
            <TableFilter />
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer sx={{ minHeight: 587 }}>
                        <MuiTable
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <TableHeader isSelected={false} />
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
}

export default Table;