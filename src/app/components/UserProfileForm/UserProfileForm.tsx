import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import useCatalogosStore from "../../store/catalogoStore";
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
  const { data: session, status} = useSession();
  const { departamentos, municipios, especialidades, sexos, setCatalogos, loading, setLoading, isLoaded } = useCatalogosStore();

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

  const [isUserDataFetched, setIsUserDataFetched] = useState(false); // Bandera para controlar la carga de datos del usuario

  // Hook para obtener los datos de usuario y cargar catálogos solo una vez
  useEffect(() => {
    if (session && !isUserDataFetched) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get("/api/user/data");
          const { user, catalogos } = response.data;

          setFormData({
            ...user,
            id_tipo_contratista: user.isJuridico ? 2 : 1,
          });

          // Solo cargar catálogos si Zustand no los tiene
          if (!isLoaded) {
            setCatalogos(
              catalogos.departamentos,
              catalogos.municipios,
              catalogos.especialidades,
              catalogos.sexos
            );
          }

          // Marcar que los datos del usuario han sido cargados
          setIsUserDataFetched(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [session, isUserDataFetched, isLoaded, setCatalogos, setLoading]); // Dependencias optimizadas

// Evitar ejecución repetida cuando el estado de session cambia
useEffect(() => {
  if (status === "loading") {
    console.log("Cargando sesión...");
  }
  if (status === "authenticated" && !isUserDataFetched) {
    setIsUserDataFetched(false); // Resetear si la sesión cambia
  }
}, [status]); // Esta dependencia solo observa el estado de la sesión (loading, authenticated)

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
  
  return (
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
            {sexos.map((sexo) => (
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
            type="text"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Teléfono Fijo:</label>
          <input
            type="text"
            name="telefono_fijo"
            value={formData.telefono_fijo || ""}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.submitButton}>
          Actualizar datos
        </button>
      </div>
    </form>
  );
};

export default UserProfileForm;
