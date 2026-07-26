"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/Logo";

const links = [
  { href: "/admin", label: "Panel", icon: "dashboard" },
  { href: "/admin/menu", label: "Menü", icon: "restaurant_menu" },
  { href: "/admin/reservations", label: "Rezervasyonlar", icon: "event" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-full flex-col border-b border-outline-variant/30 bg-primary-container text-on-primary md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="border-b border-on-primary/10 px-5 py-5 sm:px-6 sm:py-6">
        <Logo size="sm" />
        <p className="mt-2 font-body text-[10px] uppercase tracking-wider text-on-primary-container sm:text-xs">
          Yönetim Paneli
        </p>
      </div>
      <nav className="flex flex-1 flex-row gap-1 overflow-x-auto px-2 py-3 sm:px-3 sm:py-4 md:flex-col">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex min-h-11 shrink-0 items-center gap-2 rounded px-3 py-2.5 text-sm transition-colors whitespace-nowrap sm:gap-3 sm:px-4 sm:py-3 ${
                active
                  ? "bg-on-primary/15 text-on-primary"
                  : "text-on-primary-container hover:bg-on-primary/10 hover:text-on-primary"
              }`}
            >
              <span className="material-symbols-outlined text-lg">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-on-primary/10 p-3 sm:p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex min-h-11 w-full items-center gap-3 rounded px-4 py-3 text-sm text-on-primary-container transition-colors hover:bg-on-primary/10 hover:text-on-primary"
        >
          <span className="material-symbols-outlined text-lg">logout</span>
          Çıkış
        </button>
      </div>
    </aside>
  );
}
