import { FC, Fragment, useEffect } from 'react'
import { Table } from '../../core/components';
import { IFoodResponse } from '../../core/interfaces';
import { useService } from '../../core/contexts/ServiceProvider';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setFood } from '../../features/food/foodSlice';

const MainLayout: FC = () => {
    const { foodRouteService } = useService();
    const tableData = useAppSelector(state => state.food.data);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const initData = async () => {
            const response: IFoodResponse = await foodRouteService.get({ page: 1, rpp: 20 });
            dispatch(setFood(response));
        }
        initData();
    }, [])

    return (
        <Fragment>
            <div className='food__table'>
                <Table {...tableData} />
            </div>
        </Fragment>
    )
}

export default MainLayout;