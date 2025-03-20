"use client";

import { useState } from "react";
import axios from "axios";
import styles from './olvide-password.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Llamar a la API para generar el token y enviar el correo
      const res = await axios.post("/api/passwords/send", { email });
      setMessage(res.data.message); // Mensaje de éxito o error
    } catch (error: any) {
      setMessage(error.response?.data?.message || "Error al enviar el correo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles['forgot-password-container']}>
      <div className={styles['forgot-password-box']}>
        <h2>Recuperar Contraseña</h2>
        <form className={styles['forgot-password-form']} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles['input-field']}
            />
          </div>
          <button type="submit" disabled={loading} className={styles['submit-button']}>
            {loading ? "Enviando..." : "Enviar Correo de Reset"}
          </button>
        </form>

        {message && <p>{message}</p>}
        <a href="/login" className={styles['back-link']}>Volver al login</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
