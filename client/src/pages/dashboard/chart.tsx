import { GET_TRANSCTION_STATISTICS } from "@/graphql/transaction/transaction.queries";
import { useQuery } from "@apollo/client";
import {
  ArcElement,
  ChartData,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  cutout?: number;
  borderRadius?: number;
}

const Chart: React.FC<Props> = ({ cutout = 100, borderRadius = 30 }) => {
  const initialChartData: ChartData<"doughnut", number[], unknown> = {
    labels: ["Saving", "Expense", "Investment"],
    datasets: [
      {
        label: "%",
        data: [10, 0, 0],
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

  const [chart, setChart] = useState(initialChartData);
  const { data } = useQuery(GET_TRANSCTION_STATISTICS);

  useEffect(() => {
    if (data?.categoryStatistics) {
      const categores = data.categoryStatistics.map(
        (state: CategoryStatistics) => state.category
      );
      const totalAmmounts = data.categoryStatistics.map(
        (state: CategoryStatistics) => state.totalAmount
      );
      setChart((prev) => ({
        labels: categores,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmmounts,
          },
        ],
      }));
    }
  }, [data]);

  return <Doughnut data={chart} options={{ cutout }} />;
};
export default Chart;
