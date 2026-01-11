import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-border bg-bg-alt">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold">
            Personal App
          </Link>

          <Link href="/about" className="text-sm text-muted hover:text-fg">
            Sobre
          </Link>
        </nav>

        <nav>
          <Link href="/login" className="rounded px-3 py-1 text-sm text-fg hover:bg-bg">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
