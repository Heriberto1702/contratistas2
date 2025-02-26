"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import styles from "./ComprasContratista.module.css";

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
};

const ComprasContratista = ({ comprasData }: ComprasContratistaProps) => {
  const [detalleCompra, setDetalleCompra] = useState<Compra | null>(null);
  const [rangoInicio, setRangoInicio] = useState<string>("");
  const [rangoFin, setRangoFin] = useState<string>("");

  const abrirDetalleCompra = (compra: Compra) => {
    setDetalleCompra(compra);
  };

  const cerrarPopup = () => {
    setDetalleCompra(null);
  };

  const descargarPDF = () => {
    if (!detalleCompra) return;

    const doc = new jsPDF() as jsPDFWithAutoTable;
    autoTable(doc, {});
    const title = `Detalle de Compra - Factura: ${detalleCompra.ticket_id}`;

    doc.setFontSize(16);
    doc.text(title, 10, 10);
    doc.setFontSize(12);
    doc.text(`Fecha: ${detalleCompra.ticket_date.split("T")[0]}`, 10, 20);
    doc.text(`Tienda: ${detalleCompra.store_name}`, 10, 30);

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
      startY: 40,
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

  return (
    <div className={styles.container}>
      <h1>Historial de Compras</h1>

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
      </div>

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
                  className={styles.button}
                  onClick={() => abrirDetalleCompra(compra)}
                >
                  Abrir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
                        {(producto.amount / parseFloat(producto.quantity)).toFixed(2)}
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
              <button className={styles.downloadButton} onClick={descargarPDF}>
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
      )}
    </div>
  );
};

export default ComprasContratista;
