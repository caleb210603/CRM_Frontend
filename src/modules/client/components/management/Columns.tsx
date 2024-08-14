import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ClientDetail as ClientDetailType } from "@/types/auth";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { ClientDetail } from "../ClientDetail";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<ClientDetailType>[] = [
  /*{
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="ml-4"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },*/
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
      {(row.getValue("image") as string)?.includes("/media/customers")  ? (
      <Avatar className="w-14 h-14">
        <AvatarImage
          src={row.getValue("image")}
          alt="Imagen de perfil"
          className="object-cover rounded-full w-full h-full max-w-full max-h-full"
          style={{objectFit: 'cover'}}
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
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dirección
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Teléfono
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const { active } = row.original;
      return active ? (
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
      const client = row.original;
      const { role_auth } = client;
      const showViewButton = role_auth == 1; // Mostrar el botón "Ver" solo si role_auth no es 1
      
      return (
        <Sheet>
          <SheetTrigger asChild>
            {showViewButton && <Button variant="outline">Ver</Button>}
          </SheetTrigger>
          <ClientDetail client={client} />
        </Sheet>
      );
    },
  },
];
