"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NavBar from "../components/navbar/NavBar";
import styles from "./membresia.module.css";
import UserProfileForm from "../components/UserProfileForm/UserProfileForm";

interface UserData {
  nombres_contratista: string;
  nombre_club: string;
  ruc: string;
  cedula: string;
}

const UserDashboard = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/contratistaLogueado");
        const data = await response.json();
        if (data && data.length > 0) {
          setUserData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  if (loading) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  return (
    <>
      <NavBar />
      <div className={styles.dashboardContainer}>
        {/* Columna Izquierda */}
        <div className={styles.leftColumn}>
          {/* Banner Superior */}
          <div className={styles.academiabanner}>Datos del Contratista</div>

          <div className={styles.infoContainer}>
            {/* Sección de Bienvenida y Nivel Contratista */}
            <div className={styles.welcomeSection}>
              <div className={styles.welcomeText}>
                <div className={styles.espacio}>
                  <Image
                    src="/cuenta/user.png"
                    width={40}
                    height={40}
                    alt="user"
                  />
                  <h2 className={styles.texto}>Bienvenido: </h2>
                  <p className={styles.welcomeText}>{userData?.nombres_contratista || "Cargando..."}</p>
                </div>
                <div className={styles.espacio}>
                  <Image
                    src="/cuenta/cuentalogo.png"
                    width={40}
                    height={40}
                    alt="user"
                  />
                  <h2 className={styles.texto}>Nivel Contratista: </h2>
                  <p className={styles.welcomeText}>{userData?.nombre_club || "Cargando..."}</p>
                </div>
                {/* RUC / Cédula debajo del nivel del contratista */}
                <div className={styles.espacio}>
                <Image
                    src="/cuenta/id2.png"
                    width={40}
                    height={40}
                    alt="user"
                  />
                  <h2 className={styles.texto}>RUC / Cédula: </h2>
                  <p className={styles.welcomeText}>{userData?.ruc || userData?.cedula || "Cargando..."}</p>
                </div>
              </div>
            </div>
            <br></br>
            {/* Tarjeta de Membresía - Movida abajo */}
            <div className={styles.membershipCard}>
              <Image
                src="/cuenta/Membresia.png"
                width={300}
                height={170}
                alt="Tarjeta Contratista"
              />
              <span className={styles.cardName}>{userData?.nombres_contratista}</span>
            </div>
          </div>
        </div>

        {/* Columna Derecha - Formulario */}
        <div className={styles.rightColumn}>
          <UserProfileForm />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
