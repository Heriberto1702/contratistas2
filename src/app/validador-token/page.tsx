"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./ResetPasswordPage.module.css";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // 🔹 Evitar pre-rendering SSR usando useState + useEffect
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(searchParams.get("token"));
  }, [searchParams]); // Se ejecuta solo en el cliente

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);

  // 🔹 1. Verificar el token al cargar la página
  useEffect(() => {
    if (token) {
      fetch(`/api/passwords/receive?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.valid) {
            setTokenValid(true);
          } else {
            setMessage("El token no es válido o ha expirado.");
          }
        })
        .catch(() => setMessage("Error al validar el token."));
    }
  }, [token]);

  // 🔹 2. Enviar la nueva contraseña
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/passwords/receive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();
    setLoading(false);
    setMessage(data.message);

    if (res.ok) {
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Restablecer contraseña</h2>
        {message && (
          <p
            className={`${styles.message} ${
              tokenValid ? styles.success : styles.error
            }`}
          >
            {message}
          </p>
        )}
        {tokenValid ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Nueva contraseña:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Confirmar contraseña:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <button
              type="submit"
              className={`${styles.button} ${loading ? styles.disabled : ""}`}
              disabled={loading}
            >
              {loading ? "Procesando..." : "Restablecer contraseña"}
            </button>
          </form>
        ) : (
          <p className={styles.error}>{message}</p>
        )}
      </div>
    </div>
  );
}
