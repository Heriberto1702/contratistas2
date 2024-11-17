// src/components/auth/RegisterForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Styles from "./RegisterForm.module.css"; // Importa el CSS modular

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombres_contratista, setName] = useState("");
  const [RUC, setRUC] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/auth/registro", {
      method: "POST",
      body: JSON.stringify({ email, password, nombres_contratista }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) router.push("/login");
  };

  return (
    <form className={Styles.form} onSubmit={handleSubmit}>
      <input className={Styles.input} type="text" value={nombres_contratista} placeholder="Nombre" onChange={(e) => setName(e.target.value)} required />
      <input className={Styles.input}type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
      <input className={Styles.input} type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
      <input className={Styles.input} type="text" value={RUC} placeholder="numero ruc" onChange={(e) => setRUC(e.target.value)} required />
      
      <button className={Styles.button} type="submit">Registro</button>
    </form>
  );
}