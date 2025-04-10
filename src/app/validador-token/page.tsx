"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./ResetPasswordPage.module.css";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) {
      setMessage("Token inválido o expirado.");
      setTokenValid(false);
      return;
    }

    const validateToken = async () => {
      try {
        const res = await fetch(`/api/usuario/passwords/receive?token=${token}`);
        const data = await res.json();

        if (res.ok && data.valid) {
          setTokenValid(true);
        } else {
          setMessage("El token no es válido o ha expirado.");
          setTokenValid(false);
          setTimeout(() => router.push("/olvide-password"), 3000);
        }
      } catch (error) {
        setMessage("Error al validar el token.");
        setTokenValid(false);
      }
    };

    validateToken();
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/usuario/passwords/receive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      setMessage(data.message);
      if (res.ok) {
        setTimeout(() => router.push("/login"), 3000);
      }
    } catch (error) {
      setMessage("Error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Restablecer contraseña</h2>
        {message && <p className={tokenValid ? styles.success : styles.error}>{message}</p>}
        
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
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Procesando..." : "Restablecer contraseña"}
            </button>
          </form>
        ) : tokenValid === false ? (
          <p className={styles.error}>Redirigiendo a la recuperación de contraseña...</p>
        ) : (
          <p className={styles.error}>Cargando...</p>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
