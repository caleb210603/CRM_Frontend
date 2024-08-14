import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { CommandList } from "cmdk";
import { ChevronRight, KeyRound, PencilLine } from "lucide-react";
import { useState } from "react";
import ConfigurePassword from "./ConfigurePassword";
import { ConfigureName } from "./ConfigureName";



export const ConfigurationList = () => {
  const [statusButton, setstatusButton] = useState("CL");

  const icons = (id: number) => {
    if (id === 1) {
      return <KeyRound size={"20px"} />;
    }

    if (id === 2) {
      return <PencilLine size={"20px"} />;
    }
  };

  const configuraciones = [
    {
      id: 1,
      status: "CC",
      icon: "KeyRound",
      name: "Cambiar contraseña",
      description: "Puedes cambiar tu contraseña en cualquier momento",
    },
    {
      id: 2,
      status: "CN",
      icon: "UserRound",
      name: "Cambiar tu nombre",
      description: "Puedes cambiar tu nombre de usuario cada un mes",
    },
  ];
  return (
    <div>
      {statusButton === "CL" && (
        <Command>
          <p className="font-bold mb-5 text-xl flex justify-center md:flex-none md:justify-start">
            Privacidad y seguridad
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
      {statusButton === "CC" && (
        <ConfigurePassword setstatusButton={setstatusButton}/>
      )}
      {statusButton === "CN" && (
        <ConfigureName setstatusButton={setstatusButton} />
      )}
    </div>
  );
};
