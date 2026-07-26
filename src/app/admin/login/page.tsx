import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/Logo";
import { isAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Yönetici Girişi",
};

export default async function AdminLoginPage() {
  if (await isAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-surface px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center sm:mb-8">
          <Logo size="lg" priority />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
