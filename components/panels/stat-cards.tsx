import { ArrowDownRight, ArrowUpRight, DollarSign, Gauge, Users, Wallet } from "lucide-react";

type StatCardsProps = {
  role: "admin" | "user";
};

export function StatCards({ role }: StatCardsProps) {
  const cards =
    role === "admin"
      ? [
          { label: "Monthly recurring revenue", value: "$128.4k", delta: "+14.8%", positive: true, icon: DollarSign },
          { label: "Net revenue retention", value: "112%", delta: "+3.2%", positive: true, icon: Wallet },
          { label: "Active customer accounts", value: "2,184", delta: "+186", positive: true, icon: Users },
          { label: "Operational risk flags", value: "4", delta: "-2 flags", positive: true, icon: Gauge },
        ]
      : [
          { label: "Plan usage", value: "74%", delta: "+8.4%", positive: false, icon: Gauge },
          { label: "Automations completed", value: "184", delta: "+23", positive: true, icon: Wallet },
          { label: "Active collaborators", value: "18", delta: "+2", positive: true, icon: Users },
          { label: "Projected monthly spend", value: "$4.8k", delta: "-6.1%", positive: true, icon: DollarSign },
        ];

  return (
    <section className="stats-grid">
      {cards.map(({ label, value, delta, positive, icon: Icon }) => (
        <article key={label} className="stat-card">
          <div className="stat-card-header">
            <span>{label}</span>
            <div className="icon-badge">
              <Icon size={18} />
            </div>
          </div>
          <h2 className="metric-value">{value}</h2>
          <p className="metric-caption">
            <span className={positive ? "positive" : "negative"}>
              {positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              {delta}
            </span>{" "}
            since last month
          </p>
        </article>
      ))}
    </section>
  );
}
