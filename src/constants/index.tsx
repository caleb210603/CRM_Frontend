import { ClipboardList, UserCircle, Home, Users, Settings } from "lucide-react";

const MENU_ITEMS = [
  {
    name: "Inicio",
    url: "/",
    icon: <Home />,
  },
  {
    name: "Usuarios",
    url: "/users",
    icon: <UserCircle />,
  },
  {
    name: "Inventario",
    url: "/inventory",
    icon: <ClipboardList />,
  },
  {
    name: "Clientes",
    url: "/clients",
    icon: <Users />,
  },
  {
    name: "Configuración",
    url: "/configuration",
    icon: <Settings />,
  },
];

export { MENU_ITEMS };
