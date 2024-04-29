import React, { useEffect, useState } from "react";
import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
/*import { sales } from "../components/management/data";*/
import { Sale } from "@/types/sale";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { useQuery } from "react-query";


/*Estilos para el PDF*/
/*const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#F0F4F8',
    padding: 20, // Aumentar el padding
    justifyContent: 'center', // Centrar contenido horizontalmente
    alignItems: 'flex-start', // Alinear contenido arriba
  },
  container: {
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 20, // Aumentar el padding
    marginBottom: 20, // Aumentar el margen inferior
    width: '100%', // Usar el 90% del ancho de la página
  },
  header: {
    fontSize: 22,
    paddingBottom: 5,
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
    color: '#333',
  },
  content: {
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Helvetica',
    color: '#555',
  },
  bold: {
    fontWeight: "bold",
  },
  section: {
    marginVertical: 10, // Ajustar el espacio vertical
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  productContainer: {
    marginRight: 20, // Agregar margen derecho para separar los productos
  },
}); */



const PDFPreview = () => {
  
  const [salesData, setSalesData] = useState<Sale[]>([]);

  const { data: sales, isLoading: isLoadingSales } = useQuery("sales", async () => {
    const response = await api.get("/sales");
    return response.data.results;
  });

  const { data: productDetails, isLoading: isLoadingProductDetails } = useQuery("products", async () => {
    const response = await api.get("/saledetailproduct");
    return response.data.results;
  });

  if (isLoadingSales || isLoadingProductDetails) {
    return <div>Loading...</div>;
  }

  return (
   
    <PDFViewer width="1200px" height="800px">
    <Document title="Detalle_Ventas" author="Consigue_Ventas">
      {sales.map((sale: Sale, index: number) => {
        
        return (
          <Page key={index} size="A4">
            <View>
              <Text>{`Venta Número ${sale.saleID}`}</Text>
              <Text>{`Fecha: ${sale.date}`}</Text>
              <Text>{`Total: ${sale.total}`}</Text>
              <Text>{`Tipo de pago: ${getPaymentType(sale.paymentType)}`}</Text>
              {/* Agrega más detalles de la venta según sea necesario */}
              {productDetails.map((product: any, productIndex: number) => (
                <View key={productIndex}>
                  <Text>{`Producto: ${product.name}`}</Text>
                  <Text>{`Cantidad: ${product.quantity}`}</Text>
                  {/* Agrega más detalles del producto según sea necesario */}
                </View>
              ))}
            </View>
          </Page>
        );
      })}
    </Document>
  </PDFViewer>



    /*<div className="flex justify-center items-center ml-28">
    <PDFViewer width="1200px" height="800px" >
      <Document title="Detalle_Ventas" author="Consigue_Ventas">
        {sales.map((sale: Sale, index: number) => (
          <Page key={index} size="A4" style={styles.page} >
            <View style={styles.container}>
              <View style={styles.container}>
                <Text style={styles.header}>Detalle de Ventas</Text>
              </View>
              <View style={styles.container}>
                <Text style={[styles.header, styles.section]}>
                  {sale.items[0]?.type === 'product' ? 'Detalle de Producto' : 'Detalle de Servicio'}
                </Text>
                <Text style={styles.content}>
                  Nombre del {sale.items[0]?.type === 'product' ? 'producto ' : 'servicio '}{sale.id}
                </Text>
                <Text style={styles.content}>Fecha de venta: {sale.sale_date}</Text>
                <Text style={styles.content}>Total: S/ {sale.total_amount}</Text> 
                <Text style={styles.content}>Cliente: Jhon Doe</Text>
                <Text style={styles.content}>Vendedor: Unknown</Text>
              </View>
              <View style={[styles.container, styles.horizontalContainer]}>
                {sale.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={[styles.section, styles.productContainer]}>
                    <Text style={[styles.content, styles.bold]}>
                      {item.type === 'product' ? 'Producto' : 'Servicio'} {item.id}
                    </Text>
                    <Text style={styles.content}>Cantidad: {item.quantity}</Text>
                    <Text style={styles.content}>Precio unitario: S/ {item.unit_price}</Text>
                    <Text style={styles.content}>Descuento: S/ {item.discount}</Text>
                    <Text style={styles.content}>Impuesto: S/ {item.tax}</Text>
                    <Text style={styles.content}>Total: S/ {item.total_item_amount}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Page>
        ))}
      </Document>
    </PDFViewer>
    <Button className="border-2 border-blue-500 rounded p-2 m-2">
        Volver atrás
    </Button>
    </div>*/
      );
    };

    const getPaymentType = (paymentType: number): string => {
      switch (paymentType) {
        case 0:
          return "Tarjeta de Crédito";
        case 1:
          return "Tarjeta de Débito";
        case 2:
          return "Efectivo";
        case 3: 
          return "Trasferencia Bancaria"
        case 4: 
          return "Otro"
        default:
          return "Desconocido";
      }
    };

export default PDFPreview;