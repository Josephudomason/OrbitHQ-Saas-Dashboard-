import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Bot,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const highlights = [
  {
    icon: BarChart3,
    title: "Executive analytics",
    copy: "Track MRR, expansion pipeline, churn risk, and adoption signals from one live operating system.",
  },
  {
    icon: ShieldCheck,
    title: "Role-aware workspace",
    copy: "Switch between admin and team views to model permissions, visibility, and decision-making contexts.",
  },
  {
    icon: BellRing,
    title: "Real-time signals",
    copy: "Stay on top of incidents, campaigns, account activity, and operational risk with a live signal feed.",
  },
  {
    icon: Workflow,
    title: "Automation center",
    copy: "Run recurring reports, AI summaries, anomaly alerts, and workflow jobs from the same workspace.",
  },
  {
    icon: CreditCard,
    title: "Billing visibility",
    copy: "Manage plans, collections risk, seats, and account value with a realistic SaaS billing surface.",
  },
  {
    icon: Bot,
    title: "AI-ready product story",
    copy: "Present forecasting, summaries, copilots, and system recommendations as native parts of the app.",
  },
];

export default function HomePage() {
  return (
    <main className="marketing-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={16} />
            Full SaaS Dashboard App
          </span>
          <h1>Run growth, billing, support, and execution from one SaaS workspace.</h1>
          <p>
            OrbitHQ is a polished multi-surface SaaS frontend with demo authentication,
            role-aware dashboards, analytics, billing, support queues, roadmap tracking,
            workflow automation, notifications, and theming.
          </p>
          <div className="hero-actions">
            <Link href="/login" className="btn btn-primary">
              Sign In
              <ArrowRight size={16} />
            </Link>
            <Link href="/dashboard" className="btn btn-secondary">
              Preview Workspace
            </Link>
          </div>
        </div>
        <div className="hero-preview">
          <div className="preview-card glass-card">
            <div className="preview-header">
              <span className="status-dot" />
              Live operating layer
            </div>
            <div className="preview-metrics">
              <div>
                <strong>$128.4k</strong>
                <span>MRR</span>
              </div>
              <div>
                <strong>99.96%</strong>
                <span>Uptime</span>
              </div>
              <div>
                <strong>37</strong>
                <span>Open workflows</span>
              </div>
            </div>
            <div className="preview-bars">
              <span style={{ height: "45%" }} />
              <span style={{ height: "78%" }} />
              <span style={{ height: "62%" }} />
              <span style={{ height: "92%" }} />
              <span style={{ height: "58%" }} />
              <span style={{ height: "86%" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="highlights-grid">
        {highlights.map(({ icon: Icon, title, copy }) => (
          <article key={title} className="glass-card highlight-card">
            <div className="icon-badge">
              <Icon size={18} />
            </div>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
