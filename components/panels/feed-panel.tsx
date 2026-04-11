import { AlertTriangle, BellRing, CheckCircle2, Rocket } from "lucide-react";

type FeedPanelProps = {
  role: "admin" | "user";
};

export function FeedPanel({ role }: FeedPanelProps) {
  const notifications =
    role === "admin"
      ? [
          {
            title: "Usage spike detected",
            detail: "API traffic increased 18% in the last hour across enterprise accounts.",
            badge: "Live",
            icon: BellRing,
          },
          {
            title: "Quarterly expansion closed",
            detail: "Northstar Commerce upgraded to the Scale plan for 140 seats.",
            badge: "Revenue",
            icon: Rocket,
          },
          {
            title: "Billing review needed",
            detail: "Two invoices slipped into past due and need finance follow-up.",
            badge: "Action",
            icon: AlertTriangle,
          },
        ]
      : [
          {
            title: "Automation completed",
            detail: "Your weekly usage report has been generated and shared with the team.",
            badge: "Complete",
            icon: CheckCircle2,
          },
          {
            title: "Workspace seat added",
            detail: "Taylor joined your workspace and has editor access.",
            badge: "Team",
            icon: BellRing,
          },
          {
            title: "Plan health check",
            detail: "You are on track to stay within your storage and workflow limits.",
            badge: "Healthy",
            icon: Rocket,
          },
        ];

  const activity =
    role === "admin"
      ? [
          { initials: "AM", title: "Alex approved the April campaign budget", time: "12m ago" },
          { initials: "JR", title: "Jordan created a retention alert for churn-risk accounts", time: "34m ago" },
          { initials: "PL", title: "Priya exported the enterprise billing report", time: "1h ago" },
          { initials: "SK", title: "Sora synced the weekly NRR forecast to the board workspace", time: "2h ago" },
        ]
      : [
          { initials: "AM", title: "Alex completed onboarding checklist item 7 of 8", time: "8m ago" },
          { initials: "TN", title: "Taylor commented on the Q2 launch dashboard", time: "21m ago" },
          { initials: "SK", title: "Sam connected Stripe to the billing workspace", time: "52m ago" },
          { initials: "ER", title: "Emma published the executive summary for Friday review", time: "1h ago" },
        ];

  return (
    <>
      <section className="feed-card">
        <div className="feed-header">
          <div>
            <h2 className="panel-title">Notifications</h2>
            <p className="panel-subtitle">Signals that need your attention right now.</p>
          </div>
        </div>

        {notifications.map(({ title, detail, badge, icon: Icon }) => (
          <article key={title} className="notification-item">
            <strong>
              <span className="row-inline">
                <Icon size={16} />
                {title}
              </span>
              <span className="status-badge status-live">{badge}</span>
            </strong>
            <span>{detail}</span>
          </article>
        ))}
      </section>

      <section className="feed-card">
        <div className="feed-header">
          <div>
            <h2 className="panel-title">Activity feed</h2>
            <p className="panel-subtitle">Recent workspace events and collaboration moments.</p>
          </div>
        </div>

        <div className="list">
          {activity.map(({ initials, title, time }) => (
            <article key={title} className="list-item">
              <div className="avatar">{initials}</div>
              <div>
                <strong>{title}</strong>
                <span>{time}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
