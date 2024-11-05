// src/components/auth/RegisterForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/auth/registro", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} placeholder="Nombre" onChange={(e) => setName(e.target.value)} required />
      <input type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Registro</button>
    </form>
  );
}