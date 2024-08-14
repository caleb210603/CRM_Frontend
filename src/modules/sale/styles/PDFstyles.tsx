import { StyleSheet, Text, View } from "@react-pdf/renderer";

export const PDFSaleDetailstyles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#FFF",
      padding: 30,
      fontFamily: "Helvetica",
    },
    logo: {
      width: 50, // Ajustado para ser más prominente
      height: 50, // Mantener la proporción
      marginRight: 10,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center", // Alinea verticalmente el logo con el texto
      marginBottom: 20,
    },
    headerLeft: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start", // Alineación ajustada para empezar desde el borde izquierdo
    },
    headerRight: {
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
    },
    row: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#000",
      borderBottomStyle: "solid",
      alignItems: "center",
      paddingVertical: 1, // Asegúrate de que hay suficiente espacio vertical entre filas
      justifyContent: "space-between", // Distribuye los elementos a lo largo de la fila
    },
    boldText: {
      fontSize: 11,
      fontWeight: "bold",
      marginBottom: 2, // Añade un margen a la derecha para separar los textos
    },
    smallText: {
      fontSize: 11,
      marginBottom: 2, // Añade un margen a la derecha para separar los textos
    },
    footer: {
      position: 'absolute',
      bottom: 30, // Distancia al borde inferior de la página
      left: 30, // Distancia al borde izquierdo de la página
      right: 35, // Distancia al borde derecho de la página
      fontSize: 12,
      textAlign: 'center',
      paddingTop: 10,
      borderTopWidth: 2,
      borderTopStyle: 'solid',
      width: 'calc(100% -60px)',
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
      width: "100%",
      // Añadido para espacio vertical dentro de las filas
    },
    tableColHeader: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      padding: 5, // Aumentado para más espacio dentro de las celdas
      textAlign: "center",
      fontWeight: "bold",
    },
    tableCol: {
      width: "25%",
      borderStyle: "solid",
      borderWidth: 1,
      padding: 5, // Aumentado para más espacio dentro de las celdas
      textAlign: "center",
    },
    tableCellHeader: {
      fontSize: 12,
      fontWeight: "bold",
    },
    tableCell: {
      fontSize: 10,
    },
    table: {
      marginTop: 20,
      width: "100%", // Añadido espacio antes de la tabla
    },
    totalSection: {
      marginTop: 10, // Espacio arriba del total para separarlo de la tabla
      alignItems: "flex-end", // Alineación a la derecha
      marginRight: 30, // Margen derecho para ajustar la posición exacta
    },
    totalText: {
      fontSize: 12, // Tamaño de fuente para el texto del total
      fontWeight: "bold", // Negrita para el texto del total
    },
    watermarkContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1, // Ajusta la transparencia según tus preferencias
    },
    watermarkText: {
      position: 'absolute',
      fontSize: 12,
      color: 'blue', // Cambiado a azul
      transform: 'rotate(-45deg)'// Rotación ajustada para diagonal hacia la derecha
    },
  });


  export const PDFPreviewStyles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#F0F4F8',
      padding: 20, // Aumentar el padding
      justifyContent: 'center', // Centrar contenido horizontalmente
      alignItems: 'flex-start', // Alinear contenido arriba
    },
    container: {
      borderWidth: 2,
      borderColor: '#4d82be', // Cambiar el color del borde a un azul oscuro
      borderRadius: 2, // Aumentar el radio de borde para hacerlo más redondeado
      padding: 20,
      marginBottom: 10,
      width: '100%',
    },
    header: {
      fontSize: 18,
      paddingBottom: 5,
      textAlign: 'center',
      fontFamily: 'Helvetica-Bold',
      color: '#333',
    },
    headerLeft: {
      fontSize: 16,
      paddingBottom: 5,
      paddingTop: 15,
      textAlign: "left",
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
    }
  }); 

  export const Watermark = () => {
    const positions = Array.from({ length: 20 }).map((_, index) => ({
      top: 50 * (index % 20),
      left: 120 * (index % 5)
    }));
  
    return (
      <View style={PDFSaleDetailstyles.watermarkContainer}>
        {positions.map((pos, index) => (
          <Text key={index} style={{ ...PDFSaleDetailstyles.watermarkText, top: pos.top, left: pos.left }}>
            Consigue Ventas
          </Text>
        ))}
      </View>
    );
  };