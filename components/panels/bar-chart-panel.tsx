"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type BarChartPanelProps = {
  role: "admin" | "user";
};

const adminData = [
  { label: "Jan", revenue: 84, usage: 62 },
  { label: "Feb", revenue: 92, usage: 68 },
  { label: "Mar", revenue: 98, usage: 76 },
  { label: "Apr", revenue: 108, usage: 81 },
  { label: "May", revenue: 116, usage: 88 },
  { label: "Jun", revenue: 128, usage: 93 },
];

const userData = [
  { label: "Jan", revenue: 32, usage: 48 },
  { label: "Feb", revenue: 38, usage: 52 },
  { label: "Mar", revenue: 44, usage: 57 },
  { label: "Apr", revenue: 52, usage: 61 },
  { label: "May", revenue: 58, usage: 66 },
  { label: "Jun", revenue: 62, usage: 71 },
];

export function BarChartPanel({ role }: BarChartPanelProps) {
  const data = role === "admin" ? adminData : userData;

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2 className="panel-title">Analytics overview</h2>
          <p className="panel-subtitle">
            {role === "admin"
              ? "Revenue expansion and product adoption trends across the last six months."
              : "Workspace execution and engagement trends across the last six months."}
          </p>
        </div>
      </div>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="var(--line)" />
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "1px solid var(--line)",
                background: "var(--bg-strong)",
              }}
            />
            <Bar dataKey="revenue" fill="var(--brand)" radius={[12, 12, 0, 0]} />
            <Bar dataKey="usage" fill="#38bdf8" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
