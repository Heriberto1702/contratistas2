"use client"
import { useEffect, useState } from 'react';
import InvoiceModal from '../InvoiceModal/InvoiceModal'; // Asegúrate de importar el nuevo componente
import Styles from './GoogleSheetData.module.css';
const GoogleSheetData = (
) => {
  const [data, setData] = useState<string[][]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const sheetId = '1n_fQGTIXT5csRoVLrY1DcQJvxQ0F2NXTLEiXwcdzgNU';
      const range = 'Sheet1!A1:E10';  // Ajusta el rango según lo que necesites
      const apiKey = 'AIzaSyB210yENmj64Z2XCUhQ5FjSYzIC8KmlnHA';  // Coloca aquí tu clave de API

      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.values) {
          setData(result.values);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleDetailClick = (order: string[]) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder([]);
  };

  return (
    <div>
      <table className={Styles.tabla}>
        <thead className={Styles.thead}>
          <tr>
            <th>Fecha</th>
            <th>Tienda</th>
            <th>Factura</th>
            <th>Monto</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
              <td>
                <button onClick={() => handleDetailClick(row)}>Abrir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <InvoiceModal orderDetails={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default GoogleSheetData;