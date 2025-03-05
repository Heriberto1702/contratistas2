"use client";

import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import styles from "./ComprasContratista.module.css";
import { useSession } from "next-auth/react"; // Importamos useSession

interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable: any;
  autoTable: (options: any) => void;
}

type Producto = {
  product_name: string;
  product_id: number;
  quantity: string;
  amount: number;
};

type Compra = {
  ticket_id: number;
  ticket_date: string;
  store_name: string;
  total_amount: number;
  detail: Producto[];
};

type ComprasContratistaProps = {
  comprasData: Compra[];
  isLoading: boolean; // Agregar isLoading como prop
};

const ComprasContratista = ({
  comprasData,
  isLoading,
}: ComprasContratistaProps) => {
  const [detalleCompra, setDetalleCompra] = useState<Compra | null>(null);
  const [rangoInicio, setRangoInicio] = useState<string>("");
  const [rangoFin, setRangoFin] = useState<string>("");
  const { data: session } = useSession(); // Obtener la sesión del usuario logueado
  const [rucCedula, setRucCedula] = useState<string | null>(null); // Estado para almacenar RUC o Cédula

  const abrirDetalleCompra = (compra: Compra) => {
    setDetalleCompra(compra);
  };

  const cerrarPopup = () => {
    setDetalleCompra(null);
  };
  useEffect(() => {
    const fechaHoy = new Date();
    const inicioMes = new Date(fechaHoy.getFullYear(), fechaHoy.getMonth(), 1); // Primer día del mes
    const finMes = new Date(fechaHoy.getFullYear(), fechaHoy.getMonth() + 1, 0); // Último día del mes

    // Convertir las fechas a formato 'YYYY-MM-DD' para el input tipo date
    setRangoInicio(inicioMes.toISOString().split("T")[0]);
    setRangoFin(finMes.toISOString().split("T")[0]);

    const obtenerRucCedula = async () => {
      if (!session?.user?.email) return;

      try {
        // Llamamos a la API que ya tienes creada
        const response = await fetch("/api/user/data");
        const data = await response.json();

        if (data.ruc || data.cedula) {
          setRucCedula(data.ruc || data.cedula); // Guardamos el RUC o Cédula
        }
      } catch (error) {
        console.error("Error al obtener RUC o Cédula", error);
      }
    };

    obtenerRucCedula();
  }, [session]);

  const descargarPDF = async () => {
    if (!detalleCompra || !rucCedula) return;

    const doc = new jsPDF() as jsPDFWithAutoTable;
    autoTable(doc, {});
    const title = `Detalle de Compra - Factura: ${detalleCompra.ticket_id}`;

    doc.setFontSize(16);
    doc.text(title, 10, 10);
    doc.setFontSize(12);
    doc.text(`Fecha: ${detalleCompra.ticket_date.split("T")[0]}`, 10, 20);
    doc.text(`Tienda: ${detalleCompra.store_name}`, 10, 30);
    doc.text(`RUC/Cédula: ${rucCedula}`, 10, 40);

    const columns = ["Producto", "SKU", "Cantidad", "Precio Unitario", "Total"];
    const rows = detalleCompra.detail.map((producto) => [
      producto.product_name,
      producto.product_id,
      producto.quantity,
      `C$${(producto.amount / parseFloat(producto.quantity)).toFixed(2)}`,
      `C$${producto.amount.toFixed(2)}`,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 45,
    });

    const totalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text(`Total: C$${detalleCompra.total_amount.toFixed(2)}`, 10, totalY);

    doc.save(`Detalle_Compra_${detalleCompra.ticket_id}.pdf`);
  };

  const descargarExcel = async () => {
    if (!detalleCompra) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Detalle Compra");

    // **Estilo para los encabezados**
    const headerStyle = {
      font: { bold: true, color: { argb: "FFFFFF" } }, // Letras blancas
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "0070C0" } }, // Azul
      alignment: { horizontal: "center", vertical: "middle" },
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };

    // **Estilo para las filas de datos**
    const rowStyle = {
      border: {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      },
    };

    // **Encabezado del documento**
    worksheet.addRow(["Factura N°", detalleCompra.ticket_id]);
    worksheet.addRow(["Fecha", detalleCompra.ticket_date.split("T")[0]]);
    worksheet.addRow(["Tienda", detalleCompra.store_name]);
    worksheet.addRow(["RUC/Cédula:", rucCedula]);
    worksheet.addRow([]); // Espacio

    // **Encabezado de la tabla**
    const headerRow = worksheet.addRow([
      "Producto",
      "SKU",
      "Cantidad",
      "Precio Unitario",
      "Total",
    ]);
    headerRow.eachCell((cell) => {
      Object.assign(cell, { style: headerStyle });
    });

    // **Agregar los productos**
    detalleCompra.detail.forEach((producto, index) => {
      // Agregar las filas con valores
      const productRow = worksheet.addRow([
        producto.product_name,
        producto.product_id,
        ` ${producto.quantity}`,
        producto.amount / parseFloat(producto.quantity), // Precio Unitario con C$
        producto.amount, // Total con C$
      ]);

      // Aplicar estilo a las filas de productos
      productRow.eachCell((cell) => {
        Object.assign(cell, { style: rowStyle });
      });

      // Alternar colores de fondo en las filas de productos para mejorar la legibilidad
      if (index % 2 === 0) {
        productRow.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "F2F2F2" },
          }; // Gris claro
        });
      }
    });

    worksheet.addRow([]); // Espacio

    // **Fila de total**
    const totalRow = worksheet.addRow([
      "Total",
      "",
      "",
      "",
      detalleCompra.total_amount,
    ]);
    totalRow.eachCell((cell) => {
      Object.assign(cell, {
        style: { font: { bold: true }, alignment: { horizontal: "right" } },
      });
      // Aplicar formato de moneda a la celda de total
      cell.numFmt = '"C$"#,##0.00'; // Formato de moneda
    });

    // **Ajustar ancho de columnas automáticamente**
    worksheet.columns = [
      { width: 30 }, // Producto
      { width: 15 }, // SKU
      { width: 10 }, // Cantidad
      { width: 20 }, // Precio Unitario
      { width: 20 }, // Total
    ];

    // **Ajustar altura de las filas del encabezado**
    worksheet.getRow(1).height = 25; // Factura N°
    worksheet.getRow(2).height = 25; // Fecha
    worksheet.getRow(3).height = 25; // Tienda
    worksheet.getRow(4).height = 25; // Espacio
    worksheet.getColumn("D").numFmt = '"C$"#,##0.00'; // Formato de moneda
    worksheet.getColumn("E").numFmt = '"C$"#,##0.00'; // Formato de moneda
    // **Descargar el archivo**
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `Detalle_Compra_${detalleCompra.ticket_id}.xlsx`);
  };

  const comprasFiltradas = comprasData.filter((compra) => {
    if (rangoInicio && rangoFin) {
      return (
        compra.ticket_date >= rangoInicio && compra.ticket_date <= rangoFin
      );
    }
    return true;
  });
  const descargarResumenPDF = async () => {
    if (!comprasFiltradas) return;

    const docresumen = new jsPDF() as jsPDFWithAutoTable;
    autoTable(docresumen, {});
    const title = `Resumen de compras`;

    docresumen.setFontSize(16);
    docresumen.text(title, 10, 10);
    docresumen.setFontSize(12);

    const columns = ["Fecha", "Tienda", "Numero de Factura", "Monto"];
    const rows = comprasFiltradas.map((compra) => [
      compra.ticket_date.split("T")[0],
      compra.store_name,
      compra.ticket_id,
      `C$${compra.total_amount.toFixed(2)}`,
    ]);

    docresumen.autoTable({
      head: [columns],
      body: rows,
    });

    // Calcular el total global
    const totalGlobal = comprasFiltradas.reduce(
      (acc, compra) => acc + compra.total_amount,
      0
    );

    // Formatear el total global con comas como separador de miles
    const totalGlobalFormateado = new Intl.NumberFormat("es-ES").format(
      Number(totalGlobal.toFixed(2))
    );

    // Agregar el total global formateado al final del PDF
    docresumen.text(
      `Total Global: C$${totalGlobalFormateado}`,
      10,
      docresumen.lastAutoTable.finalY + 10
    );

    // Guardar el PDF
    docresumen.save(`Resumen_Compras.pdf`);
  };

  return (
    <div className={styles.container}>
      <p className={styles.titlepage}>Historial de Compras</p>

      <div className={styles.filterContainer}>
        <label>
          De:
          <input
            type="date"
            value={rangoInicio}
            onChange={(e) => setRangoInicio(e.target.value)}
          />
        </label>
        <label>
          Hasta:
          <input
            type="date"
            value={rangoFin}
            onChange={(e) => setRangoFin(e.target.value)}
          />
        </label>
        <button className={styles.downloadButton} onClick={descargarResumenPDF}>
          Generar Reporte
        </button>
      </div>
      {isLoading ? (
        <div className={styles.loadingMessage}>Cargando datos</div>
      ) : comprasFiltradas.length === 0 ? (
        <div className={styles.noComprasMessage}>Sin registros de compras.</div>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tienda</th>
                <th>Número de Factura</th>
                <th>Monto</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {comprasFiltradas.map((compra, index) => (
                <tr key={index}>
                  <td>{compra.ticket_date.split("T")[0]}</td>
                  <td>{compra.store_name}</td>
                  <td>{compra.ticket_id}</td>
                  <td>{compra.total_amount.toFixed(2)}</td>
                  <td>
                    <button
                      className={styles.downloadButton}
                      onClick={() => abrirDetalleCompra(compra)}
                    >
                      Abrir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {detalleCompra && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <button className={styles.closeButton} onClick={cerrarPopup}>
              ×
            </button>
            <h2 className={styles.Detalle}>Detalle de Compra</h2>
            <p className={styles.titulo}>
              Factura N°: {detalleCompra.ticket_id}
            </p>
            <p className={styles.titulo}>
              Fecha: {detalleCompra.ticket_date.split("T")[0]}
            </p>
            <p className={styles.titulo}>Tienda: {detalleCompra.store_name}</p>

            <div className={styles.detailTableContainer}>
              <table className={styles.detailTable}>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>SKU</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {detalleCompra.detail.map((producto, index) => (
                    <tr key={index}>
                      <td>{producto.product_name}</td>
                      <td>{producto.product_id}</td>
                      <td>{producto.quantity}</td>
                      <td>
                        {(
                          producto.amount / parseFloat(producto.quantity)
                        ).toFixed(2)}
                      </td>
                      <td>{producto.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.totalContainer}>
              <h3 className={styles.total}>
                Total: C${detalleCompra.total_amount.toFixed(2)}
              </h3>
              <div className={styles.downloadButtons}>
                <button
                  className={styles.downloadButton}
                  onClick={descargarPDF}
                >
                  Descargar PDF
                </button>
                <button
                  className={styles.downloadButton}
                  onClick={descargarExcel}
                >
                  Descargar Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComprasContratista;
