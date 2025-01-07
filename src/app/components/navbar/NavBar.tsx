"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Styles from "./NavBar.module.css";

const NavBar: React.FC = () => {
  const { data: session } = useSession(); // Obtener la sesión actual
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controlar el estado del dropdown
  const [menuOpen, setMenuOpen] = useState(false); // Controlar el estado del menú de hamburguesa

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={Styles.header}>
      <nav className={Styles.nav}>
        {/* Logo */}
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

        {/* Botón de menú de hamburguesa */}
        <button
          className={Styles.hamburger}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menú principal */}
        <div className={`${Styles.menu} ${menuOpen ? Styles.open : ""}`}>
          <Link className={Styles.a} href="/compras">
            Compras
          </Link>
          <Link className={Styles.a} href="/academia">
            Academia
          </Link>
          <Link className={Styles.a} href="/documentosutiles">
            Documentos
          </Link>
          <Link className={Styles.a} href="/galeria">
            Galería
          </Link>

          {/* Dropdown del perfil de usuario */}
          {session ? (
            <div className={Styles.profileDropdown}>
              <button className={Styles.userButton} onClick={toggleDropdown}>
                <div className={Styles.avatarContainer}>
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Avatar"
                      width={40}
                      height={40}
                      className={Styles.avatar}
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="#555"
                      viewBox="0 0 24 24"
                      className={Styles.avatarFallback}
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  )}
                </div>

                {/* Mostrar solo el primer nombre y primer apellido */}
                {session.user?.name
                  ? (() => {
                      const nameParts = session.user.name.split(" ");
                      const firstName = nameParts[0]; // Primer nombre
                      const lastName = nameParts[1] || ""; // Primer apellido (si existe)
                      return `${firstName} ${lastName}`.trim(); // Concatenar y eliminar espacios extra
                    })()
                  : "Usuario"}
              </button>

              {/* Opciones del dropdown */}
              {dropdownOpen && (
                <div className={Styles.dropdownMenu}>
                  <button
                    className={Styles.logoutButton}
                    onClick={() => (window.location.href = "/datos")}
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
