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
    debugger
    return (
        <Chart
            chartType="PieChart"
            data={pieData.length > 0 ? pieData : initialState}
            options={{
                backgroundColor: "#A9C4C2",
                is3D: true,
                legend: 'none',
                colors: ['#545F66', '#6B7980', '#829399', '#929da1']
            }}
            width={"350x"}
            height={"350px"}
        />
    )
}

export default PieChart