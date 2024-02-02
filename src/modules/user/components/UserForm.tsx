import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/lib/validators/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputPassword } from "@/components/InputPassword";
import { z } from "zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/services/api";
import { toast } from "@/hooks/useToast";
import { useQueryClient } from "react-query";

interface Props {
  setIsPending: (value: boolean) => void;
  setIsOpen: (value: boolean) => void;
}

export function UserForm({ setIsPending, setIsOpen }: Props) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      name: "",
      lastname: "",
      document_type: 1,
      document_number: "",
      phone: "",
      address: "",
      role: 1,
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setIsPending(true);
    try {
      const { status } = await api.post("/auth/register", values);
      status >= 400
        ? toast({
          description: "Error al crear usuario",
          variant: "destructive",
        })
        : toast({ description: "Usuario creado correctamente" });
      queryClient.invalidateQueries("users");
      setIsOpen(false);
    } catch (error) {
      toast({
        description: "Error al crear usuario",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <ScrollArea className="max-h-[550px] pl-4">
      <Form {...form}>
        <form
          id="add-user-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 w-[96%] p-[0.3rem]"
        >
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombres" {...field} />
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
                    <Input placeholder="Apellidos" {...field} />
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
                  <Input placeholder="Email" {...field} />
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
                    defaultValue="1"
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${!field.value && "text-muted-foreground"
                          } hover:text-accent-foreground`}
                      >
                        <SelectValue placeholder="Seleccione un tipo" />
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
                    <Input placeholder="número de documento" {...field} />
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
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input placeholder="Dirección" {...field} />
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
                      type="text"
                      pattern="^\d{1,9}$"
                      placeholder="Numero de celular"
                      onInput={(e) =>
                      (e.currentTarget.value = e.currentTarget.value.replace(
                        /[^\d]/g,
                        ""
                      ))
                      }
                      {...field}
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
                    defaultValue="2"
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${!field.value && "text-muted-foreground"
                          } hover:text-accent-foreground`}
                      >
                        <SelectValue placeholder="Seleccione un un tipo" />
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
                  <Input placeholder="Usuario" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <InputPassword form={form} />
        </form>
      </Form>
    </ScrollArea>
  );
}
