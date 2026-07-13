import { Download } from "lucide-react";

import { api } from "../api/client";
import { Button } from "../components/ui/Button";

async function downloadReport(path: string, fileName: string) {
  const response = await api.get(path, { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  window.URL.revokeObjectURL(url);
}

export function ReportsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Reportes</h2>
        <p className="text-sm text-slate-500">Exportaciones iniciales en CSV para productos y movimientos.</p>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-semibold">Productos</h3>
          <p className="mt-2 text-sm text-slate-500">Codigo, nombre, categoria, proveedor, stock y precio de venta.</p>
          <Button className="mt-4" variant="secondary" onClick={() => downloadReport("/reports/products.csv", "products-report.csv")}>
            <Download size={18} /> Descargar CSV
          </Button>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-800 dark:bg-slate-900">
          <h3 className="font-semibold">Movimientos</h3>
          <p className="mt-2 text-sm text-slate-500">Fecha, tipo, producto, cantidad, usuario y motivo.</p>
          <Button className="mt-4" variant="secondary" onClick={() => downloadReport("/reports/movements.csv", "movements-report.csv")}>
            <Download size={18} /> Descargar CSV
          </Button>
        </article>
      </section>
    </div>
  );
}
