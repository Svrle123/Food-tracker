import { FC, Fragment, useEffect } from 'react'
import { Table, FoodEntry, FoodLog } from '../../core/components';
import { IFoodResponse } from '../../core/interfaces';
import { useService } from '../../core/contexts/ServiceProvider';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setFood, setTypes } from '../../features/food/foodSlice';

const MainLayout: FC = () => {
    const { foodRouteService } = useService();
    const { food: { data, foodTypes, selectedFood }, table } = useAppSelector(state => state);
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
        if (foodTypes.length == 0) {
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
            <div className='food__table'>
                <Table {...data} dropdownData={foodTypes} />
                <FoodEntry />
                <FoodLog />
            </div>
        </Fragment>
    )
}

export default MainLayout;