import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

//css file
import '../../CSS_files/userHome.css';

Chart.register(ArcElement, Tooltip, Legend);

export const PieChart = ({completed, pending}) => {
    const data = {
        labels: ["Completed", "Pending"],
        datasets: [
            {
                data: [completed, pending],
                backgroundColor: ["#7FAEDB", "#ffc107"],
                hoverBackgroundColor: ["#6393c0ff", "rgba(196, 147, 1, 1)"],
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="piechart">
            <Pie data={data} />
        </div>
    );
};