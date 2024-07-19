import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Image,
  Font,
  Link,
} from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import { useFetchSaleDetail } from "../hooks/useFetchSaleDetail";
import { PDFSaleDetailstyles, Watermark } from "../styles/PDFstyles";
import { getPaymentType } from "@/enums/paymentType";
import { getCategoryType } from "@/enums/categoryType";

Font.register({
  family: "Helvetica",
  src: "https://fonts.gstatic.com/s/helvetica/v9/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

interface SaleDetailParams extends Record<string, string | undefined> {
  saleID: string;
}


const PDFSaleDetail = () => {
  const { saleID } = useParams<SaleDetailParams>();
  useTitle(`Venta #${saleID}`);
  const { sales, isLoading, error } = useFetchSaleDetail(saleID ?? "");

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los detalles de la venta: {error.message}</div>;
  }

  if (!sales || sales.length === 0) {
    return <div>No se encontraron detalles para esta venta.</div>;
  }

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={PDFSaleDetailstyles.page}>
          <Watermark/>
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
              <Text style={PDFSaleDetailstyles.smallText}>R.U.C. 123456789</Text>
              <Text style={PDFSaleDetailstyles.smallText}>Teléfono: 949-914-249</Text>
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
                Cliente: {sales[0].sales.customer.name}{" "}
                {sales[0].sales.customer.lastname}
              </Text>
              <Text style={PDFSaleDetailstyles.smallText}>
                Celular: {sales[0].sales.customer.phone}
              </Text>
            </View>
            <View style={PDFSaleDetailstyles.row}>
              <Text style={PDFSaleDetailstyles.smallText}>
                Dirección: {sales[0].sales.customer.address}
              </Text>
              <Text style={PDFSaleDetailstyles.smallText}>
                Tipo de Pago: {getPaymentType(sales[0].sales.paymentType)}
              </Text>
            </View>
            <View style={PDFSaleDetailstyles.row}>
              <Text style={PDFSaleDetailstyles.smallText}>
                DNI: {sales[0].sales.customer.document_number}
              </Text>
            </View>
            <View style={PDFSaleDetailstyles.row}>
              <Text style={PDFSaleDetailstyles.smallText}>Fecha: {sales[0].sales.date}</Text>
            </View>
          </View>
          {/*Encabezados de la tabla */}
          <View style={PDFSaleDetailstyles.table}>
            <View style={PDFSaleDetailstyles.tableRow}>
              <View style={{ ...PDFSaleDetailstyles.tableColHeader, width: "8.5%" }}>
                <Text style={PDFSaleDetailstyles.tableCellHeader}>Item</Text>
              </View>
              <View style={{ ...PDFSaleDetailstyles.tableColHeader, width: "15%" }}>
                <Text style={PDFSaleDetailstyles.tableCellHeader}>Categoria</Text>
              </View>
              <View style={{ ...PDFSaleDetailstyles.tableColHeader, width: "10%" }}>
                <Text style={PDFSaleDetailstyles.tableCellHeader}>Cantidad</Text>
              </View>
              <View style={{ ...PDFSaleDetailstyles.tableColHeader, width: "30%" }}>
                <Text style={PDFSaleDetailstyles.tableCellHeader}>Descripción</Text>
              </View>
              <View style={{ ...PDFSaleDetailstyles.tableColHeader, width: "12.5%" }}>
                <Text style={PDFSaleDetailstyles.tableCellHeader}>Precio Unitario</Text>
              </View>
              <View style={{ ...PDFSaleDetailstyles.tableColHeader, width: "12.5%" }}>
                <Text style={PDFSaleDetailstyles.tableCellHeader}>Descuento</Text>
              </View>
              <View style={{ ...PDFSaleDetailstyles.tableColHeader, width: "10%" }}>
                <Text style={PDFSaleDetailstyles.tableCellHeader}>Tax</Text>
              </View>
              <View style={{ ...PDFSaleDetailstyles.tableColHeader, width: "12.5%" }}>
                <Text style={PDFSaleDetailstyles.tableCellHeader}>Importe Total</Text>
              </View>
            </View>
            {/*Uso flatMap para evitar le repetición de la enumeración en Item*/}
            {sales?.flatMap((sale, index) => [
              sale.productData ? (
                <View style={PDFSaleDetailstyles.tableRow} key={`product-${index}`}>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "8.5%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>{index + 1}</Text>
                  </View>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "15%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>{getCategoryType(sale.productData.product.category)}</Text>
                  </View>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "10%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {sale.productData.quantity}
                    </Text>
                  </View>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "30%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {`${sale.productData.product.name} (${sale.productData.product.brand}): ${sale.productData.product.description}`}
                    </Text>
                  </View>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "12.5%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {sale.productData.unit_price}
                    </Text>
                  </View>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "12.5%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {sale.productData.discount}
                    </Text>
                  </View>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "10%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {sale.productData.tax}
                    </Text>
                  </View>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "12.5%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {sale.productData.total_item_amount}
                    </Text>
                  </View>
                </View>
              ) : null,
              sale.serviceData ? (
                <View style={PDFSaleDetailstyles.tableRow} key={`service-${index}`}>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "8.5%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>{index + 1}</Text>
                  </View>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "15%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>{getCategoryType(sale.serviceData.service.category)}</Text>
                  </View>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "10%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {sale.serviceData.quantity}
                    </Text>
                  </View>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "30%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {`${sale.serviceData.service.name}: ${sale.serviceData.service.description}`}
                    </Text>
                  </View>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "12.5%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {sale.serviceData.unit_price}
                    </Text>
                  </View>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "12.5%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {sale.serviceData.discount}
                    </Text>
                  </View>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "10%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {sale.serviceData.tax}
                    </Text>
                  </View>
                  <View style={{...PDFSaleDetailstyles.tableCol , width: "12.5%" }}>
                    <Text style={PDFSaleDetailstyles.tableCell}>
                      {sale.serviceData.total_item_amount}
                    </Text>
                  </View>
                </View>
              ) : null,
            ])}
          </View>

          <View style={PDFSaleDetailstyles.totalSection}>
            <Text style={PDFSaleDetailstyles.totalText}>Total: {sales[0].sales.total}</Text>
          </View>

          <Text style={PDFSaleDetailstyles.footer}>Gracias por su compra</Text>
        </Page>
      </Document>
    </PDFViewer>
  );
};


export default PDFSaleDetail;
