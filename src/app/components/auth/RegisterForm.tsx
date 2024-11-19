"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Styles from "./RegisterForm.module.css"; // Importa el CSS modular

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

export default function RegisterForm() {
  const router = useRouter();

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [cedula, setCedula] = useState("");
  const [ruc, setRuc] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<number | string>("");

  const [sexos, setSexos] = useState<Sexo[]>([]);
  const [sexoSeleccionado, setSexoSeleccionado] = useState<number | string>("");

  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState<number | string>("");

  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState<number | string>("");

  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isJuridico, setIsJuridico] = useState(false);

  // Cargar datos desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [especialidadesData, sexosData, departamentosData] = await Promise.all([
          fetch("/api/especialidades").then((res) => res.json()),
          fetch("/api/sexos").then((res) => res.json()),
          fetch("/api/departamentos").then((res) => res.json())
        ]);

        setEspecialidades(especialidadesData);
        setSexos(sexosData);
        setDepartamentos(departamentosData);
      } catch (error) {
        setErrorMessage("Error al cargar los datos");
      }
    };

    fetchData();
  }, []);

  // Cargar municipios cuando se seleccione un departamento
  useEffect(() => {
    const fetchMunicipios = async () => {
      if (departamentoSeleccionado) {
        try {
          const response = await fetch(`/api/municipios?departamentoId=${departamentoSeleccionado}`);
          const data = await response.json();
          setMunicipios(data);
        } catch (error) {
          setErrorMessage("Error al cargar los municipios");
        }
      }
    };

    fetchMunicipios();
  }, [departamentoSeleccionado]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      return;
    }
  
    try {
      const response = await fetch("/api/auth/registro", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          nombres: nombres,
          apellidos: apellidos,
          cedula: isJuridico ? "" : cedula,
          RUC: isJuridico ? ruc : "",
          celular,
          id_sexo: parseInt(sexoSeleccionado as string), // Convierte a número
          id_especialidad: parseInt(especialidadSeleccionada as string), // Convierte a número
          fecha_nacimiento: new Date(fechaNacimiento),
          id_departamento: parseInt(departamentoSeleccionado as string), // Convierte a número
          id_municipio: parseInt(municipioSeleccionado as string), // Convierte a número
          id_tipo_contratista: isJuridico ? 2 : 1, // 2 para persona jurídica, 1 para persona natural
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        router.push("/login");
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Error al registrar usuario");
      }
    } catch (error) {
      setErrorMessage("Hubo un error al registrar el usuario");
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.formContainer}>
        <h2>Registro Contratista</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombres</label>
          <input
            className={Styles.input}
            type="text"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            placeholder="Ingrese su(s) nombre(s)"
            required
          />

          <label>Apellido(s)</label>
          <input
            className={Styles.input}
            type="text"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            placeholder="Ingrese su(s) apellido(s)"
            required
          />

          <div className={Styles.radioContainer}>
            <label>
              <input
                type="radio"
                checked={!isJuridico}
                onChange={() => setIsJuridico(false)}
              />
              Persona Natural
            </label>
            <label>
              <input
                type="radio"
                checked={isJuridico}
                onChange={() => setIsJuridico(true)}
              />
              Persona Jurídica
            </label>
          </div>

          {!isJuridico && (
            <>
              <label>Cédula</label>
              <input
                className={Styles.input}
                type="text"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                placeholder="Ingrese su cédula"
                required
              />
            </>
          )}

          {isJuridico && (
            <>
              <label>RUC</label>
              <input
                className={Styles.input}
                type="text"
                value={ruc}
                onChange={(e) => setRuc(e.target.value)}
                placeholder="Ingrese su RUC"
                required
              />
            </>
          )}

          <label>Celular</label>
          <input
            className={Styles.input}
            type="text"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            placeholder="Ingrese su número de teléfono"
            required
          />

          <label>Email</label>
          <input
            className={Styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingrese su correo electrónico"
            required
          />

          <label>Especialidad</label>
          <select
            className={Styles.input}
            value={especialidadSeleccionada}
            onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
            required
          >
            <option value="">Seleccione su especialidad</option>
            {especialidades.map((especialidad) => (
              <option key={especialidad.id_especialidad} value={especialidad.id_especialidad}>
                {especialidad.nombre_especialidad}
              </option>
            ))}
          </select>

          <label>Sexo</label>
          <select
            className={Styles.input}
            value={sexoSeleccionado}
            onChange={(e) => setSexoSeleccionado(e.target.value)}
            required
          >
            <option value="">Seleccione su sexo</option>
            {sexos.map((sexo) => (
              <option key={sexo.id_sexo} value={sexo.id_sexo}>
                {sexo.sexo}
              </option>
            ))}
          </select>

          <label>Departamento</label>
          <select
            className={Styles.input}
            value={departamentoSeleccionado}
            onChange={(e) => setDepartamentoSeleccionado(e.target.value)}
            required
          >
            <option value="">Seleccione su departamento</option>
            {departamentos.map((departamento) => (
              <option key={departamento.id_departamento} value={departamento.id_departamento}>
                {departamento.nombre_departamento}
              </option>
            ))}
          </select>

          <label>Municipio</label>
          <select
            className={Styles.input}
            value={municipioSeleccionado}
            onChange={(e) => setMunicipioSeleccionado(e.target.value)}
            required
          >
            <option value="">Seleccione su municipio</option>
            {municipios.map((municipio) => (
              <option key={municipio.id_municipio} value={municipio.id_municipio}>
                {municipio.nombre_municipio}
              </option>
            ))}
          </select>

          <label>Fecha de Nacimiento</label>
          <input
            className={Styles.input}
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            className={Styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingrese su contraseña"
            required
          />

          <label>Confirmar Contraseña</label>
          <input
            className={Styles.input}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme su contraseña"
            required
          />

          {errorMessage && <p className={Styles.error}>{errorMessage}</p>}

          <button className={Styles.submitButton} type="submit">
            Registrarse
          </button>
        </form>

        <p>
          ¿Ya tienes una cuenta? <Link href="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
}