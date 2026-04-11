"use client";

import Link from "next/link";
import { useMemo, useRef, useState, type RefObject } from "react";
import {
  Bell,
  Bot,
  Briefcase,
  ChartColumnIncreasing,
  CheckCircle2,
  CircleAlert,
  CircleDollarSign,
  CreditCard,
  Gauge,
  Headset,
  Layers3,
  LogOut,
  MoonStar,
  Search,
  Settings,
  Shield,
  Sparkles,
  SunMedium,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import * as Dialog from "@radix-ui/react-dialog";
import { BarChartPanel } from "@/components/panels/bar-chart-panel";
import { DataTablePanel } from "@/components/panels/data-table-panel";
import { DoughnutPanel } from "@/components/panels/doughnut-panel";
import { FeedPanel } from "@/components/panels/feed-panel";
import { StatCards } from "@/components/panels/stat-cards";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/use-app-store";

const navItems = [
  { id: "overview", label: "Overview", icon: Layers3 },
  { id: "customers", label: "Customers", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "operations", label: "Operations", icon: Briefcase },
  { id: "support", label: "Support", icon: Headset },
  { id: "roadmap", label: "Roadmap", icon: Workflow },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

type SectionId = (typeof navItems)[number]["id"];

export function DashboardShell() {
  const { resolvedTheme, setTheme } = useTheme();
  const user = useAppStore((state) => state.user);
  const setRole = useAppStore((state) => state.setRole);
  const signOut = useAppStore((state) => state.signOut);

  const activeRole = user?.role ?? "admin";
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const overviewRef = useRef<HTMLElement | null>(null);
  const customersRef = useRef<HTMLElement | null>(null);
  const billingRef = useRef<HTMLElement | null>(null);
  const operationsRef = useRef<HTMLElement | null>(null);
  const supportRef = useRef<HTMLElement | null>(null);
  const roadmapRef = useRef<HTMLElement | null>(null);
  const settingsRef = useRef<HTMLElement | null>(null);

  const refs: Record<SectionId, RefObject<HTMLElement | null>> = {
    overview: overviewRef,
    customers: customersRef,
    billing: billingRef,
    operations: operationsRef,
    support: supportRef,
    roadmap: roadmapRef,
    settings: settingsRef,
  };

  const summary = useMemo(
    () =>
      activeRole === "admin"
        ? "Monitor revenue, product adoption, account health, support pressure, and operational readiness from one shared control center."
        : "Track workspace usage, automation outcomes, billing clarity, collaboration, and delivery progress in a single operating dashboard.",
    [activeRole],
  );

  const workspaceSnapshot = useMemo(
    () =>
      activeRole === "admin"
        ? [
            { label: "ARR", value: "$1.54M", trend: "+18.6%", icon: CircleDollarSign },
            { label: "Expansion pipeline", value: "$184k", trend: "+9 deals", icon: TrendingUp },
            { label: "Platform uptime", value: "99.96%", trend: "Healthy", icon: Gauge },
          ]
        : [
            { label: "Workflow ROI", value: "312%", trend: "+24 points", icon: Zap },
            { label: "Tasks automated", value: "8,420", trend: "+11.4%", icon: Workflow },
            { label: "Seat utilization", value: "86%", trend: "On target", icon: Users },
          ],
    [activeRole],
  );

  const initiativeCards = useMemo(
    () =>
      activeRole === "admin"
        ? [
            {
              title: "Growth engines",
              copy: "Lifecycle campaigns, expansion playbooks, and pipeline conversion are all outperforming target.",
              badge: "Marketing + Sales",
            },
            {
              title: "Finance visibility",
              copy: "Collections risk is isolated to three accounts and gross margin remains above quarterly threshold.",
              badge: "Billing Ops",
            },
            {
              title: "Customer retention",
              copy: "Success managers have reduced churn-risk accounts from 18 to 11 this month.",
              badge: "Customer Success",
            },
          ]
        : [
            {
              title: "Team execution",
              copy: "Sprint completion, launch readiness, and internal handoffs are all tracking green this week.",
              badge: "Delivery",
            },
            {
              title: "Usage governance",
              copy: "Storage, seats, and workflow volume remain inside plan thresholds with room to scale.",
              badge: "Workspace Health",
            },
            {
              title: "Stakeholder reporting",
              copy: "Weekly summaries, KPI rollups, and board-ready exports are generated automatically every Friday.",
              badge: "Reporting",
            },
          ],
    [activeRole],
  );

  const supportQueue = useMemo(
    () =>
      activeRole === "admin"
        ? [
            { subject: "SSO provisioning fails for EMEA team", priority: "High", owner: "Rina", eta: "42m" },
            { subject: "Invoice PDF missing VAT line items", priority: "Medium", owner: "Diego", eta: "2h" },
            { subject: "Webhook retry backlog on sandbox env", priority: "High", owner: "Nora", eta: "18m" },
          ]
        : [
            { subject: "New approver needed for campaign workflow", priority: "Medium", owner: "Alicia", eta: "1h" },
            { subject: "CSV import contains duplicate contacts", priority: "Low", owner: "Support Bot", eta: "Self-serve" },
            { subject: "Slack digest channel should include finance team", priority: "Medium", owner: "Ben", eta: "3h" },
          ],
    [activeRole],
  );

  const roadmapItems = useMemo(
    () =>
      activeRole === "admin"
        ? [
            { name: "AI health forecasting", progress: 84, owner: "Data Platform", ship: "Apr 18" },
            { name: "Contract billing automation", progress: 62, owner: "Finance Systems", ship: "Apr 24" },
            { name: "Multi-region incident command", progress: 49, owner: "Infra", ship: "May 02" },
          ]
        : [
            { name: "Executive reporting hub", progress: 91, owner: "Ops", ship: "Apr 15" },
            { name: "Approval workflow templates", progress: 68, owner: "Product", ship: "Apr 22" },
            { name: "Cross-team campaign calendar", progress: 54, owner: "Growth", ship: "Apr 30" },
          ],
    [activeRole],
  );

  const automationRuns = useMemo(
    () =>
      activeRole === "admin"
        ? [
            { name: "Revenue anomaly detection", cadence: "Hourly", status: "Running" },
            { name: "Renewal risk scoring", cadence: "Daily", status: "Healthy" },
            { name: "Executive KPI digest", cadence: "Weekly", status: "Queued" },
          ]
        : [
            { name: "Weekly launch summary", cadence: "Friday", status: "Healthy" },
            { name: "Lead routing workflow", cadence: "Realtime", status: "Running" },
            { name: "Budget pacing digest", cadence: "Daily", status: "Queued" },
          ],
    [activeRole],
  );

  const notifications = useMemo(
    () =>
      activeRole === "admin"
        ? [
            "Expansion opportunity detected for Northstar Commerce.",
            "Two invoices moved into follow-up state after failed collection.",
            "Incident backlog is trending below the weekly average.",
            "AI revenue forecast refreshed with stronger Q2 confidence.",
          ]
        : [
            "Your board summary was delivered to stakeholders.",
            "A new automation template is ready for rollout.",
            "Seat utilization crossed the recommended benchmark.",
            "Billing cycle closes in four days with no outstanding risk.",
          ],
    [activeRole],
  );

  const themeLabel = resolvedTheme === "dark" ? "Light mode" : "Dark mode";
  const filteredNavItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const goToSection = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    refs[sectionId].current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setSearchOpen(false);
  };

  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <ChartColumnIncreasing size={20} />
          </div>
          OrbitHQ
        </div>

        <div className="sidebar-stack">
          <div className="workspace-switcher glass-card">
            <span className="workspace-switcher-label">Workspace</span>
            <strong>{user?.company ?? "PulseOS Demo"}</strong>
            <span>{activeRole === "admin" ? "Executive operations view" : "Team delivery view"}</span>
          </div>

          <nav className="nav-list">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className={cn("nav-link", activeSection === id && "active")}
                onClick={() => goToSection(id)}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="glass-card highlight-card sidebar-highlight">
            <div className="icon-badge">
              {activeRole === "admin" ? <Shield size={18} /> : <Bot size={18} />}
            </div>
            <h2>{activeRole === "admin" ? "Ops command center" : "AI teammate enabled"}</h2>
            <p>
              {activeRole === "admin"
                ? "Track finance, product, support, and customer health from a single executive workspace."
                : "Use prebuilt reporting, automation, and planning surfaces to run your team with less manual work."}
            </p>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="topbar-copy">
            <span className="eyebrow">
              <Sparkles size={16} />
              Full SaaS workspace
            </span>
            <h1 className="dashboard-title">{user ? `Welcome back, ${user.name}` : "OrbitHQ live preview"}</h1>
            <p>{summary}</p>
          </div>

          <div className="topbar-actions">
            <div className="chip topbar-chip">
              <strong>April goal</strong>
              {activeRole === "admin" ? "Reach $150k new expansion revenue" : "Ship Q2 launch system by Apr 30"}
            </div>

            {user ? (
              <label className="chip role-chip">
                View
                <select
                  className="select role-select"
                  value={activeRole}
                  onChange={(event) => setRole(event.target.value as "admin" | "user")}
                  aria-label="Switch dashboard role view"
                  title="Switch dashboard role view"
                >
                  <option value="admin">Admin view</option>
                  <option value="user">User view</option>
                </select>
              </label>
            ) : (
              <div className="chip role-chip" aria-label="Current preview role">
                Preview
                <span className="preview-badge">Admin view</span>
              </div>
            )}

            <button
              type="button"
              className="theme-button"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            >
              {resolvedTheme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
              {themeLabel}
            </button>

            <button
              type="button"
              className="icon-button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={18} />
            </button>

            <button
              type="button"
              className="icon-button"
              aria-label="Notifications"
              onClick={() => setNotificationsOpen(true)}
            >
              <Bell size={18} />
            </button>

            {user ? (
              <button type="button" className="theme-button" onClick={signOut}>
                <LogOut size={18} />
                Sign out
              </button>
            ) : (
              <Link href="/login" className="theme-button">
                <LogOut size={18} />
                Sign in
              </Link>
            )}
          </div>
        </header>

        <div className="content-grid">
          <section ref={overviewRef} id="overview" className="content-grid dashboard-anchor">
            <StatCards role={activeRole} />

            <section className="feature-band">
              {workspaceSnapshot.map(({ label, value, trend, icon: Icon }) => (
                <article key={label} className="feed-card compact-card">
                  <div className="stat-card-header">
                    <span>{label}</span>
                    <div className="icon-badge">
                      <Icon size={18} />
                    </div>
                  </div>
                  <h2 className="metric-value">{value}</h2>
                  <p className="metric-caption">{trend}</p>
                </article>
              ))}
            </section>
          </section>

          <div className="dashboard-main">
            <div className="content-grid">
              <section ref={customersRef} id="customers" className="dashboard-anchor">
                <BarChartPanel role={activeRole} />
              </section>

              <section className="panel">
                <div className="panel-header">
                  <div>
                    <h2 className="panel-title">Strategic programs</h2>
                    <p className="panel-subtitle">
                      Cross-functional initiatives that keep growth, finance, and delivery aligned.
                    </p>
                  </div>
                </div>
                <div className="settings-grid">
                  {initiativeCards.map((item) => (
                    <article key={item.title} className="notification-item">
                      <strong>{item.title}</strong>
                      <span>{item.copy}</span>
                      <span className="status-badge status-live">{item.badge}</span>
                    </article>
                  ))}
                </div>
              </section>

              <section ref={billingRef} id="billing" className="dashboard-anchor">
                <DataTablePanel role={activeRole} />
              </section>
            </div>

            <div className="right-column">
              <section ref={operationsRef} id="operations" className="dashboard-anchor">
                <DoughnutPanel role={activeRole} />
              </section>

              <section className="feed-card">
                <div className="feed-header">
                  <div>
                    <h2 className="panel-title">Automation center</h2>
                    <p className="panel-subtitle">Scheduled workflows, reporting jobs, and AI monitors.</p>
                  </div>
                </div>
                <div className="list">
                  {automationRuns.map((run) => (
                    <article key={run.name} className="notification-item">
                      <strong>
                        <span className="row-inline">
                          <Zap size={16} />
                          {run.name}
                        </span>
                        <span className="status-badge status-live">{run.status}</span>
                      </strong>
                      <span>Cadence: {run.cadence}</span>
                    </article>
                  ))}
                </div>
              </section>

              <section className="dashboard-anchor">
                <FeedPanel role={activeRole} />
              </section>
            </div>
          </div>

          <section ref={supportRef} id="support" className="panel dashboard-anchor">
            <div className="panel-header">
              <div>
                <h2 className="panel-title">Support and incident queue</h2>
                <p className="panel-subtitle">
                  Keep escalations visible and route issues with clear ownership and response windows.
                </p>
              </div>
            </div>
            <div className="triple-grid">
              {supportQueue.map((ticket) => (
                <article key={ticket.subject} className="notification-item">
                  <strong className="row-inline">
                    <CircleAlert size={16} />
                    {ticket.subject}
                  </strong>
                  <span>Owner: {ticket.owner}</span>
                  <span>Priority: {ticket.priority}</span>
                  <span>ETA: {ticket.eta}</span>
                </article>
              ))}
            </div>
          </section>

          <section ref={roadmapRef} id="roadmap" className="panel dashboard-anchor">
            <div className="panel-header">
              <div>
                <h2 className="panel-title">Roadmap and delivery</h2>
                <p className="panel-subtitle">
                  Product bets, implementation milestones, and ship readiness across the current cycle.
                </p>
              </div>
            </div>
            <div className="roadmap-list">
              {roadmapItems.map((item) => (
                <article key={item.name} className="roadmap-item">
                  <div className="roadmap-head">
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.owner} - Target {item.ship}</span>
                    </div>
                    <span className="status-badge status-trial">{item.progress}%</span>
                  </div>
                  <div className="progress-rail" aria-hidden="true">
                    <span style={{ width: `${item.progress}%` }} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section ref={settingsRef} id="settings" className="panel dashboard-anchor">
            <div className="panel-header">
              <div>
                <h2 className="panel-title">Workspace settings</h2>
                <p className="panel-subtitle">
                  Core controls for environment preferences, access posture, AI tooling, and account readiness.
                </p>
              </div>
            </div>
            <div className="settings-grid">
              <article className="notification-item">
                <strong>Theme</strong>
                <span>
                  The interface is currently using {resolvedTheme === "dark" ? "dark" : "light"} mode with system-aware
                  styling.
                </span>
              </article>
              <article className="notification-item">
                <strong>Authentication</strong>
                <span>
                  {user
                    ? `Signed in as ${user.email} for ${user.company}.`
                    : "No active session. You can preview the full workspace or sign in with the seeded demo accounts."}
                </span>
              </article>
              <article className="notification-item">
                <strong>Permissions</strong>
                <span>{user ? `Current role view: ${activeRole}.` : "Role switching unlocks after sign-in."}</span>
              </article>
              <article className="notification-item">
                <strong>AI assistant</strong>
                <span>
                  Forecasting, summaries, anomaly detection, and reporting digests are represented across this workspace.
                </span>
              </article>
              <article className="notification-item">
                <strong>Integrations</strong>
                <span>
                  Stripe, Slack, HubSpot, Segment, and warehouse syncs are modeled in the demo operating flow.
                </span>
              </article>
              <article className="notification-item">
                <strong>Release status</strong>
                <span>
                  All product surfaces are wired as a realistic frontend SaaS experience with persistent demo auth.
                </span>
              </article>
            </div>
          </section>
        </div>
      </section>

      <Dialog.Root open={searchOpen} onOpenChange={setSearchOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-card">
            <div className="panel-header">
              <div>
                <Dialog.Title className="panel-title">Quick navigation</Dialog.Title>
                <Dialog.Description className="panel-subtitle">
                  Jump to any operating area in the workspace.
                </Dialog.Description>
              </div>
            </div>
            <div className="search-shell">
              <Search size={18} />
              <input
                className="search-input search-input-wide"
                placeholder="Search sections"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
            <div className="list">
              {filteredNavItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  className="nav-link nav-link-button"
                  onClick={() => goToSection(id)}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Root open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog-card">
            <div className="panel-header">
              <div>
                <Dialog.Title className="panel-title">Notifications</Dialog.Title>
                <Dialog.Description className="panel-subtitle">
                  Recent product, finance, and team signals.
                </Dialog.Description>
              </div>
            </div>
            <div className="list">
              {notifications.map((item) => (
                <article key={item} className="notification-item">
                  <strong className="row-inline">
                    <CheckCircle2 size={16} />
                    Update
                  </strong>
                  <span>{item}</span>
                </article>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </main>
  );
}
