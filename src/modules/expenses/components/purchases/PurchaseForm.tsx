import React, { useState } from "react";
import { MultiValue, ActionMeta } from 'react-select';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { useToast } from "@/hooks/useToast";
import { useFetchProviders } from "./hooks/useFetchProviders";
import { useFetchDetails } from "./hooks/useFetchDetails";
import api from "@/services/api";
import { ToastAction } from "@/components/ui/toast";
import { PurchaseSchema } from "@/lib/validators/purchase";

interface Option {
  value: string | number;
  label: string;
}

interface MultiOption extends Option { }

interface Props {
  setIsPending?: (value: boolean) => void;
  setIsOpen?: (value: boolean) => void;
}

export function PurchaseForm({ setIsPending = () => { }, setIsOpen = () => { } }: Props) {
  const { providers, error: providersError } = useFetchProviders();
  const { details, error: detailsError } = useFetchDetails();
  const { toast } = useToast();

  const [selectedProvider, setSelectedProvider] = useState<Option | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Option | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<Option | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<MultiOption[]>([]);

  const form = useForm<z.infer<typeof PurchaseSchema>>({
    resolver: zodResolver(PurchaseSchema),
    defaultValues: {
      provider_id: 0,
      date_purchase: new Date().toISOString().slice(0, 10),
      description: "",
      number_bill: "",
      total: 0,
      estatus: "",
      detailpurchase_id: 0,
      date_limit: new Date().toISOString().slice(0, 10),
      payment_method: ""
    },
  });

  const statusOptions: Option[] = [
    { value: "Completado", label: "Completado" },
    { value: "Pendiente", label: "Pendiente" },
  ];

  const paymentMethodOptions: Option[] = [
    { value: "Paypal", label: "Paypal" },
    { value: "Efectivo", label: "Efectivo" },
    { value: "Credit Card", label: "Credit Card" },
  ];

  const providerOptions: Option[] = providers.map(provider => ({ value: provider.id, label: provider.name }));
  const detailOptions: Option[] = details.map(detail => ({ value: detail.id, label: `${detail.item} - ${detail.date_purchase}` }));

  const onSubmit = async (data: z.infer<typeof PurchaseSchema>) => {
    try {
      const purchasePayload = {
        date_purchase: data.date_purchase,
        description: data.description,
        number_bill: data.number_bill,
        total: data.total,
        estatus: data.estatus,
        provider_id: data.provider_id,
        detailpurchase_id: data.detailpurchase_id
      };

      const purchaseResponse = await api.post('purchases/create', purchasePayload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const paymentPayload = {
        date_payment: data.date_purchase,
        date_limit: data.date_limit,
        payment_method: data.payment_method,
        total: data.total,
        cancelled_total: 0,
        estatus: "Pendiente",
        purchase_id: purchaseResponse.data.id
      };

      const paymentResponse = await api.post('payments/create', paymentPayload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      toast({
        title: "Nueva compra y pago realizados",
        description: `Compra con ID ${purchaseResponse.data.id} y pago con ID ${paymentResponse.data.id} creados exitosamente.`,
        action: (
          <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        ),
      });

      // reset para restablecer los datos al enviar el form 
      form.reset({
        provider_id: 0,
        date_purchase: new Date().toISOString().slice(0, 10),
        description: "",
        number_bill: "",
        total: 0,
        estatus: "",
        detailpurchase_id: 0,
        date_limit: new Date().toISOString().slice(0, 10),
        payment_method: ""
      });

      // Resetear los estados de los Select
      setSelectedProvider(null);
      setSelectedStatus(null);
      setSelectedPaymentMethod(null);
      setSelectedDetails([]);

      setIsOpen(false);
    } catch (error) {
      console.error("Error en la solicitud a la API:", error);
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: `No se pudo realizar la compra y pago. ${error.message}`,
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudo realizar la compra y pago. Error desconocido.",
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form id="add-purchase-form" className="space-y-6 w-[97%] p-6" onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-bold mb-4">Detalles de Compra</h1>
        <div className="flex justify-between gap-4">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="provider_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proveedor</FormLabel>
                  <FormControl>
                    <Select
                     className="text-black"
                     placeholder="Selecciona un Proveedor"
                      options={providerOptions}
                      value={selectedProvider}
                      onChange={(selectedOption: Option | null) => {
                        setSelectedProvider(selectedOption);
                        field.onChange(selectedOption ? selectedOption.value : null);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-between gap-4">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="date_purchase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Compra</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="number_bill"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Número de Factura</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      placeholder="Ingresa número de factura"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="number-to-text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingresa el Total"
                      inputMode="decimal"
                      {...field}
                      value={field.value === 0 ? '' : field.value}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                        field.onChange(value);
                      }}
                      className="number-to-text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-1/2">
            <FormField
              control={form.control}
              name="estatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Select
                     className="text-black"
                      placeholder="Seleccionar un Estado"
                      options={statusOptions}
                      value={selectedStatus}
                      onChange={(selectedOption: Option | null) => {
                        setSelectedStatus(selectedOption);
                        field.onChange(selectedOption ? selectedOption.value : '');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Escribe una descripción..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          <div className="w-1/2">
            <FormField
              control={form.control}
              name="detailpurchase_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IDs de Detalle de Compra</FormLabel>
                  <FormControl>
                    <Select
                     className="text-black"
                      placeholder="Selecciona una Compra"
                      options={detailOptions}
                      isMulti
                      value={selectedDetails}
                      onChange={(
                        newValue: MultiValue<MultiOption>,
                        actionMeta: ActionMeta<MultiOption>
                      ) => {
                        setSelectedDetails(newValue as MultiOption[]);
                        field.onChange(newValue.map(option => option.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="date_limit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha Límite de Pago</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Pago</FormLabel>
                  <FormControl>
                    <Select
                    className="text-black"
                      placeholder="Selecciona un Metodo de Pago"
                      options={paymentMethodOptions}
                      value={selectedPaymentMethod}
                      onChange={(selectedOption: Option | null) => {
                        setSelectedPaymentMethod(selectedOption);
                        field.onChange(selectedOption ? selectedOption.value : '');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" form="add-purchase-form">
            Guardar Compra y Pago
          </Button>
        </div>
      </form>
    </Form>
  );
}