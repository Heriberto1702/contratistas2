import { useState } from 'react';
import styles from './css/AddUserRole.module.css';

const AgregarUsuario = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/usuario/agregarusuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });

      if (response.ok) {
        alert('Rol de usuario agregado exitosamente');
        setEmail('');
        setRole('');
      } else {
        alert('Error al agregar rol de usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Rol:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={styles.select}
          required
        >
          <option value="">Selecciona un rol</option>
          <option value="ADMIN">Admin</option>
          {/* Puedes agregar más roles aquí */}
        </select>
      </div>
      <button type="submit" className={styles.button}>
        Agregar Rol
      </button>
    </form>
  );
};

export default AgregarUsuario;
