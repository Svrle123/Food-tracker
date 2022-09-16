import { FC, Fragment, useEffect } from 'react'
import { map } from 'lodash';
import { IFoodResponse } from '../interfaces';
import { TableFilter, TableHeader, TableRow, TablePagination } from '.';
import { useService } from '../contexts/ServiceProvider';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFood, setTypes } from '../../features/food/foodSlice';

const Table: FC = () => {
    const { foodRouteService } = useService();
    const table = useAppSelector(state => state.table);
    const { foodTypes, foodData: { data, currentPage, totalPages } } = useAppSelector(state => state.food);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const response: IFoodResponse = await foodRouteService.get({ ...table });
            dispatch(setFood(response));
        }
        const initDropdown = async () => {
            const response = await foodRouteService.getTypes()
            dispatch(setTypes(response));
        }
        if (foodTypes.length === 0) {
            initDropdown();
        }
        fetchData();
    }, [
        table.searchQuery,
        table.type,
        table.page,
        table.rpp,
    ])
    return (
        <Fragment>
            {data.length > 0 &&
                <Fragment>
                    <TableFilter dropdownData={foodTypes} />
                    <table>
                        <TableHeader isSelected={false} />
                        <tbody>
                            {map(data, item => (
                                <TableRow key={item.name} {...item} />
                            ))}
                        </tbody>
                        <tfoot>
                            <TablePagination currentPage={currentPage} totalPages={totalPages} />
                        </tfoot>
                    </table>
                </Fragment>
            }
        </Fragment>
    )
}

export default Table;