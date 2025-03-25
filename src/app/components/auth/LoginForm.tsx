"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);  // Iniciar el estado de carga

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);  // Termina el estado de carga

    if (result?.error) {
      setError("Credenciales inválidas. Por favor, verifica tu email y contraseña.");
    } else if (result?.ok) {
      router.push("/");
    }
  };

  return (
    <div className={Styles.container}>
    
      <div className={Styles.formContainer}>
        <div className={Styles.imageWrapper}>
          <Image width={100} height={100} src="/logoContratista.png" alt="Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <label className={Styles.titulos}>Inicio de Sesión</label>
          <input
            className={Styles.input}
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={Styles.input}
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className={Styles.error}>{error}</p>}
         <button className={Styles.button} type="submit" disabled={loading}>
    {loading ? "Cargando..." : "Acceder"}
  </button>

        </form>
        <div className={Styles.registerContainer}>
        <Link className={Styles.subtitulos} href={"/acceso-passwords"}> ¿Has olvidado tu contraseña?</Link>
        </div>
        <div className={Styles.registerContainer}>
          <h3 className={Styles.subtitulos}>¿Aún no eres socio?</h3>
          <p className={Styles.subtitulos}>
             <Link href={"/registro"}> Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
