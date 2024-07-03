import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { CommandList } from "cmdk";
import { ChevronRight, HandHelping,  Mail} from "lucide-react";
import { useState } from "react";
import { ContactForm } from "./support/ContactForm";
import { HelpContent } from "./support/HelpContent";

export const HelpAndSupport = () => {
  const [statusButton, setstatusButton] = useState("CL");

  const icons = (id: number) => {
    if (id === 1) {
      return <HandHelping size={"20px"} />;
    }

    if (id === 2) {
      return <Mail size={"20px"} />;
    }
  };

  const configuraciones = [
    {
      id: 1,
      status: "CC",
      icon: "hand-helping",
      name: "Preguntas frecuentes",
      description: "Encuentra respuestas a las preguntas más comunes",
    },
    {
      id: 2,
      status: "CN",
      icon: "mail",
      name: "Contáctanos",
      description: "Ponte en contacto con nuestro equipo de soporte",
    },
  ];
  return (
    <div>
      {statusButton === "CL" && (
        <Command>
          <p className="font-bold mb-5 text-xl flex justify-center md:flex-none md:justify-start">
            Ayuda y Soporte
          </p>
          <CommandList>
            <CommandGroup className="border p-0 rounded-md max-w-md">
              {configuraciones.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    setstatusButton(item.status);
                  }}
                  className="flex justify-between cursor-pointer"
                >
                  <div className="flex gap-5 items-center hover:text-primary">
                    {icons(item.id)}
                    <div className="flex flex-col gap-2 ">
                      <p className="font-bold">{item.name}</p>
                      <p className="font-light text-foreground dark:text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={"20px"} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      )}
      {statusButton === "CC" && <HelpContent setstatusButton={setstatusButton}/>}
      {statusButton === "CN" && <ContactForm setstatusButton={setstatusButton} />}
    </div>
  );
};
