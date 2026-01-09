import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function SpendingChart({ transactions }) {
  const data = {
    labels: transactions.map(t =>
      new Date(t.datetime).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Transactions',
        data: transactions.map(t => t.price),
        backgroundColor: transactions.map(t =>
          t.price < 0 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 0.6)'
        ),
      },
    ],
  };

  return <Bar data={data} />;
}

