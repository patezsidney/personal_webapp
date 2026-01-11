'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { isAuthenticated, logout } from '@/services/auth';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login');
    }
  }, [router]);

  function handleLogout() {
    logout();
    router.replace('/');
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="w-64 border-r border-border bg-bg-alt p-4">
        <nav className="space-y-2">
          <Link href="/accounts" className="block rounded px-3 py-2 text-sm hover:bg-bg">
            Accounts
          </Link>

          <Link href="/transactions" className="block rounded px-3 py-2 text-sm hover:bg-bg">
            Transactions
          </Link>

          <Link href="/planning" className="block rounded px-3 py-2 text-sm hover:bg-bg">
            Planning
          </Link>

          <Link href="/credit-cards" className="block rounded px-3 py-2 text-sm hover:bg-bg">
            Credit Cards
          </Link>

          <Link href="/invoices" className="block rounded px-3 py-2 text-sm hover:bg-bg">
            Invoices
          </Link>

          <Link href="/budgets" className="block rounded px-3 py-2 text-sm hover:bg-bg">
            Budgets
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-6 w-full rounded bg-danger px-3 py-2 text-sm text-bg hover:opacity-90"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
