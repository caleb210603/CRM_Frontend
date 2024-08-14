import { MENU_ITEMS } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/Tooltip";
import { Button } from "../ui/button";
import { ArrowRightLeft } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

interface NavbarProps {
  isExpanded: boolean;
  btnUpdateMenuVisibility: () => void;
}

export function Sidebar({ isExpanded, btnUpdateMenuVisibility }: NavbarProps) {
  return (
    <>
      <nav className="pt-6">
        {MENU_ITEMS.map((data, index) => (
          <SidebarItem key={index} {...data} isExpanded={isExpanded} />
        ))}
        <TooltipProvider delayDuration={10}>
          <Tooltip>
            <TooltipTrigger
              asChild
              onClick={btnUpdateMenuVisibility}
              className="absolute top-[40rem] xl:top-[45rem] h-10 -right-[1.7rem]"
            >
              <Button variant="outline" className="z-50">
                <ArrowRightLeft className="w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {isExpanded ? <span>Cerrar</span> : <span>Abrir</span>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </>
  );
}
