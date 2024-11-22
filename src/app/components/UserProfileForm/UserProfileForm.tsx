"use client"; // Marca este archivo como un Client Component

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import styles from "./UserProfileForm.module.css"; // Importa el archivo CSS

interface Especialidad {
  id_especialidad: number;
  nombre_especialidad: string;
}

interface Sexo {
  id_sexo: number;
  sexo: string;
}

interface Departamento {
  id_departamento: number;
  nombre_departamento: string;
}

interface Municipio {
  id_municipio: number;
  nombre_municipio: string;
}

const UserProfileForm = () => {
  const { data: session } = useSession(); // Obtenemos la sesión del usuario
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [sexos, setSexos] = useState<Sexo[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);

  const [formData, setFormData] = useState({
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
    id_tipo_contratista: 1, // 1 para natural, 2 para jurídico
  });

  // Función para convertir la fecha en formato UTC a formato yyyy-MM-dd local
  const formatDateForInput = (isoDate: string) => {
    if (!isoDate) return ""; // Retorna vacío si no hay fecha
    const date = new Date(isoDate);

    // Ajusta la fecha a la zona horaria local
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // Devuelve la fecha en formato yyyy-MM-dd
  };

  // Obtener los datos del usuario cuando la sesión esté disponible
  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("/api/user/data"); // Endpoint para obtener los datos del usuario
          const userData = response.data;

          // Setea los datos recibidos del backend
          setFormData({
            ...userData,
            id_tipo_contratista: userData.isJuridico ? 2 : 1, // Se ajusta el tipo de usuario
            fecha_nacimiento: formatDateForInput(userData.fecha_nacimiento), // Convierte la fecha
          });

          // Carga los datos de las listas desplegables
          const [especialidadesData, sexosData, departamentosData, municipiosData] = await Promise.all([
            axios.get("/api/especialidades"),
            axios.get("/api/sexos"),
            axios.get("/api/departamentos"),
            axios.get("/api/municipios"),
          ]);

          setEspecialidades(especialidadesData.data);
          setSexos(sexosData.data);
          setDepartamentos(departamentosData.data);
          setMunicipios(municipiosData.data)

        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [session]); // Ejecutamos este efecto solo cuando la sesión cambia

  // Manejo del cambio de datos en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Manejo del envío del formulario para actualizar los datos del usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Actualiza los datos del usuario
      const response = await axios.put("/api/user/update", formData); // Endpoint para actualizar los datos
      console.log("User updated:", response.data);
      alert("Perfil actualizado exitosamente");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Hubo un problema actualizando el perfil");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
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
          type="date"
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

      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.submitButton}>
          Guardar Perfil
        </button>
      </div>
    </form>
  );
};

export default UserProfileForm;