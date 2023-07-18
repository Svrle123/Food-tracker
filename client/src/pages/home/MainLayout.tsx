import { FC } from 'react'
import { FoodLog, TodayLogs } from 'core/components';
import { Table } from 'core/components/table';
import { Grid } from '@mui/material';
import { PieChart } from 'core/components';

const MainLayout: FC = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Table />
            </Grid>
            <Grid item xs={5}>
                <Grid container padding={2}>
                    <Grid item xs={9} md={9}>
                        <FoodLog />
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <PieChart />
                    </Grid>
                </Grid>
                <Grid container padding={2}>
                    <Grid item xs={9} md={9}>
                        <TodayLogs />
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <PieChart />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MainLayout;