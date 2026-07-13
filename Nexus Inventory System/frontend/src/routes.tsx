import { Navigate, createBrowserRouter } from "react-router-dom";

import { AppShell } from "./components/layout/AppShell";
import { useAuthStore } from "./store/auth-store";
import { DashboardPage } from "./pages/DashboardPage";
import { InventoryPage } from "./pages/InventoryPage";
import { LoginPage } from "./pages/LoginPage";
import { ProductsPage } from "./pages/ProductsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { UsersPage } from "./pages/UsersPage";

function ProtectedRoute() {
  const accessToken = useAuthStore((state) => state.accessToken);
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return <AppShell />;
}

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "reports", element: <ReportsPage /> }
    ]
  }
]);
