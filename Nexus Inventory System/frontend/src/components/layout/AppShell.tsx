import {
  BarChart3,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  PackageSearch,
  Users
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

import { Button } from "../ui/Button";
import { useAuthStore } from "../../store/auth-store";

const navigation = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/products", label: "Productos", icon: Boxes },
  { to: "/inventory", label: "Inventario", icon: PackageSearch },
  { to: "/users", label: "Usuarios", icon: Users },
  { to: "/reports", label: "Reportes", icon: ClipboardList }
];

export function AppShell() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-cloud text-ink dark:bg-slate-950 dark:text-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-900 lg:block">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 px-2">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-ink text-sm font-semibold text-white dark:bg-white dark:text-ink">
              NX
            </span>
            <div>
              <p className="font-semibold">Nexus Inventory</p>
              <p className="text-xs text-slate-500">Operations console</p>
            </div>
          </div>

          <nav className="mt-8 flex flex-1 flex-col gap-1">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
                    isActive
                      ? "bg-slate-100 text-ink dark:bg-slate-800 dark:text-white"
                      : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                  ].join(" ")
                }
              >
                <item.icon size={18} aria-hidden="true" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Button variant="ghost" className="justify-start" onClick={logout}>
            <LogOut size={18} aria-hidden="true" />
            Cerrar sesion
          </Button>
        </div>
      </aside>

      <main className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-accent">Inventario empresarial</p>
              <h1 className="text-xl font-semibold">Centro de control</h1>
            </div>
            <BarChart3 size={22} className="text-slate-500" aria-hidden="true" />
          </div>
        </header>
        <div className="px-4 py-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
