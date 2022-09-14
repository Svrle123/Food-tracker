import { FC } from 'react'
import { Chart } from "react-google-charts";

//TODO: implement dynamic chart, this is placholder
const PieChart: FC = () => {
    return (
        <Chart
            chartType="PieChart"
            data={[
                ["Task", "Hours per Day"],
                ["Work", 11],
                ["Eat", 2],
                ["Commute", 2],
                ["Watch TV", 2],
                ["Sleep", 7],
            ]}
            options={{
                backgroundColor: "#545F66",
                is3D: true,
                legend: 'none'
            }}
            width={"400px"}
            height={"400px"}
        />
    )
}

export default PieChart