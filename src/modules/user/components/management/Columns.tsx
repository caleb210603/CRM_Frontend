  import { ColumnDef } from "@tanstack/react-table";
import { User, User as UserDetailType } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { UserDetail } from "../UserDetail";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export const columns: ColumnDef<UserDetailType>[] = [

  {
    accessorKey: "image",
    header: ({ column }) => {
      return (

        <div className="flex items-center justify-center">
          <span className="mr-2 ml-2">Perfil</span>
        </div>
      );
    },
    cell: ({ row }) => (
      /*Si es que hay imagen se muestra la imagen*/
      <div className="flex items-center justify-center">
        {(row.getValue("image") as string)?.includes("/media/photos") ? (
          <Avatar className="w-16 h-16">
            <AvatarImage
              src={row.getValue("image")}
              alt="Imagen de perfil"
              className="object-cover rounded-full w-full h-full max-w-full max-h-full"
              style={{ objectFit: 'cover' }}
            />
          </Avatar>
        ) : (
          /*Si no hay imagen se muestra el avatar con las iniciales*/
          <Avatar className="mx-auto  rounded-full w-16 h-16 flex-initial object-cover">
            <AvatarFallback className="text-1xl flex items-center justify-center h-full">
              {typeof row.getValue("name") === 'string' ? (row.getValue("name") as string)[0] : ''}
              {typeof row.getValue("lastname") === 'string' && row.getValue("lastname") ? (row.getValue("lastname") as string)[0] : ''}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    ),
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Apellidos
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("lastname")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombres
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "document_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dni
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("document_number")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formated = row.getValue("role") == 1 ? "administrador" : "empleado";
      return <div className="lowercase">{formated}</div>;
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const { is_active } = row.original;
      return is_active ? (
        <Badge
          variant="outline"
          className="border-green-500 text-green-500 capitalize"
        >
          {row.getValue("estado") || "Activo"}
        </Badge>
      ) : (
        <Badge
          variant="outline"
          className="border-red-500 text-red-500 capitalize"
        >
          {row.getValue("estado") || "Inactivo"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      const [open, setIsOpen] = useState(false);
      if (user.role_auth === 1) {
        return (
          <Sheet open={open} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline">Ver</Button>
            </SheetTrigger>
            <UserDetail user={user} open={open} setIsOpen={setIsOpen} />
          </Sheet>
        );
      } else {
        return null; // No mostrar la columna de acciones si role_auth no es 1
      }
    },
  },
];


