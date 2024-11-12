// src/components/auth/LoginForm.tsx
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Styles from "./LoginForm.module.css"; // Importa el CSS modular

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.ok) router.push("/");
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <label>Ingrese los siguientes datos:</label>
          <input className={Styles.input}
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input className={Styles.input}
           type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={Styles.button} type="submit">Iniciar Sesión</button>
        </form>
        <div className={Styles.registerContainer}>
          <h3>¿Aún no eres socio?</h3>
          <p>
            Regístrate <Link href={"/registro"}>aquí</Link>
          </p>
        </div>
      </div>
      <div className={Styles.imageContainer}>
        <Image className={Styles.imagen} width={433} height={485} src={"/casco.png"} alt={" "} />
      </div>
    </div>
  );
}
