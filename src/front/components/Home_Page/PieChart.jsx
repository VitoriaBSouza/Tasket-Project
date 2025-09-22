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
                backgroundColor: ["#f45c27", "#4f8f8f"],
                hoverBackgroundColor: ["#f45c27", "#447d7dff"],
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