import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import useCatalogosStore from "../../store/catalogoStore";
import styles from "./UserProfileForm.module.css";

// Definir la interfaz para los datos del formulario
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
  const { data: session } = useSession();
  const { departamentos, municipios, especialidades, sexos, setCatalogos, loading, setLoading } = useCatalogosStore();
  
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
    if (session) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("/api/user/data");
          const userData = response.data;

          setFormData({
            ...userData,
            id_tipo_contratista: userData.isJuridico ? 2 : 1,
          });

          // Solo realiza la carga de los catálogos si no están cargados en Zustand
          if (!loading && (departamentos.length === 0 || municipios.length === 0 || especialidades.length === 0 || sexos.length === 0)) {
            setLoading(true);

            // Llamada a la API de catalogos solo si no están disponibles en Zustand
            const dataResponse = await axios.get("/api/catalogos");
            const { departamentos, municipios, especialidades, sexos } = dataResponse.data;
            setCatalogos(departamentos, municipios, especialidades, sexos);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [session, setCatalogos, departamentos, municipios, especialidades, sexos, setLoading, loading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: FormData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/user/update", formData);
      console.log("User updated:", response.data);
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
