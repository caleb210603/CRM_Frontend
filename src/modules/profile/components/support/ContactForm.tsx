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
import { Textarea } from "@/components/ui/textarea";
import { supportSchema } from "@/lib/validators/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  setstatusButton: (status: string) => void;
}

type Inputs = z.infer<typeof supportSchema>;

export const ContactForm = ({ setstatusButton }: Props) => {
  const form = useForm<Inputs>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
  };

  return (
    <div className="">
      <div className="flex gap-3 items-center mb-3">
        <div className="hover:bg-primary brightness-150 rounded p-1 cursor-pointer">
          <ArrowLeft
            size={"20px"}
            onClick={() => {
              setstatusButton("CL");
            }}
          />
        </div>
        <p className="font-bold">Contacta con soporte</p>
      </div>
      <p className="mt-4 text-muted-foreground mb-5">
        Si no has encontrado la respuesta a tu pregunta, envíanos un mensaje y
        te ayudaremos.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="Correo Electrónico" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Asunto</FormLabel>
                <FormControl>
                  <Input placeholder="Subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Mensaje</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Mensaje"
                    {...field}
                    className="resize-none"
                    rows={5}
                    maxLength={1000}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" self-center flex mt-2">
            <Button type="submit" className="px-5">
              Enviar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
