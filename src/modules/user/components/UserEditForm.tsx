import { UserSchema } from "@/lib/validators/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {  z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types/auth";
import { toast } from "@/hooks/useToast";
import api from "@/services/api";
import { useQueryClient } from "react-query";

interface Props {
  edit: boolean;
  user: User | null;
  setIsPending: (value: boolean) => void;
  form: any;
  setIsOpen: (value: boolean) => void
  file: File | null;
  setFile: (file: File | null) => void;
}

export function UserEditForm({ edit, user, setIsPending, form, setIsOpen, file, setFile }: Props) {
  const queryClient = useQueryClient();
  const onSubmit = async (values: z.infer<typeof UserSchema>) => {
    setIsPending(true);
    try {

      const updatedUserData = { ...values };

      // Si la imagen es una URL, eliminarla del objeto de datos
      if (updatedUserData.image && typeof updatedUserData.image === 'string') {
        console.log("Archivo seleccionado:", file);
        delete updatedUserData.image;
        ImageUpdate();
      } 

      const { status } = await api.put(`/users/update/${user?.id}`, updatedUserData);
      status  === 200
        ? toast({ title: "Usuario editado" })
        : toast({ title: "Error al editar", variant: "destructive" });
        setFile(null)
      queryClient.invalidateQueries("users");
      setIsOpen(false)
    } catch (error) {
      toast({ title: "Error al editar usuario", variant: "destructive" });
    } finally {
      setIsPending(false);
    }
  };

const ImageUpdate = async () => {
    try {
      const formData = new FormData();

      if (file) {
        formData.append('image', file);
      }
      

      const response = await api.patch(`/users/update/${user?.id}`, formData)
  
      if (response.status === 200) {
        toast({
          title: "Cuenta actualizada exitosamente",
        });
        queryClient.invalidateQueries("users");
        setIsOpen(false);
      } else {
        toast({
          title: "Esta cuenta esta actualizada",
        });
      }
    } catch (error) {
      console.error("Error al actualizar cuenta:", error);
    } 
  };


  return (
    <ScrollArea className="h-[500px] w-[460px]">
      <Form {...form}>
        <form
          id="update-user-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 w-[98%] p-[0.4rem] pb-20"
        >
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={edit} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={edit} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={edit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="document_type"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tipo de documento</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    disabled={edit}
                    defaultValue={user?.document_type.toString()}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${
                          !field.value && "text-muted-foreground"
                        } hover:text-accent-foreground`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">DNI</SelectItem>
                      <SelectItem value="2">Cedula</SelectItem>
                      <SelectItem value="3">Pasaporte</SelectItem>
                      <SelectItem value="4">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="document_number"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nº identificación</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={edit} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Direccion</FormLabel>
                <FormControl>
                  <Input {...field} disabled={edit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Numero</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={edit}
                      type="text"
                      pattern="^\d{1,9}$"
                      onInput={(e) =>
                        (e.currentTarget.value = e.currentTarget.value.replace(
                          /[^\d]/g,
                          ""
                        ))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Tipo de usuario</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    disabled={edit}
                    defaultValue={user?.role.toString()}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${
                          !field.value && "text-muted-foreground"
                        } hover:text-accent-foreground`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Administrador</SelectItem>
                      <SelectItem value="2">Empleado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} disabled={edit} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </ScrollArea>
  );
}
