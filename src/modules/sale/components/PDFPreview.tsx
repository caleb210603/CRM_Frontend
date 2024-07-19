import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";
/*import { sales } from "../components/management/data";*/
import { Sale, SaleDetailProduct, SaleDetailService } from "@/types/sale";
import { useFetchSales } from "../hooks/useFetchSales";
import { PDFSaleDetailstyles, Watermark } from "../styles/PDFstyles";
import { getPaymentType } from "@/enums/paymentType";
import { getCategoryType } from "@/enums/categoryType";

const titlePageStyles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#F0F4F8",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
    color: "#333", // Añade el color que prefieras para el título
  }
});

const PDFPreview = () => {

  const salesData = useFetchSales();

  if (!salesData) {
    return <div>Cargando...</div>;
  }

  const { sales, productData, serviceData } = salesData;

  
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document title="Detalle_Ventas" author="Consigue_Ventas">
      {sales.map((sale: Sale, index: number) => {
           const items = [
            ...productData?.filter((p: SaleDetailProduct) => p.sale_obj.saleID === sale.saleID).map((p: SaleDetailProduct) => ({
              ...p, type: 'Producto', name: p.product.name, brand: p.product.brand, description: p.product.description, category: p.product.category
            })),
            ...serviceData?.filter((s: SaleDetailService) => s.sale.saleID === sale.saleID).map((s: SaleDetailService) => ({
              ...s, type: 'Servicio', name: s.service.name, description: s.service.description, category: s.service.category
            }))
          ];
          return (
        <Page size="A4" style={PDFSaleDetailstyles.page}>
          <Watermark />
          <View style={PDFSaleDetailstyles.headerContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={PDFSaleDetailstyles.logo}
                src="/public/crm-logo-noBackground.png"
              ></Image>{" "}
              // Asegúrate de que la ruta es correcta
              <View>
                <Text style={PDFSaleDetailstyles.title}>Consigue Ventas</Text>
                <Text style={PDFSaleDetailstyles.smallText}>
                  AGENCIA DE EMBUDO DE VENTAS ONLINE
                </Text>
                <Text style={PDFSaleDetailstyles.smallText}>
                  ORIENTADA AL DESARROLLO DE ESTRATEGIAS DIGITALES
                </Text>
              </View>
            </View>
            <View style={PDFSaleDetailstyles.headerRight}>
              <Text style={PDFSaleDetailstyles.smallText}>
                R.U.C. 123456789
              </Text>
              <Text style={PDFSaleDetailstyles.smallText}>
                Teléfono: 949-914-249
              </Text>
              <Link
                href="http://www.consigueventas.com"
                style={PDFSaleDetailstyles.smallText}
              >
                Sitio Web
              </Link>
            </View>
          </View>

          <View>
            <View style={PDFSaleDetailstyles.row}>
              <Text style={PDFSaleDetailstyles.boldText}>
                Cliente: {sale.customer.name}{" "}
                {sale.customer.lastname}
              </Text>
              <Text style={PDFSaleDetailstyles.smallText}>
                Celular: {sale.customer.phone}
              </Text>
            </View>
            <View style={PDFSaleDetailstyles.row}>
              <Text style={PDFSaleDetailstyles.smallText}>
                Dirección: {sale.customer.address}
              </Text>
              <Text style={PDFSaleDetailstyles.smallText}>
                Tipo de Pago: {getPaymentType(sale.paymentType)}
              </Text>
            </View>
            <View style={PDFSaleDetailstyles.row}>
              <Text style={PDFSaleDetailstyles.smallText}>
                DNI: {sale.customer.document_number}
              </Text>
            </View>
            <View style={PDFSaleDetailstyles.row}>
              <Text style={PDFSaleDetailstyles.smallText}>
                Fecha: {sale.date}
              </Text>
            </View>
          </View>

          <View style={PDFSaleDetailstyles.table}>
            <View style={PDFSaleDetailstyles.tableRow}>
              <View
                style={{ ...PDFSaleDetailstyles.tableColHeader, width: "8.5%" }}
              >
                <Text style={PDFSaleDetailstyles.tableCellHeader}>Item</Text>
              </View>
              <View
                style={{ ...PDFSaleDetailstyles.tableColHeader, width: "15%" }}
              >
                <Text style={PDFSaleDetailstyles.tableCellHeader}>
                  Categoria
                </Text>
              </View>
              <View
                style={{
                  ...PDFSaleDetailstyles.tableColHeader,
                  width: "10%",
                }}
              >
                <Text style={PDFSaleDetailstyles.tableCellHeader}>
                  Cantidad
                </Text>
              </View>
              <View
                style={{
                  ...PDFSaleDetailstyles.tableColHeader,
                  width: "30%",
                }}
              >
                <Text style={PDFSaleDetailstyles.tableCellHeader}>
                  Descripción
                </Text>
              </View>
              <View
                style={{
                  ...PDFSaleDetailstyles.tableColHeader,
                  width: "12.5%",
                }}
              >
                <Text style={PDFSaleDetailstyles.tableCellHeader}>
                  Precio Unitario
                </Text>
              </View>
              <View
                style={{
                  ...PDFSaleDetailstyles.tableColHeader,
                  width: "12.5%",
                }}
              >
                <Text style={PDFSaleDetailstyles.tableCellHeader}>
                  Descuento
                </Text>
              </View>
              <View
                style={{
                  ...PDFSaleDetailstyles.tableColHeader,
                  width: "10%",
                }}
              >
                <Text style={PDFSaleDetailstyles.tableCellHeader}>
                  Tax
                </Text>
              </View>
              <View
                style={{
                  ...PDFSaleDetailstyles.tableColHeader,
                  width: "12.5%",
                }}
              >
                <Text style={PDFSaleDetailstyles.tableCellHeader}>
                  Importe Total
                </Text>
              </View>
            </View>

            {items.map((item, index) => (
                <View
                  style={PDFSaleDetailstyles.tableRow}
                  key={index}
                >
                  <View
                    style={{ ...PDFSaleDetailstyles.tableCol, width: "8.5%" }}
                  >
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {index + 1}
                    </Text>
                  </View>
                  <View
                    style={{ ...PDFSaleDetailstyles.tableCol, width: "15%" }}
                  >
                    <Text style={PDFSaleDetailstyles.tableCell}>{getCategoryType(item.category)}</Text>
                  </View>
                  <View
                    style={{ ...PDFSaleDetailstyles.tableCol, width: "10%" }}
                  >
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {item.quantity}
                    </Text>
                  </View>
                  <View
                    style={{ ...PDFSaleDetailstyles.tableCol, width: "30%" }}
                  >
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {item.name}{item.brand ? `(${item.brand})` : ''}: {item.description}
                    </Text>
                  </View>
                  <View
                    style={{ ...PDFSaleDetailstyles.tableCol, width: "12.5%" }}
                  >
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {item.unit_price}
                    </Text>
                  </View>
                  <View
                    style={{ ...PDFSaleDetailstyles.tableCol, width: "12.5%" }}
                  >
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {item.discount}
                    </Text>
                  </View>
                  <View
                    style={{ ...PDFSaleDetailstyles.tableCol, width: "10%" }}
                  >
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {item.tax}
                    </Text>
                  </View>
                  <View
                    style={{ ...PDFSaleDetailstyles.tableCol, width: "12.5%" }}
                  >
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {item.total_item_amount}
                    </Text>
                  </View>
                </View>
                 ))}
          </View>
          

          <View style={PDFSaleDetailstyles.totalSection}>
            <Text style={PDFSaleDetailstyles.totalText}>
              Total: {sale.total}
            </Text>
          </View>

          <Text style={PDFSaleDetailstyles.footer}>Gracias por su compra</Text>
        </Page>
        )
      })}
      </Document>
    </PDFViewer>
  );
};



export default PDFPreview;
