"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "admin" | "user";

export type User = {
  name: string;
  email: string;
  company: string;
  role: Role;
};

type Account = User & {
  password: string;
};

const seededAccounts: Account[] = [
  {
    name: "Maya Patel",
    email: "maya@northstar.io",
    company: "Northstar Commerce",
    role: "admin",
    password: "demo1234",
  },
  {
    name: "Alex Morgan",
    email: "alex@launchboard.io",
    company: "Launch Board",
    role: "user",
    password: "demo1234",
  },
];

type AppState = {
  user: User | null;
  accounts: Account[];
  signUp: (account: Account) => { ok: boolean; message?: string };
  signIn: (user: User) => void;
  login: (credentials: { email: string; password: string }) => { ok: boolean; message?: string };
  signOut: () => void;
  setRole: (role: Role) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      accounts: seededAccounts,
      signUp: (account) => {
        const email = account.email.trim().toLowerCase();
        const exists = get().accounts.some((entry) => entry.email.toLowerCase() === email);

        if (exists) {
          return { ok: false, message: "An account with this email already exists." };
        }

        const nextAccount = { ...account, email };
        set((state) => ({
          accounts: [...state.accounts, nextAccount],
          user: {
            name: nextAccount.name,
            email: nextAccount.email,
            company: nextAccount.company,
            role: nextAccount.role,
          },
        }));

        return { ok: true };
      },
      signIn: (user) => set({ user }),
      login: ({ email, password }) => {
        const normalizedEmail = email.trim().toLowerCase();
        const account = get().accounts.find((entry) => entry.email.toLowerCase() === normalizedEmail);

        if (!account) {
          return { ok: false, message: "No account found. Create one from the sign-up page first." };
        }

        if (account.password !== password) {
          return { ok: false, message: "Incorrect password. Try again." };
        }

        set({
          user: {
            name: account.name,
            email: account.email,
            company: account.company,
            role: account.role,
          },
        });

        return { ok: true };
      },
      signOut: () => set({ user: null }),
      setRole: (role) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                role,
              }
            : null,
        })),
    }),
    {
      name: "pulseos-auth-store",
      partialize: (state) => ({
        user: state.user,
        accounts: state.accounts,
      }),
    },
  ),
);
