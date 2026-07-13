import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Boxes, FolderKanban, PackageX } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { api } from "../api/client";
import { StatCard } from "../components/ui/StatCard";
import { DashboardSummary } from "../types/models";

export function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const response = await api.get<DashboardSummary>("/dashboard/summary/");
      return response.data;
    }
  });

  if (isLoading) {
    return <p className="text-sm text-slate-500">Cargando indicadores...</p>;
  }

  const summary = data ?? {
    total_products: 0,
    low_stock_products: 0,
    out_of_stock_products: 0,
    active_categories: 0,
    products_by_category: [],
    movement_totals: [],
    lowest_stock: []
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Productos registrados" value={summary.total_products} tone="neutral" icon={Boxes} />
        <StatCard title="Stock bajo" value={summary.low_stock_products} tone="warning" icon={AlertTriangle} />
        <StatCard title="Agotados" value={summary.out_of_stock_products} tone="danger" icon={PackageX} />
        <StatCard title="Categorias activas" value={summary.active_categories} tone="success" icon={FolderKanban} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Productos por categoria</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.products_by_category}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="total" fill="#0f766e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-panel dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold">Menor stock</h2>
          <div className="mt-4 space-y-3">
            {summary.lowest_stock.map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 dark:bg-slate-800">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-xs text-slate-500">{product.code}</p>
                </div>
                <span className="text-sm font-semibold">{product.current_stock}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
