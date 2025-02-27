"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NavBar from "../components/navbar/NavBar";
import styles from "./membresia.module.css";
import Link from "next/link";

interface UserData {
  nombres_contratista: string;
  nombre_club: string;
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
    return <div>Cargando...</div>;
  }

  return (
    <>
      <NavBar />
      <div className={styles.userdashboard}>
        {/* Columna Izquierda */}
        <div className={styles.userinfo}>
          
          
          <div className="flex items-center gap-2 mb-4">
            <Image src="/cuenta/user.png" width={40} height={40} alt="User Icon" />
            <div>
              <p className="font-bold">Bienvenido:</p>
              <p>{userData?.nombres_contratista || "Cargando..."}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Image src="/cuenta/cuentalogo.png" width={40} height={40} alt="Club Icon" />
            <div>
              <p className="font-bold">Nivel Contratista</p>
              <p>{userData?.nombre_club || "Cargando..."}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Image src="/cuenta/config.png" width={40} height={40} alt="Settings Icon" />
            <div>
              <p className="font-bold">Configuración</p>
              <Link href="/usuario/datos">Revisar mis datos</Link>
            </div>
          </div>

          {/* Banner inferior */}
          <div className={styles.academiabanner}>Academia para Contratistas</div>
        </div>

        {/* Columna Derecha */}
        <div className={styles.usercard}>
          <Image src="/cuenta/TarjetaContratista.png" width={120} height={80} alt="Tarjeta Contratista" />
          <p>{userData?.nombres_contratista}</p>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
