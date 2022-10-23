import { FC } from 'react'
import { FoodEntry, FoodLog, TodayLogs } from '../../core/components';
import PieChart from '../../core/components/PieChart';
import { Table } from '../../core/components/table';
import styles from './MainLayout.module.css';

const MainLayout: FC = () => {
    return (
        <div className={styles.grid__container}>
            <div className={`${styles.leftfull}`}>
                <Table />
            </div>
            <div className={styles.righttop}>
                <div className={styles.righttop__left}>
                    <FoodEntry />
                    <PieChart />
                </div>
                <div className={styles.righttop__right} >
                    <FoodLog />
                </div>
            </div>
            <div className={styles.rightbottom}>
                <TodayLogs />
            </div>
        </div>
    )
}

export default MainLayout;