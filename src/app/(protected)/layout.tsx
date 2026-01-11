import type { ReactNode } from 'react';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-4">
        <nav className="space-y-2">
          <a href="/accounts">Accounts</a>
          <a href="/transactions">Transactions</a>
          <a href="/planning">Planning</a>
          <a href="/credit-cards">Credit Cards</a>
          <a href="/invoices">Invoices</a>
          <a href="/budgets">Budgets</a>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
