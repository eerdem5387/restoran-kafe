import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import { AdminStorageBanner } from "@/components/admin/AdminStorageBanner";
import { isAuthenticated } from "@/lib/auth";

export async function requireAdmin() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col bg-surface md:flex-row">
      <AdminNav />
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:px-8">
          <AdminStorageBanner />
          {children}
        </div>
      </div>
    </div>
  );
}
