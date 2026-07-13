import { ShieldCheck, UserPlus } from "lucide-react";

import { Button } from "../components/ui/Button";

export function UsersPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Usuarios y roles</h2>
          <p className="text-sm text-slate-500">Administradores, supervisores y empleados con permisos separados.</p>
        </div>
        <Button><UserPlus size={18} /> Nuevo usuario</Button>
      </div>
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-panel dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-teal-100 p-2 text-teal-800 dark:bg-teal-950 dark:text-teal-200">
            <ShieldCheck size={20} />
          </span>
          <div>
            <h3 className="font-semibold">Control de acceso preparado</h3>
            <p className="text-sm text-slate-500">El backend ya restringe usuarios a administradores.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
