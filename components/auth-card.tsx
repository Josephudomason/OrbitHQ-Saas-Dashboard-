"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAppStore, type Role } from "@/store/use-app-store";

type AuthCardProps = {
  mode: "login" | "signup";
};

export function AuthCard({ mode }: AuthCardProps) {
  const router = useRouter();
  const signUp = useAppStore((state) => state.signUp);
  const login = useAppStore((state) => state.login);
  const [role, setRole] = useState<Role>("admin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isLogin = mode === "login";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (isLogin) {
      const result = login({ email, password });

      if (!result.ok) {
        setError(result.message ?? "Unable to sign in.");
        return;
      }
    } else {
      const result = signUp({
        name: name.trim() || "User",
        email,
        password,
        role,
        company: role === "admin" ? "PulseOS Labs" : "Northstar Commerce",
      });

      if (!result.ok) {
        setError(result.message ?? "Unable to create account.");
        return;
      }
    }

    router.push("/dashboard");
  };

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div>
          <span className="eyebrow">
            <Sparkles size={16} />
            OrbitHQ Access
          </span>
          <h1>
            {isLogin ? "Sign back in to your operating workspace." : "Create a workspace with seeded SaaS flows."}
          </h1>
          <p>
            This app ships with persistent frontend auth, demo role switching,
            analytics, billing, support, roadmap, automation, and a richer multi-team dashboard.
          </p>
        </div>

        <div className="glass-card highlight-card">
          <div className="icon-badge">
            <ShieldCheck size={18} />
          </div>
          <h2>Ready-to-demo SaaS flows</h2>
          <p>
            Use the seeded demo accounts or create your own account to preview how admin and team views
            change across analytics, operations, support, and billing.
          </p>
        </div>
      </section>

      <section className="auth-card-wrap">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>{isLogin ? "Sign in" : "Create account"}</h2>
          <p>
            {isLogin
              ? "Use one of the seeded demo accounts or sign in with an account you created locally."
              : "Create a local demo account and jump straight into the full workspace."}
          </p>

          {!isLogin && (
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                className="input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              required
            />
          </div>

          {!isLogin && (
            <div className="field">
              <label htmlFor="role">Workspace role</label>
              <select
                id="role"
                className="select"
                value={role}
                onChange={(event) => setRole(event.target.value as Role)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "8px" }}>
            {isLogin ? "Enter dashboard" : "Create workspace"}
          </button>

          {error ? <div className="form-error">{error}</div> : null}

          <div className="inline-note">
            Demo accounts: `maya@northstar.io` / `demo1234` and `alex@launchboard.io` / `demo1234`.
          </div>

          <div className="auth-footer">
            {isLogin ? "Need an account?" : "Already have an account?"}{" "}
            <Link href={isLogin ? "/signup" : "/login"}>{isLogin ? "Sign up" : "Sign in"}</Link>
          </div>
        </form>
      </section>
    </main>
  );
}
