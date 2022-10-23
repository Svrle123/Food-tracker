import { FC, Fragment, useEffect } from 'react'
import { map } from 'lodash';
import { IFoodResponse } from '../../interfaces';
import { TableFilter, TableHeader, TableRow, TablePagination } from '.';
import { useService } from '../../contexts/ServiceProvider';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setFood } from '../../../features/food/foodSlice';
import styles from './Table.module.css';

const Table: FC = () => {
    const { foodRouteService } = useService();
    const table = useAppSelector(state => state.table);
    const { foodData: { data, currentPage, totalPages } } = useAppSelector(state => state.food);

    const dispatch = useAppDispatch();

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
            <table className={styles.food__table}>
                <TableHeader isSelected={false} />
                <tbody>
                    {data.length > 0 &&
                        <Fragment>
                            {map(data, item => (
                                <TableRow key={item._id} {...item} />
                            ))}
                        </Fragment>
                    }
                </tbody>
                <tfoot className={styles.table__footer}>
                    <TablePagination currentPage={currentPage} totalPages={totalPages} />
                </tfoot>
            </table>
        </Fragment>
    )
}

export default Table;