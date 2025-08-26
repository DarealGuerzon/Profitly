'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <header className="border-b bg-white">
      <nav className="container-balanced h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h3v18H3zM9 9h3v12H9zM15 5h3v16h-3zM21 13h3v8h-3z" />
            </svg>
          </span>
          <span className="font-semibold text-lg">Profitly</span>
        </div>

        <div className="flex items-center gap-1">
          <NavLink href="/" label="Dashboard" icon="chart" isActive={pathname === '/'} />
          <NavLink href="/ingredients" label="Ingredients" icon="box" isActive={pathname === '/ingredients'} />
          <NavLink href="/batches" label="Batches" icon="chef" isActive={pathname === '/batches'} />
        </div>

        <div className="flex items-center gap-2">
          <button className="text-sm px-3 py-2 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors">
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, label, icon, isActive }) {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? 'bg-[rgb(var(--primary))] text-white' 
          : 'hover:bg-slate-100'
      }`}
    >
      <NavIcon name={icon} />
      {label}
    </Link>
  );
}

function NavIcon({ name }) {
  const icons = {
    chart: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="m9 9 3 3 3-3" />
        <path d="m9 15 3-3 3 3" />
      </svg>
    ),
    box: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
    chef: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    )
  };
  
  return icons[name] || null;
}