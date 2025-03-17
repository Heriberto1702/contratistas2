import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import useCatalogosStore from "../../store/useUserDataStore"; // Importamos el store de zustand
import Image from "next/image";
import styles from "./UserProfileForm.module.css";

interface FormData {
  nombres_contratista: string;
  apellidos_contratista: string;
  cedula: string;
  ruc: string;
  celular: string;
  telefono_fijo: string;
  email: string;
  fecha_nacimiento: string;
  id_sexo: string;
  id_especialidad: string;
  id_departamento: string;
  id_municipio: string;
  id_tipo_contratista: number;
}

const UserProfileForm = () => {
  const { data: session, status } = useSession();
  const {
    departamentos,
    municipios,
    especialidades,
    sexos,
    userData,
    setUserData,
    loading,
    setLoading,
    isLoaded,
    setCatalogosData,
    setIsLoaded,
  } = useCatalogosStore(); // Usamos el store de zustand para obtener los catálogos y datos del usuario

  const [formData, setFormData] = useState<FormData>({
    nombres_contratista: "",
    apellidos_contratista: "",
    cedula: "",
    ruc: "",
    celular: "",
    telefono_fijo: "",
    email: "",
    fecha_nacimiento: "",
    id_sexo: "",
    id_especialidad: "",
    id_departamento: "",
    id_municipio: "",
    id_tipo_contratista: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (session && !loading && !isLoaded) {
        try {
          setLoading(true);

          // Realizamos la llamada a la API para obtener los datos del usuario y los catálogos
          const response = await axios.get("/api/user/data");
          const { user, catalogos } = response.data;

          // Establecemos los datos de usuario en el estado global de zustand
          setUserData(user);
          setCatalogosData(catalogos);

          setIsLoaded(true); // Indicamos que los datos se han cargado correctamente
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (!isLoaded && !loading) {
      fetchData();
    }
  }, [session, isLoaded, setUserData, setCatalogosData, loading, setLoading, setIsLoaded]);

  useEffect(() => {
    if (userData) {
      // Llenamos los datos del formulario si los datos de usuario están disponibles en Zustand
      setFormData({
        nombres_contratista: userData.nombres_contratista || "",
        apellidos_contratista: userData.apellidos_contratista || "",
        cedula: userData.cedula || "",
        ruc: userData.ruc || "",
        celular: userData.celular || "",
        telefono_fijo: userData.telefono_fijo || "",
        email: userData.email || "",
        fecha_nacimiento: userData.fecha_nacimiento || "",
        id_sexo: String(userData.id_sexo || ""),
        id_especialidad: String(userData.id_especialidad || ""),
        id_departamento: String(userData.id_departamento || ""),
        id_municipio: String(userData.id_municipio || ""),
        id_tipo_contratista: userData.id_tipo_contratista || 1,
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put("/api/user/update", formData);
      alert("Perfil actualizado exitosamente");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Hubo un problema actualizando el perfil");
    }
  };

  if (status === "loading" || loading || !isLoaded || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Columna Izquierda */}
      <div className={styles.leftColumn}>
        <div className={styles.academiabanner}>Datos del Contratista</div>
        <div className={styles.infoContainer}>
          <div className={styles.welcomeSection}>
            <div className={styles.welcomeText}>
              <div className={styles.espacio}>
                <Image src="/cuenta/user.png" width={40} height={40} alt="user" />
                <h2 className={styles.texto}>Bienvenido: </h2>
                <p className={styles.welcomeText}>{userData?.nombres_contratista || "Cargando..."}</p>
              </div>
              <div className={styles.espacio}>
                <Image src="/cuenta/cuentalogo.png" width={40} height={40} alt="user" />
                <h2 className={styles.texto}>Nivel Contratista: </h2>
                <p className={styles.welcomeText}>{userData?.nombre_club || "Cargando..."}</p>
              </div>
              <div className={styles.espacio}>
                <Image src="/cuenta/id2.png" width={40} height={40} alt="user" />
                <h2 className={styles.texto}>RUC / Cédula: </h2>
                <p className={styles.welcomeText}>{userData?.ruc || userData?.cedula || "Cargando..."}</p>
              </div>
            </div>
          </div>
          <br />
          <div className={styles.membershipCard}>
            <Image src="/cuenta/Membresia.png" width={300} height={170} alt="Tarjeta Contratista" />
            <span className={styles.cardName}>{userData?.nombres_contratista}</span>
          </div>
        </div>
      </div>

      {/* Columna Derecha - Formulario */}
      <div className={styles.rightColumn}>
        <form onSubmit={handleSubmit} className={styles.container}>
          <h2 className={styles.formTitle}>Editar mis datos</h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Nombres:</label>
              <input
                type="text"
                name="nombres_contratista"
                value={formData.nombres_contratista}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Apellidos:</label>
              <input
                type="text"
                name="apellidos_contratista"
                value={formData.apellidos_contratista}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Celular:</label>
              <input
                type="text"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Teléfono fijo:</label>
              <input
                type="text"
                name="telefono_fijo"
                value={formData.telefono_fijo}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Correo:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Fecha de nacimiento:</label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Sexo:</label>
              <select
                name="id_sexo"
                value={formData.id_sexo}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">Seleccione</option>
                {sexos?.map((sexo) => (
                  <option key={sexo.id_sexo} value={sexo.id_sexo}>
                    {sexo.sexo}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Tipo de contratista:</label>
              <select
                name="id_tipo_contratista"
                value={formData.id_tipo_contratista}
                onChange={handleChange}
                className={styles.select}
              >
                <option value={1}>Persona Natural</option>
                <option value={2}>Persona Jurídica</option>
              </select>
            </div>

            <button type="submit" className={styles.submitBtn}>
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
