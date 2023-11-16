import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/lib/validators/auth";
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/services/api";
import { useDispatch } from "react-redux";
import { login } from "@/store/auth";
import { Link, useNavigate } from "react-router-dom";

export function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      const response = await api.post("/login", values);
      console.log(response);
      if (response.data.access) {
        dispatch(login(response.data));
        navigate("/");
      } else {
        console.error("El token de acceso no está presente en la respuesta del servidor");
      }
    } catch (error) {
      console.error("Error de autenticación", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <h3 className="text-3xl text-center font-medium mb-16">
          Iniciar sesión
        </h3>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <Input variant="glass" placeholder="Usuario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input variant="glass" placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              className="border-secondary data-[state=checked]:bg-secondary"
              id="remember"
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Recuérdame
            </label>
          </div>
          <Link to="/reset-password">
            <Button variant="link">¿Olvidaste tu contraseña?</Button>
          </Link>
        </div>
        <Button className="rounded-full w-full text-lg" type="submit">
          Ingresar
        </Button>
      </form>
    </Form>
  );
}
