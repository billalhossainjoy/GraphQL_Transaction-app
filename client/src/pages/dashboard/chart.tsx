import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  cutout?: number;
  borderRadius?: number;
}

const Chart: React.FC<Props> = ({ cutout = 100, borderRadius = 30 }) => {
  const chartData: ChartData<"doughnut", number[], unknown> = {
    labels: ["Saving", "Expense", "Investment"],
    datasets: [
      {
        label: "%",
        data: [13, 8, 3],
        backgroundColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
        ],
        borderWidth: 1,
        borderRadius: borderRadius,
        spacing: 10,
      },
    ],
  };

  return <Doughnut data={chartData} options={{ cutout }} />;
};
export default Chart;
