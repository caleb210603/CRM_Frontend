


import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";

interface FilterArrowProps {
    column: Column<any, any>;
    title: string;
}

export const FilterArrow: React.FC<FilterArrowProps> = ({ column, title }) => (
    <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
        {title}
        <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
);



