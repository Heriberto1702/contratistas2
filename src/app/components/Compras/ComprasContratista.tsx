"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import styles from "./ComprasContratista.module.css";

interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable: any;
  autoTable: (options: any) => void;
}

// Definir los tipos de datos basados en la estructura de JSON que recibes
type Producto = {
  product_name: string;
  product_id: number;
  quantity: number;
  amount: number;
};

type Compra = {
  ticket_id: number;
  ticket_date: string; // Fecha en formato "YYYY-MM-DD"
  store_name: string;
  total_amount: number;
  detail: Producto[];
};

type ComprasContratistaProps = {
  comprasData: Compra[];
};

const ComprasContratista = ({ comprasData }: ComprasContratistaProps) => {
  const [detalleCompra, setDetalleCompra] = useState<Compra | null>(null);
  const [rangoInicio, setRangoInicio] = useState<string>(""); // Fecha de inicio
  const [rangoFin, setRangoFin] = useState<string>(""); // Fecha de fin

  const abrirDetalleCompra = (compra: Compra) => {
    setDetalleCompra(compra);
  };

  const cerrarPopup = () => {
    setDetalleCompra(null);
  };

  const doc = new jsPDF() as jsPDFWithAutoTable;
  const descargarPDF = () => {
    if (!detalleCompra) return;

    const doc = new jsPDF() as jsPDFWithAutoTable;
    autoTable(doc, {});
    const title = `Detalle de Compra - Factura: ${detalleCompra.ticket_id}`;

    // Título y datos principales
    doc.setFontSize(16);
    doc.text(title, 10, 10);
    doc.setFontSize(12);
    doc.text(`Fecha: ${detalleCompra.ticket_date.split("T")[0]}`, 10, 20);
    doc.text(`Tienda: ${detalleCompra.store_name}`, 10, 30);

    // Tabla de productos
    const columns = ["Producto", "Cantidad", "Precio Unitario", "Total"];
    const rows = detalleCompra.detail.map((producto) => [
      producto.product_name,
      producto.product_id,
      producto.quantity,
      `C$${(producto.amount / producto.quantity).toFixed(2)}`, // Precio Unitario
      `C$${producto.amount.toFixed(2)}`, // Total por producto
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 40,
    });

    // Total
    const totalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text(`Total: C$${detalleCompra.total_amount.toFixed(2)}`, 10, totalY);

    // Descargar PDF
    doc.save(`Detalle_Compra_${detalleCompra.ticket_id}.pdf`);
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

      {/* Filtro de fechas */}
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

      {/* Tabla de compras */}
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

      {/* Popup detalle de compra */}
      {detalleCompra && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <button className={styles.closeButton} onClick={cerrarPopup}>
              ×
            </button>
            <h2 className={styles.Detalle}>Detalle de Compra</h2>
            <p className={styles.titulo}>Factura N°: {detalleCompra.ticket_id}</p>
            <p className={styles.titulo}>Fecha: {detalleCompra.ticket_date.split("T")[0]}</p>
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
                        {(producto.amount / producto.quantity).toFixed(2)}
                      </td>
                      <td>{producto.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.totalContainer}>
            <h3 className={styles.total}>Total: C${detalleCompra.total_amount.toFixed(2)}</h3>
            <button className={styles.downloadButton} onClick={descargarPDF}>
              Descargar PDF
            </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default ComprasContratista;
