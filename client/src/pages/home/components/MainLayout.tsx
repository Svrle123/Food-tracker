import React, { FC, useContext, useEffect } from 'react'
import Table from '../../../core/components/Table';
import { IFoodResponse } from '../../../core/interfaces';
import { ServiceContext } from '../../../core/contexts/ServiceProvider';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { setFood } from '../../../features/food/foodSlice';

const MainLayout: FC = () => {
    const { foodRouteService } = useContext(ServiceContext)
    const tableData = useAppSelector(state => state.food.data);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const initData = async () => {
            const response: IFoodResponse = await foodRouteService.get({ page: 1, rpp: 2 });
            dispatch(setFood(response));
        }
        initData();
    }, [])

    return (
        <Table {...tableData} />
    )
}

export default MainLayout;