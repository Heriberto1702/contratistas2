// InvoiceModal.tsx
import React from 'react';

interface InvoiceModalProps {
  orderDetails: string[];
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ orderDetails, onClose }) => {
  return (
    <div style={modalStyles.overlay}>

      <div style={modalStyles.modal}>

        <h2>Factura Digital SINSA</h2>

        <ul>
          {orderDetails.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
        
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

// Estilos para la ventana modal
const modalStyles = {
  overlay: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default InvoiceModal;