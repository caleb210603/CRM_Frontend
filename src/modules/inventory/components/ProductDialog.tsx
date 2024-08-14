import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Product } from "@/types/product";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ProductForm } from "@/modules/inventory/components/ProductForm";

import { useSelector } from "react-redux";

import { ProductCard } from "./ProductCard";

import { RootState } from "@/store";

interface ProductCardProps {
  product: Product;
  className?: string;
  activeType?: string;
}

export const ProductDialog: React.FC<ProductCardProps> = ({
  product,
  className,
  activeType,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);

  const imageClasses = `w-full h-full object-cover duration-700 ease-in-out ${
    isLoading ? "scale-105 blur-lg" : "scale-100 blur-0"
  }`;

  const { categories } = useSelector((state: RootState) => state.categories);

  const CategoriaDetail = categories.find(
    (categoria) => categoria.id === product.category
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <ProductCard
          product={product}
          activeType={activeType}
          setLoading={setLoading}
          className={className}
          CategoriaDetail={CategoriaDetail}
          imageClasses={imageClasses}
        />
      </DialogTrigger>
      <DialogContent className="max-w-6xl">
        <Card className="h-full rounded-sm border-none">
          <ProductForm
            mode="update"
            product={product}
            setIsPending={setIsPending}
            setIsOpen={setOpen}
          />
        </Card>

        <DialogFooter className="flex sm:justify-between gap-4">
          <DialogClose asChild>
            <Button className="w-full" variant="outline">
              Cerrar
            </Button>
          </DialogClose>
          <Button
            className="w-full"
            disabled={isPending}
            type="submit"
            form="add-product-form"
          >
            {isPending && (
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Actualizar
          </Button>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};



