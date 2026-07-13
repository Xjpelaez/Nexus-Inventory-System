import { ArrowDownToLine, ArrowUpFromLine, SlidersHorizontal } from "lucide-react";

import { Button } from "../components/ui/Button";

export function InventoryPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Inventario</h2>
          <p className="text-sm text-slate-500">Entradas, salidas, filtros y trazabilidad del stock.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary"><ArrowDownToLine size={18} /> Entrada</Button>
          <Button variant="secondary"><ArrowUpFromLine size={18} /> Salida</Button>
          <Button><SlidersHorizontal size={18} /> Filtros</Button>
        </div>
      </div>
      <section className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">
        Los movimientos ya existen en la API. En la siguiente fase se conectan formularios con React Hook Form y Zod.
      </section>
    </div>
  );
}
