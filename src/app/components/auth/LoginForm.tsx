// src/components/auth/LoginForm.tsx
"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";


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
    <>
      <div >
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="">RUC o Cédula de indentidad</label>
            <input
              type="email"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">iniciar Sesión</button>
          </form>
          <div >
            <h3>¿Aún no eres socio?</h3>
            <p>
              Regístrate <Link href={"/registro"}>aquí</Link>
            </p>
          </div>
        </div>
        <div>
          <Image width={433} height={485} src={"/casco.png"} alt={" "} />
        </div>
      </div>
    </>
  );
}
