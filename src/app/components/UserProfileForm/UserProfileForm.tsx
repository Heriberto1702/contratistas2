import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import useCatalogosStore from "../../store/useUserDataStore"; // Importamos el store de zustand
import Image from "next/image";
import styles from "./UserProfileForm.module.css";

interface FormData {
  id_contratista: number;
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
  id_tipo_contratista: string;
}

const UserProfileForm = () => {
  const { data: session, status } = useSession();
  const {
    userData,
    fetchUserData,
    loading,
    isLoaded,
    especialidades,
    departamentos,
    municipios,
    sexos,
  } = useCatalogosStore(); // Asegúrate de tener los catálogos en el store de Zustand
  const [formData, setFormData] = useState<FormData>({
    id_contratista: Number(session?.user.id_contratista) || 0,
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
    id_tipo_contratista: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (session && !loading && !isLoaded) {
        console.log("Datos no cargados en Zustand, llamando a fetchUserData...");
        await fetchUserData(); // Cargamos los datos desde el store de Zustand
      } else {
        console.log("Datos ya están cargados en Zustand, no se realiza llamada API.");
      }
    };

    // Solo intentamos cargar los datos si no están ya cargados y si no estamos en proceso de carga
    if (!isLoaded && !loading && session) {
      fetchData();
    }
  }, [session, isLoaded, fetchUserData, loading]);

  useEffect(() => {
    if (userData) {
      // Llenamos los datos del formulario si los datos de usuario están disponibles en Zustand
      setFormData({
        id_contratista: userData.id_contratista || 0, 
        nombres_contratista: userData.nombres_contratista || "",
        apellidos_contratista: userData.apellidos_contratista || "",
        cedula: userData.cedula || "",
        ruc: userData.ruc || "",
        celular: userData.celular || "",
        telefono_fijo: userData.telefono_fijo || "",
        email: userData.email || "",
        fecha_nacimiento: userData.fecha_nacimiento || "",
        id_sexo: String(userData.sexo?.id_sexo || ""),
        id_especialidad: String(userData.especialidad?.id_especialidad || ""),
        id_departamento: String(userData.departamento?.id_departamento || ""),
        id_municipio: String(userData.municipio?.id_municipio || ""),
        id_tipo_contratista: String(userData.id_tipo_contratista || ""),
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos a enviar:", formData);
    try {
      const response = await axios.put("/api/usuario/update", formData);
      alert("Perfil actualizado exitosamente");
    } catch (error: any) {
      console.error("Error actualizando el perfil:", error.response ? error.response.data : error);
      alert("Hubo un problema al actualizar el perfil");
    }
  };

  if (status === "loading" || loading || !isLoaded || !userData) {
    return <div>Cargando Datos...</div>;
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
              <label className={styles.label}>Sexo:</label>
              <select
                name="id_sexo"
                value={formData.id_sexo}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Seleccione su sexo</option>
                {sexos?.map((sexo) => (
                  <option key={sexo.id_sexo} value={sexo.id_sexo}>
                    {sexo.sexo}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Especialidad:</label>
              <select
                name="id_especialidad"
                value={formData.id_especialidad}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Seleccione su especialidad</option>
                {especialidades.map((especialidad) => (
                  <option key={especialidad.id_especialidad} value={especialidad.id_especialidad}>
                    {especialidad.nombre_especialidad}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Departamento:</label>
              <select
                name="id_departamento"
                value={formData.id_departamento}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Seleccione su departamento</option>
                {departamentos.map((departamento) => (
                  <option key={departamento.id_departamento} value={departamento.id_departamento}>
                    {departamento.nombre_departamento}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Municipio:</label>
              <select
                name="id_municipio"
                value={formData.id_municipio}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Seleccione su municipio</option>
                {municipios.map((municipio) => (
                  <option key={municipio.id_municipio} value={municipio.id_municipio}>
                    {municipio.nombre_municipio}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Fecha de Nacimiento:</label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
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
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              Actualizar Datos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
