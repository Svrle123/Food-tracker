import { FC, Fragment, } from 'react'
import { Table, FoodEntry, FoodLog, TodayLogs } from '../../core/components';

const MainLayout: FC = () => {
    return (
        <Fragment>
            <div className='food__table'>
                <Table />
                <FoodEntry />
                <FoodLog />
            </div>
            <div>
                <TodayLogs />
            </div>
        </Fragment>
    )
}

export default MainLayout;