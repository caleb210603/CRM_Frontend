import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
    currentPage: number;
    rowsPerPage: number;
    totalRows: number;
    onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationProps> = ({
    currentPage,
    rowsPerPage,
    totalRows,
    onPageChange,
}) => {
    const canPreviousPage = currentPage > 0;
    const canNextPage = currentPage < Math.ceil(totalRows / rowsPerPage) - 1;

    const previousPage = () => {
        if (canPreviousPage) onPageChange(currentPage - 1);
    };

    const nextPage = () => {
        if (canNextPage) onPageChange(currentPage + 1);
    };

    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                {currentPage * rowsPerPage + 1} -{" "}
                {Math.min((currentPage + 1) * rowsPerPage, totalRows)} de {totalRows} Filas
               
            </div>
            <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={previousPage} disabled={!canPreviousPage}>
                    Anterior
                </Button>
                <Button variant="outline" size="sm" onClick={nextPage} disabled={!canNextPage}>
                    Siguiente
                </Button>
            </div>
        </div>
    );
};

export default PaginationControls;
