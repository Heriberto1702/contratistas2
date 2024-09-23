import React from "react";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <header>
        <nav>
          <div>
            <Link href="/">
              <Image
                src="/logoContratista.png"
                alt="logo-Contratista"
                width={182}
                height={119}
              />
            </Link>
          </div>
          <div>
            <Link href="/">Inicio</Link>
            <Link href="/cuenta">Iniciar Sesión</Link>
            <Link href="/cuenta/registro">Registrarse</Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Page;
