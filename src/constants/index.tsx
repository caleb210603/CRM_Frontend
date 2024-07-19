import {
  ClipboardList,
  UserCircle,
  Home,
  Users,
  Settings,
  PercentCircle,
  Wallet,
} from "lucide-react";

const MENU_ITEMS = [
  {
    name: "Inicio",
    url: "/",
    icon: <Home />,
    accordion: false,
    accordionOptions: [],
  },
  {
    name: "Ventas",
    url: "/sales",
    icon: <PercentCircle />,
    accordion: false,
    accordionOptions: [],
  },
  {
    name: "Gastos",
    url: "/expenses",
    icon: <Wallet />,
    accordion: true,
    accordionOptions: [
      {
        name: "Proveedores",
        url: "/providers",
      },
      {
        name: "Artículos",
        url: "/items",
      },
    ],
  },
  {
    name: "Usuarios",
    url: "/users",
    icon: <UserCircle />,
    accordion: false,
    accordionOptions: [],
  },
  {
    name: "Inventario",
    url: "/inventory",
    icon: <ClipboardList />,
    accordion: false,
    accordionOptions: [],
  },
  {
    name: "Clientes",
    url: "/clients",
    icon: <Users />,
    accordion: false,
    accordionOptions: [],
  },
  {
    name: "Configuración",
    url: "/configuration",
    icon: <Settings />,
    accordion: false,
    accordionOptions: [],
  },
];

export { MENU_ITEMS };
