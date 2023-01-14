import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
export const SongChart = ({ features }) => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
  const options = {
    responsive: true,
    maintainAspectRatio:false,
    scales: {
      x: {
        grid: {
          color: "rgba(255,255,255,0.3)",
        },
      },
      y: {
        grid: {
          color: "rgba(255,255,255,0.3)",
        },
      },
    },
  };

  const labels = [
    "acousticness",
    "danceability",
    "energy",
    "liveness",
    "speechiness",
    "valence",
  ];
  const { acousticness, danceability, energy, liveness, speechiness, valence } =
    features;
  console.log(features);
  const chartData = [
    acousticness,
    danceability,
    energy,
    liveness,
    speechiness,
    valence,
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.3)",
          "rgba(54, 162, 235, 0.3)",
          "rgba(255, 206, 86, 0.3)",
          "rgba(75, 192, 192, 0.3)",
          "rgba(153, 102, 255, 0.3)",
          "rgba(255, 159, 64, 0.3)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="w-full  md:w-[650px] md:h-[550px]">
      <Bar options={options} data={data} />
    </div>
  );
};
