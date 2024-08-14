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
import { ClientDetail as client } from "@/types/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQueryClient } from "react-query";

import { updateClient } from "../services/clientService";
import { getDocumentType } from "@/enums/documentType";
import { getGender } from "@/enums/gender";

interface Props {
  edit: boolean;
  client: client | null;
  setIsPending: (value: boolean) => void;
  form: any;
  file: File | null;
  setFile: (file: File | null) => void;
}

function CLientDataEditable({ edit, client, setIsPending, form, file, setFile }: Props) {
  const queryClient = useQueryClient();
  const getDocumentTypeValue = getDocumentType(client?.document_type);
  const getGenderValue = getGender(client?.gender);


  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    try {
      const formData = new FormData(); 
  
      if (file) {
        formData.append("image", file);
      }
      formData.append("name", form.getValues("name"));
      formData.append("lastname", form.getValues("lastname"));
      formData.append("document_type", form.getValues("document_type"));
      formData.append("document_number", form.getValues("document_number"));
      formData.append("birthdate", form.getValues("birthdate"));
      formData.append("email", form.getValues("email"));
      formData.append("gender", form.getValues("gender"));
      formData.append("phone", form.getValues("phone"));
      formData.append("address", form.getValues("address"));
      formData.append("postal_code", form.getValues("postal_code"));
      formData.append("province", form.getValues("province"));
      formData.append("district", form.getValues("district"));
      formData.append("country", form.getValues("country"));
  
      if (client) {
        await updateClient(client.id, formData);
        setFile(null);
      }
    } finally {
      setIsPending(false);
      queryClient.invalidateQueries("clients");
    }
  };

  return (
    <ScrollArea className="h-[450px] w-[460px]">
      <Form {...form}>
        <form
          id="update-client-form"
          onSubmit={onSubmit}
          className="space-y-7 w-[98%] p-[0.4rem]"
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
              name="birthdate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={edit} />
                  </FormControl>
                  <FormMessage>
                    El formato de la fecha de nacimiento debe ser "yyyy-mm-dd"
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Sexo</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={String(field.value) || "default"}
                    disabled={edit}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${
                          !field.value && "text-muted-foreground"
                        } hover:text-accent-foreground`}
                      >
                        <SelectValue placeholder={getGenderValue} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Mujer</SelectItem>
                      <SelectItem value="1">Hombre</SelectItem>
                      <SelectItem value="2">Prefiero no decirlo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Correo</FormLabel>
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
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${
                          !field.value && "text-muted-foreground"
                        } hover:text-accent-foreground`}
                      >
                        <SelectValue placeholder={getDocumentTypeValue} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">DNI</SelectItem>
                      <SelectItem value="1">Cedula</SelectItem>
                      <SelectItem value="2">Pasaporte</SelectItem>
                      <SelectItem value="3">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
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
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>País</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={edit} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="province"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Provincia/Región</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={edit} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between gap-4">
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Distrito</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={edit} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="postal_code"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Código postal</FormLabel>
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
                <FormLabel>Dirección</FormLabel>
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
                  <FormLabel>Teléfono</FormLabel>
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
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
}

export default CLientDataEditable;
