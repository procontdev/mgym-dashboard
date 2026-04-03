"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, CreditCard, LogOut, Loader2 } from "lucide-react";
import { useState } from "react";

const items = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/leads", label: "Leads", icon: Users },
    { href: "/membresias", label: "Membresías", icon: CreditCard },
];

export function AppSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // No mostrar sidebar en la página de login
    if (pathname?.startsWith("/login")) return null;

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (res.ok) {
                router.replace("/login");
                router.refresh();
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col h-screen sticky top-0">
            <div className="p-6">
                <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    MGym <span className="text-primary italic font-medium text-base">Admin</span>
                </h1>
            </div>
            
            <nav className="flex-1 px-4 space-y-1.5 mt-2">
                {items.map((it) => {
                    const active = pathname === it.href;
                    const Icon = it.icon;
                    return (
                        <Link
                            key={it.href}
                            href={it.href}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
                                ${active 
                                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg shadow-gray-200/50 dark:shadow-none" 
                                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white"
                                }
                            `}
                        >
                            <Icon size={18} className={active ? "" : "text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"} />
                            {it.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100 dark:border-gray-900">
                <button 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all disabled:opacity-50"
                >
                    {isLoggingOut ? <Loader2 size={18} className="animate-spin" /> : <LogOut size={18} />}
                    {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
                </button>
            </div>
        </aside>
    );
}
