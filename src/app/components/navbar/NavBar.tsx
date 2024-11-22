"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Styles from "./NavBar.module.css";

const NavBar: React.FC = () => {
  const { data: session } = useSession(); // Obtener la sesión actual
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controlar el estado del dropdown

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className={Styles.header}>
      <nav className={Styles.nav}>
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
        <div className={Styles.menu}>
          <Link className={Styles.a} href="/compras">
            Compras
          </Link>
          <Link className={Styles.a} href="/academia">
            Academia para Contratistas
          </Link>
          <Link className={Styles.a} href="/documentosutiles">
            Documentos útiles
          </Link>
          <Link className={Styles.a} href="/galeria">
            Galería
          </Link>

          {/* Mostrar avatar y dropdown si está logueado */}
          {session ? (
            <div className={Styles.profileDropdown}>
              <button
                className={Styles.userButton}
                onClick={handleDropdownToggle}
              >
                {/* Mostrar avatar o imagen del usuario */}
                <div className={Styles.avatarContainer}>
                  {session.user?.image ? (
                    <Image
                      src={session.user?.image}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className={Styles.avatar}
                    />
                  ) : (
                    <div className={Styles.avatarFallback}>
                      {" "}
                      {/* Avatar por defecto */}
                      {/* Si no tiene imagen de perfil, no muestra inicial */}
                    </div>
                  )}
                </div>
                {session.user?.name}{" "}
                {/* Mostrar el nombre completo del usuario */}
              </button>
              {dropdownOpen && (
                <div className={Styles.dropdownMenu}>
                  <button
                     className={Styles.logoutButton}
                    onClick={() => window.location.href = '/datos'}
                  >
                    Cuenta
                  </button>
                  <button
                    className={Styles.logoutButton}
                    onClick={() => signOut()}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link className={Styles.a} href="/login">
              Iniciar sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
