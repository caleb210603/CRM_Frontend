import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Provider as ProviderDetail, PurchaseDetail } from "@/types/purchase";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PurchaseSchema } from "@/lib/validators/purchase";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import { Checkbox } from "@/components/ui/checkbox";
import { getPaymentType } from "@/enums/paymentType";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/useToast";
import { useFetchProviders } from "./hooks/useFetchProviders";
import { useFetchDetails } from "./hooks/useFetchDetails";
import api from "@/services/api";

interface Props {
  setIsPending?: (value: boolean) => void;
  setIsOpen?: (value: boolean) => void;
}

export function PurchaseForm({ setIsPending = () => {}, setIsOpen = () => {} }: Props) {
  const { providers, error: providersError } = useFetchProviders();
  const { details, error: detailsError } = useFetchDetails();
  const paymentMethods = Array.from({ length: 5 }, (_, i) => ({ value: i.toString(), label: getPaymentType(i) }));
  const { toast } = useToast();

  const form = useForm<z.infer<typeof PurchaseSchema>>({
    resolver: zodResolver(PurchaseSchema),
    defaultValues: {
      provider_id: 0,
      date_purchase: new Date(),
      number_bill: "",
      total: 0,
      status: "",
      details: [],
      provider: {
        id: 0,
        name: "",
        ruc: 0,
        person_contact: "",
        phone: "",
        email: "",
        address: "",
        notes: "",
        created_at: new Date(),
        updated_at: new Date()
      },
      payment: {
        id: 0,
        purchase_id: 0,
        date_payment: new Date(),
        date_limit: "",
        payment_method: 0,
        total: 0,
        cancelled_total: 0,
        status: ""
      },
    },
  });

  const [selectedItems, setSelectedItems] = useState<PurchaseDetail[]>([]);
  const [selectedRuc, setSelectedRuc] = useState("");

  const providerOptions = providers.map(provider => ({ value: provider.id, label: provider.name }));
  const paymentMethodOptions = paymentMethods.map(method => ({ value: method.value, label: method.label }));

  const handleAddItem = (item: PurchaseDetail) => {
    setSelectedItems([...selectedItems, item]);
    form.setValue("total", form.getValues("total") + parseFloat(item.price.toString()) * item.quantity);
  };

  const handleRemoveItem = (itemId: number) => {
    const itemToRemove = selectedItems.find(item => item.id === itemId);
    if (itemToRemove) {
      setSelectedItems(selectedItems.filter(item => item.id !== itemId));
      form.setValue("total", form.getValues("total") - parseFloat(itemToRemove.price.toString()) * itemToRemove.quantity);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      console.log("Datos a enviar:", {
        ...data,
        details: selectedItems,
      });

      const response = await api.post('/purchases/create', {
        ...data,
        details: selectedItems,
      });

      console.log("Response:", response.data);

      toast({
        title: "Nueva compra realizada",
        description: `Compra con ID ${response.data.id} creada exitosamente.`,
        action: (
          <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        ),
      });

      setIsOpen(false);
    } catch (error: any) {
      console.error("Error en la solicitud a la API:", error);
      toast({
        title: "Error",
        description: `No se pudo realizar la compra. ${error.message}`,
      });
    }
  };

  return (
    <ScrollArea className="max-h-[1000px] border">
      <Form {...form}>
        <form id="purchase-form" className="space-y-6 w-[97%] p-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                        options={providerOptions}
                        onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : null)}
                        defaultValue={providerOptions[0]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
            </div>
            <div className="w-1/2">
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="payment.payment_method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Método de Pago</FormLabel>
                    <FormControl>
                      <Select
                        options={paymentMethodOptions}
                        onChange={(selectedOption) => field.onChange(selectedOption ? Number(selectedOption.value) : null)}
                        defaultValue={paymentMethodOptions[0]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2 mt-3">
              <FormField
                control={form.control}
                name="payment.date_limit"
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
          </div>
          <div className="flex justify-between gap-4">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="payment.total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total a Pagar</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Factura</FormLabel>
                      <FormDescription>
                        Marque esta casilla si desea una factura para esta compra
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section for selecting items */}
          <div>
            <h2 className="text-xl font-semibold mt-6">Seleccionar Ítems</h2>
            <div className="border rounded-lg p-4">
              {details.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-semibold">{item.item}</h3>
                    <p>{item.description}</p>
                    <p className="text-sm text-gray-600">Precio: {item.price} | Cantidad: {item.quantity} | Total: {item.total}</p>
                  </div>
                  <Button onClick={() => handleAddItem(item)} variant="secondary">
                    Añadir
                  </Button>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-xl font-semibold mt-6">Ítems Seleccionados</h2>
              {selectedItems.length > 0 ? (
                selectedItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-semibold">{item.item}</h3>
                      <p>{item.description}</p>
                      <p className="text-sm text-gray-600">Precio: {item.price} | Cantidad: {item.quantity} | Total: {item.total}</p>
                    </div>
                    <Button onClick={() => handleRemoveItem(item.id)} variant="secondary">
                      Remover
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No se han seleccionado ítems.</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" form="purchase-form">
              Guardar Compra
            </Button>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
}
