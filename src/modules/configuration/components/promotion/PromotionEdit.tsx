import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { PromotionDetail as PromotionDetailType } from "@/types/auth";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PromotionSchema } from "@/lib/validators/promocion";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/theme";
import api from "@/services/api";
import { useQueryClient } from "react-query";
import { Badge } from "@/components/ui/badge";
import { usePromotionEdit } from "../../hooks/usePromotionEdit";

interface Props {
  setIsPending?: (value: boolean) => void;

  setIsOpen?: (value: boolean) => void;
  promotion?: PromotionDetailType;
}

export function PromotionEdit({
  setIsPending = () => {},
  setIsOpen = () => {},
  promotion = {} as PromotionDetailType,
}: Props) {
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDiscount, setEditedDiscount] = useState<number>(0);
  const [editedStartDate, setEditedStartDate] = useState("");
  const [editedEndDate, setEditedEndDate] = useState("");


  const form = useForm<z.infer<typeof PromotionSchema>>({
    resolver: zodResolver(PromotionSchema),
    defaultValues: {
      name: editedName,
      description: editedDescription,
      discount: editedDiscount,
      start_date: editedStartDate,
      ending_date: editedEndDate,
    },
  });
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    form.setValue("name", promotion.name);
    form.setValue("description", promotion.description);
    form.setValue("discount", promotion.discount);
    form.setValue("start_date", promotion.start_date);
    form.setValue("ending_date", promotion.ending_date);


    setEditedName(promotion.name);
    setEditedDescription(promotion.description);
    setEditedDiscount(promotion.discount);
    setEditedStartDate(promotion.start_date);
    setEditedEndDate(promotion.ending_date);
  }, [promotion, form]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
    form.setValue("name", e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDescription(e.target.value);
    form.setValue("description", e.target.value);
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const discountValue = parseFloat(e.target.value);
    setEditedDiscount(discountValue);
    form.setValue("discount", discountValue);
  };

  const { editPromotion } = usePromotionEdit();

  const { mutate, isLoading } = editPromotion(promotion.id, {
    name: editedName,
    description: editedDescription,
    discount: editedDiscount,
    start_date: editedStartDate,
    ending_date: editedEndDate,
  });

  const onEditPromotion = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    try {
      await mutate();
      setIsOpen(false);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <ScrollArea className="max-h-[550px] pl-4">
      <Form {...form}>
        <form
          id="edit-user-form"
          onSubmit={onEditPromotion}
          className="space-y-7 w-[97%] p-[0.2rem]"
        >
          <div className="flex justify-between gap-4">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombres"
                        value={editedName}
                        onChange={handleNameChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Descripción"
                      value={editedDescription}
                      onChange={handleDescriptionChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descuento</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      placeholder="Descuento"
                      value={editedDiscount}
                      onChange={handleDiscountChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Fecha de inico</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Fecha de inicio"
                      value={editedStartDate}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <FormField
              control={form.control}
              name="ending_date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Fecha de finalización</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Fecha de inicio"
                      value={editedEndDate}
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
      </Form>
    </ScrollArea>
  );
}
