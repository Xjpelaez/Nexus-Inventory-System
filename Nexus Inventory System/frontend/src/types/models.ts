export type ProductStatus = "available" | "low_stock" | "out_of_stock";

export type Product = {
  id: number;
  code: string;
  name: string;
  description: string;
  purchase_price: string;
  sale_price: string;
  current_stock: number;
  minimum_stock: number;
  stock_status: ProductStatus;
  category_name: string;
  supplier_name: string;
  is_active: boolean;
};

export type DashboardSummary = {
  total_products: number;
  low_stock_products: number;
  out_of_stock_products: number;
  active_categories: number;
  products_by_category: Array<{ name: string; total: number }>;
  movement_totals: Array<{ movement_type: string; total_quantity: number; total_events: number }>;
  lowest_stock: Array<{ id: number; code: string; name: string; current_stock: number }>;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
