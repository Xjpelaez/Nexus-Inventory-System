import { useQuery } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

import { api } from "../api/client";
import { Button } from "../components/ui/Button";
import { PaginatedResponse, Product } from "../types/models";

const statusLabel = {
  available: "Disponible",
  low_stock: "Stock bajo",
  out_of_stock: "Agotado"
};

export function ProductsPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["products", search],
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Product>>("/inventory/products/", {
        params: { search }
      });
      return response.data;
    }
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Productos</h2>
          <p className="text-sm text-slate-500">Catalogo operativo con precios, stock y proveedores.</p>
        </div>
        <Button>
          <Plus size={18} aria-hidden="true" />
          Nuevo producto
        </Button>
      </div>

      <label className="relative block max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por codigo, nombre o proveedor"
          className="h-11 w-full rounded-md border border-slate-200 bg-white pl-10 pr-3 outline-none ring-accent focus:ring-2 dark:border-slate-800 dark:bg-slate-900"
        />
      </label>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-panel dark:border-slate-800 dark:bg-slate-900">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500 dark:bg-slate-800">
            <tr>
              <th className="px-4 py-3">Codigo</th>
              <th className="px-4 py-3">Producto</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Proveedor</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {isLoading && (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan={6}>Cargando productos...</td>
              </tr>
            )}
            {data?.results.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-3 font-mono text-xs">{product.code}</td>
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3">{product.category_name}</td>
                <td className="px-4 py-3">{product.supplier_name}</td>
                <td className="px-4 py-3">{product.current_stock}</td>
                <td className="px-4 py-3">{statusLabel[product.stock_status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
