"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import Styles from "./NavBar.module.css";

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const getUserName = (name: string | undefined) => {
    if (!name) return "Usuario";
    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[1] || "";
    return `${firstName} ${lastName}`.trim();
  };

  const handleClickOutside = (e: MouseEvent) => {
    const drawer = drawerRef.current;
    const target = e.target as Node;
  
    if (
      drawer &&
      !drawer.contains(target) &&
      !(e.target as HTMLElement).closest(`.${Styles.hamburger}`)
    ) {
      setMenuOpen(false);
      setDropdownOpen(false);
    }
  };
  

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const menuLinks = [
    { href: "/", label: "Inicio" },
    { href: "/compras", label: "Compras" },
    { href: "/academia", label: "Academia" },
    { href: "/documentosutiles", label: "Documentos" },
    { href: "/beneficios", label: "Beneficios" },
    { href: "/galeria", label: "Galería" },
  ];

  return (
    <header className={Styles.header}>
      <nav className={Styles.nav}>
        <div className={Styles.logoContainer}>
          <Link href="/">
            <Image
              src="/logoContratista.png"
              alt="logo-Contratista"
              width={182}
              height={119}
            />
          </Link>
        </div>

        <button
          className={Styles.hamburger}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className={menuOpen ? Styles.topOpen : ""}></span>
          <span className={menuOpen ? Styles.middleOpen : ""}></span>
          <span className={menuOpen ? Styles.bottomOpen : ""}></span>
        </button>

        <div
          ref={drawerRef}
          className={`${Styles.menuDrawer} ${
            menuOpen ? Styles.menuDrawerOpen : ""
          }`}
        >
          {menuLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`${Styles.hipervinculo} ${
                pathname === href ? Styles.activeLink : ""
              }`}
            >
              {label}
            </Link>
          ))}

          {session ? (
            <div className={Styles.profileDropdown}>
              <button
                className={Styles.userButton}
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={dropdownOpen ? "true" : "false"}
              >
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
                {getUserName(session.user?.name)}
              </button>

              {dropdownOpen && (
                <div className={Styles.dropdownMenu}>
                  <button
                    className={Styles.logoutButton}
                    onClick={() => (window.location.href = "/usuario")}
                  >
                    Ver mis datos
                  </button>
                  <button
                    className={`${Styles.logoutButton} ${Styles.rojo}`}
                    onClick={() => signOut()}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              className={`${Styles.hipervinculo} ${
                pathname === "/login" ? Styles.activeLink : ""
              }`}
              href="/login"
              onClick={() => setMenuOpen(false)}
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
