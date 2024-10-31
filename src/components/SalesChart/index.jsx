import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from './salesChart.module.css'

// Registrar os componentes necessários do Chart.js
Chart.register(CategoryScale, LinearScale, BarElement);

const SalesChart = () => {
  const data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
    datasets: [
      {
        label: "Troca de Produtos",
        data: [120, 300, 190, 500, 800],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={`${styles.chart}`}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesChart;
