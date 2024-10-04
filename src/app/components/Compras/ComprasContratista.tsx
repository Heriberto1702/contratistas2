
"use client"; // Este componente se ejecutará en el cliente

import { useState } from 'react';
import styles from './ComprasContratista.module.css'; // Importar estilos

type Producto = {
  nombre: string;
  cantidad: number;
  precio: number;
};

type Compra = {
  fecha: string;
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

  const abrirDetalleCompra = (compra: Compra) => {
    setDetalleCompra(compra);
  };

  return (
    <div className={styles.container}>
      <h1>Historial de Compras</h1>
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
          {comprasData.map((compra, index) => (
            <tr key={index}>
              <td>{compra.fecha}</td>
              <td>{compra.tienda}</td>
              <td>{compra.numeroFactura}</td>
              <td>{compra.monto.toFixed(2)}</td>
              <td>
                <button className={styles.button} onClick={() => abrirDetalleCompra(compra)}>Abrir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {detalleCompra && (
        <div className={styles.detailContainer}>
          <h2>Detalle de Compra - {detalleCompra.numeroFactura}</h2>
          <p>Fecha: {detalleCompra.fecha}</p>
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
                  <td>{(producto.precio * producto.cantidad).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Total: {detalleCompra.monto.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default ComprasContratista;