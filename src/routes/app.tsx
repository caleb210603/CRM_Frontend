//import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/layouts/AppLayout";
import { Categorias } from "@/modules/configuration/pages/Category";
import { Configuration } from "@/modules/configuration/pages/Configuration";
import { Clients } from "@/modules/client/pages/Clients";
import { Inventory } from "@/modules/inventory/pages/inventory";
import { Profile } from "@/modules/profile/pages/Profile";
import { Sales } from "@/modules/sale/pages/Sales";
import { Users } from "@/modules/user/pages/Users";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardPage from "@/pages/Dashboard";
import SettingsAppearancePage from "@/modules/configuration/pages/Appearance";
import { Promociones } from "@/modules/configuration/pages/Promotion";
import PDFPreview from "@/modules/sale/components/PDFPreview";
import { SaleDetail } from "@/modules/sale/pages/SaleDetail";
import PDFSaleDetail from "@/modules/sale/components/PDFSaleDetail";
import Collections from "@/modules/collections/pages/Collections";
import { Children } from "react";
import { Purchases } from "@/modules/expenses/pages/Purchases";
import { History } from "@/modules/expenses/pages/History";
import { Payments } from "@/modules/expenses/pages/Payments";
import Expenses from "@/modules/expenses/pages/Expenses";
import { Items } from "@/modules/items/pages/Items";
import { Providers } from "@/modules/provider/pages/Providers";


const appRouter = [
  {
    path: "/PDFSaleDetail/:saleID",
    element: <PDFSaleDetail />,
  },
  {
    path: "/exportar",
    element: <PDFPreview />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/sales",
        element: <Sales />,
      },
      {
        path: "/sales/:saleID",
        element: <SaleDetail />,
      },
      // Expenses
      {
        path: "expenses/*",
        element: <Expenses />,
        children: [
          {
            path: "purchases",
            element: <Purchases />,
          },
          {
            path: "history",
            element: <History />,
          },
          {
            path: "payments",
            element: <Payments />,
          },
        ],
      },
      {
        path: "/items",
        element: <Items />,
      },
      {
        path: "/providers",
        element: <Providers />,
      },
      // Expenses
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/inventory",
        element: <Inventory />,
      },
      {
        path: "/clients",
        element: <Clients />,
      },
      {
        path: "/Collections", // Agrega tu nueva ruta aquí
        element: <Collections />,
      },

      {
        path: "configuration",
        element: <Configuration />,
        children: [
          {
            path: "categorias",
            element: <Categorias />,
          },
          {
            path: "apariencia",
            element: <SettingsAppearancePage />,
          },
          {
            path: "promociones",
            element: <Promociones />,
          },
          // ... otras rutas secundarias según sea necesario ...
        ],
      },
    ],
  },
];

export default appRouter;
