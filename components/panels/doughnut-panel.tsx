"use client";

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutPanelProps = {
  role: "admin" | "user";
};

export function DoughnutPanel({ role }: DoughnutPanelProps) {
  const data = {
    labels:
      role === "admin"
        ? ["Enterprise", "Growth", "Starter"]
        : ["Automation", "Analytics", "Storage"],
    datasets: [
      {
        data: role === "admin" ? [44, 33, 23] : [48, 29, 23],
        backgroundColor: ["#14b8a6", "#38bdf8", "#f59e0b"],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
    },
    cutout: "72%",
  };

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">{role === "admin" ? "Revenue mix" : "Feature usage"}</h2>
          <p className="panel-subtitle">
            {role === "admin"
              ? "How booked revenue is distributed across current plan tiers."
              : "How your workspace is consuming the core product suite."}
          </p>
        </div>
      </div>

      <div className="chart-wrap">
        <Doughnut data={data} options={options} />
      </div>
    </section>
  );
}
