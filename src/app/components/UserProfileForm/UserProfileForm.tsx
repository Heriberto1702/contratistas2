"use client"; // Marca este archivo como un Client Component

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import styles from "./UserProfileForm.module.css"; // Importa el archivo CSS

const UserProfileForm = () => {
  const { data: session } = useSession(); // Obtenemos la sesión del usuario
  const [formData, setFormData] = useState({
    nombres_contratista: "",
    apellidos_contratista: "",
    celular: "",
    telefono_fijo: "",
  });

  // Obtener los datos del usuario cuando la sesión esté disponible
  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("/api/user/data"); // Reemplaza con tu endpoint para obtener los datos
          setFormData(response.data); // Establecemos los datos en el estado del formulario
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [session]); // Ejecutamos este efecto solo cuando la sesión cambia

  // Manejo del cambio de datos en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Manejo del envío del formulario para actualizar los datos del usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/user/update", formData); // Reemplaza con tu endpoint para actualizar los datos
      console.log("User updated:", response.data);
      alert("Perfil actualizado exitosamente");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Hubo un problema actualizando el perfil");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2 className={styles.formTitle}>Actualizar Perfil</h2>
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
          Actualizar Perfil
        </button>
      </div>
    </form>
  );
};

export default UserProfileForm;