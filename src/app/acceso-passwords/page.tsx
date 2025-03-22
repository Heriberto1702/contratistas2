"use client";

import { useState } from "react";
import axios from "axios";
import styles from './olvide-password.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setSuccess(null);

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail.includes("@")) {
      setMessage("⚠️ Ingresa un correo válido.");
      setSuccess(false);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/passwords/send", { email: normalizedEmail });
      setMessage("✅ " + res.data.message);
      setSuccess(true);
      setEmail(""); // Limpiar el campo tras éxito
    } catch (error: any) {
      console.error("Error en API:", error);
      setMessage("❌ " + (error.response?.data?.message || "Error al enviar el correo."));
      setSuccess(false);
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
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading || !email.trim()} 
            className={styles['submit-button']}
          >
            {loading ? "Enviando..." : "Enviar Correo de Reset"}
          </button>
        </form>

        {message && (
          <p className={success ? styles['success-message'] : styles['error-message']}>
            {message}
          </p>
        )}

        <a href="/login" className={styles['back-link']}>Volver al login</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
