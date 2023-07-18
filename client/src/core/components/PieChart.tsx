import { FC, useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
import { useAppSelector } from '../../store/hooks';
import createPieData, { PieChartField } from '../utils/createPieData';

const initialState = [
    ["Food log", "Amount"],
    ["Carbohydrates", 25],
    ["Fat", 25],
    ["Protein", 25],
    ["Fiber", 25],
]

const PieChart: FC = () => {
    const [pieData, setPieData] = useState<PieChartField[]>([]);
    const entries = useAppSelector(state => state.entries);

    useEffect(() => {
        const chartData = createPieData(entries);
        setPieData(chartData);
    }, [entries])

    return (
        <Chart
            chartType="PieChart"
            data={pieData.length > 0 ? pieData : initialState}
            options={{
                backgroundColor: "#2e2e2e",
                is3D: true,
                legend: {
                    position: 'top',
                    alignment: 'start',
                    maxLines: 2,
                    textStyle: { fontSize: 15 }
                },
                colors: ['#d1ae2b', '#b38849', '#d8a35c', '#636466'],
            }}
            width={"300px"}
            height={"300px"}
        />
    )
}

export default PieChart