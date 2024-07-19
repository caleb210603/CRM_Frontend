import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";
import React from "react";

interface Props {
  setstatusButton: (status: string) => void;
}

export const HelpContent = ({ setstatusButton }: Props) => {
  return (
    <>
      <div className="flex gap-3 items-center mb-3 ">
        <div className="self-center hover:bg-primary brightness-150 rounded p-1 cursor-pointer">
          <ArrowLeft
            size={"20px"}
            onClick={() => {
              setstatusButton("CL");
            }}
          />
        </div>
        <p className="font-bold">Preguntas frecuentes</p>
      </div>

      <p className="mt-4 text-muted-foreground">
        Encuentra respuestas a tus preguntas y envía tus solicitudes de soporte.
      </p>
      <div className="space-y-6 px-5">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h3 className="text-lg font-medium">
                ¿Cómo configuro mi cuenta?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-6 py-4 text-muted-foreground">
                Para configurar tu cuenta, sigue estos pasos:
                <ol className="list-decimal list-inside mt-2">
                  <li>Inicia sesión en tu cuenta</li>
                  <li>Ve a la sección de configuración</li>
                  <li>
                    Completa la información de tu perfil, como nombre, correo
                    electrónico y contraseña
                  </li>
                  <li>
                    Configura tus preferencias, como las notificaciones y la
                    privacidad
                  </li>
                  <li>Guarda los cambios</li>
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <h3 className="text-lg font-medium">
                ¿Cómo puedo usar las funcionalidades del CRM?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-6 py-4 text-muted-foreground">
                Nuestro CRM ofrece una variedad de funcionalidades para ayudarte
                a gestionar tus relaciones con los clientes. Algunas de las
                principales funcionalidades incluyen:
                <ul className="list-disc list-inside mt-2">
                  <li>Gestión de contactos y cuentas</li>
                  <li>Seguimiento de oportunidades y ventas</li>
                  <li>Programación de tareas y actividades</li>
                  <li>Informes y análisis de datos</li>
                  <li>Automatización de procesos</li>
                </ul>
                Para aprender a usar estas funcionalidades, te recomendamos
                consultar nuestra documentación o solicitar una sesión de
                capacitación.
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <h3 className="text-lg font-medium">
                ¿Cómo puedo resolver problemas técnicos?
              </h3>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-6 py-4 text-muted-foreground">
                Si estás experimentando problemas técnicos, aquí hay algunos
                pasos que puedes seguir:
                <ol className="list-decimal list-inside mt-2">
                  <li>
                    Verifica que tu conexión a internet esté funcionando
                    correctamente
                  </li>
                  <li>
                    Cierra y vuelve a abrir tu navegador o la aplicación del CRM
                  </li>
                  <li>Limpia la caché y los cookies de tu navegador</li>
                  <li>
                    Asegúrate de estar utilizando la versión más reciente del
                    software
                  </li>
                  <li>
                    Si el problema persiste, comunícate con nuestro equipo de
                    soporte técnico
                  </li>
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};
