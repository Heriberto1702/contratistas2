"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface jsPDFWithAutoTable extends jsPDF {
  lastAutoTable: any;
  autoTable: (options: any) => void;
}
import styles from "./ComprasContratista.module.css";

type Producto = {
  nombre: string;
  cantidad: number;
  precio: number;
};

type Compra = {
  fecha: string; // Se asume que es en formato "YYYY-MM-DD"
  tienda: string;
  numeroFactura: string;
  monto: number;
  productos: Producto[];
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
    const title = `Detalle de Compra - Factura: ${detalleCompra.numeroFactura}`;

    // Título y datos principales
    doc.setFontSize(16);
    doc.text(title, 10, 10);
    doc.setFontSize(12);
    doc.text(`Fecha: ${detalleCompra.fecha}`, 10, 20);
    doc.text(`Tienda: ${detalleCompra.tienda}`, 10, 30);

    // Tabla de productos
    const columns = ["Producto", "Cantidad", "Precio Unitario", "Total"];
    const rows = detalleCompra.productos.map((producto) => [
      producto.nombre,
      producto.cantidad,
      `$${producto.precio.toFixed(2)}`,
      `$${(producto.precio * producto.cantidad).toFixed(2)}`,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 40,
    });

    // Total
    const totalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text(`Total: $${detalleCompra.monto.toFixed(2)}`, 10, totalY);

    // Descargar PDF
    doc.save(`Detalle_Compra_${detalleCompra.numeroFactura}.pdf`);
  };

  const comprasFiltradas = comprasData.filter((compra) => {
    if (rangoInicio && rangoFin) {
      return compra.fecha >= rangoInicio && compra.fecha <= rangoFin;
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
              <td>{compra.fecha}</td>
              <td>{compra.tienda}</td>
              <td>{compra.numeroFactura}</td>
              <td>{compra.monto.toFixed(2)}</td>
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
            <h2>Detalle de Compra - {detalleCompra.numeroFactura}</h2>
            <p>Fecha: {detalleCompra.fecha}</p>
            <p>Tienda: {detalleCompra.tienda}</p>
            <table className={styles.detailTable}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {detalleCompra.productos.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.nombre}</td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.precio.toFixed(2)}</td>
                    <td>
                      {(producto.precio * producto.cantidad).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total: {detalleCompra.monto.toFixed(2)}</h3>
            <button className={styles.downloadButton} onClick={descargarPDF}>
              Descargar PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComprasContratista;
