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

  const [isContratistaActivo, setIsContratistaActivo] = useState<boolean | null>(null);
  const [isJuridico, setIsJuridico] = useState(false);
  const [cedula, setCedula] = useState("");
  const [ruc, setRuc] = useState("");
  const [isRucCedulaValid, setIsRucCedulaValid] = useState(false);
  const [errorMessage2, setErrorMessage2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<number | string>("");
  const [sexos, setSexos] = useState<Sexo[]>([]);
  const [sexoSeleccionado, setSexoSeleccionado] = useState<number | string>("");
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState<number | string>("");
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState<number | string>("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [mensajeVisible, setMensajeVisible] = useState(false);  // Control de visibilidad del mensaje
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
 const [errorMessages, setErrorMessages] = useState<string | null>(null);
 const [nombreRegistrado, setNombreRegistrado] = useState("");
 const [datosCorrectos, setDatosCorrectos] = useState<boolean | null>(null);
  const [mostrarFormularioCompleto, setMostrarFormularioCompleto] = useState(false);

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


  // Función de validación
  const handleValidation = async () => {
    // Resetear mensajes de error y éxito antes de cada validación
    setErrorMessage("");
    setSuccessMessage("");

    // Validar el RUC o Cédula
    const response = await fetch("/api/validar-contratista", {
      method: "POST",
      body: JSON.stringify({
        cedula: !isJuridico ? cedula : "",
        RUC: isJuridico ? ruc : "",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

   
    if (data.found) {
      setIsRucCedulaValid(true);
      setSuccessMessage("Contratista validado con éxito");
      setNombreRegistrado(data.nombre_registrado); // Cargar el nombre de la base de datos
      setErrorMessage(""); // Limpiar el mensaje de error si es válido
    } else {
      setIsRucCedulaValid(false);
      setErrorMessage("El RUC o Cédula no está activo o no existe en la base de datos.");
      setSuccessMessage(""); // Limpiar el mensaje de éxito si no es válido
    }

    // Hacer que el mensaje desaparezca después de 3 segundos
    setMensajeVisible(true);
    setTimeout(() => {
      setMensajeVisible(false);  // Oculta el mensaje después de 3 segundos
    }, 3000);
  };

  const handleDatosCorrectos = (respuesta: boolean) => {
    setDatosCorrectos(respuesta);
    if (respuesta) {
      setMostrarFormularioCompleto(true);
      setErrorMessage2("");  // Limpiar el mensaje de error si la respuesta es "Sí"
    } else {
      setMostrarFormularioCompleto(false);
      setErrorMessage2("Por favor, contáctese con nosotros para verificar su información.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isRucCedulaValid) {
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
            fecha_nacimiento: fechaNacimiento,
            id_departamento: parseInt(departamentoSeleccionado as string), // Convierte a número
            id_municipio: parseInt(municipioSeleccionado as string), // Convierte a número
            id_tipo_contratista: isJuridico ? 2 : 1, // 2 para persona jurídica, 1 para persona natural
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        // Verificar respuesta del servidor
const data = await response.json();
console.log(data);  // Agrega esta línea para revisar la respuesta

        if (response.ok) {
          setConfirmationMessage("¡Registro exitoso! Ahora puedes iniciar sesión.");
          setTimeout(() => {
            router.push("/login");
          }, 2000);  // 2000ms = 2 segundos
        } else {
          const data = await response.json();
          setErrorMessages(data.error || "Error al registrar usuario");
        }
      } catch (error) {
        setErrorMessages("Hubo un error al registrar el usuario");
      }
    } else {
      setErrorMessages("Debe validar el RUC o Cédula primero.");
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.formContainer}>
        <h2 className={Styles.h2}>Registro de Contratista</h2>
        <form onSubmit={handleSubmit}>     
          <div className={Styles.radioContainer}>
          <label >¿Ya eres parte del club contratistas de SINSA?</label>
            <label>
              <input
                type="radio"
                checked={isContratistaActivo === true}
                onChange={() => setIsContratistaActivo(true)}
              />
              Sí
            </label>
            <label>
              <input
                type="radio"
                checked={isContratistaActivo === false}
                onChange={() => {
                  setIsContratistaActivo(false);
                  window.location.href = "https://form.jotform.com/sinsadigital/admisin-contratista";
                }}
              />
              No
            </label>
          </div>

          {isContratistaActivo === true && (
            <>
              <div className={Styles.radioContainer}>
              <label >Seleccione el tipo de contratista:</label>
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

              <div className={Styles.inputContainer}>
                <label>{isJuridico ? "RUC" : "Cédula"}</label>
                <input className={Styles.input}
                  type="text"
                  value={isJuridico ? ruc : cedula}
                  onChange={(e) => (isJuridico ? setRuc(e.target.value) : setCedula(e.target.value))}
                  placeholder={`Ingrese su ${isJuridico ? "RUC" : "cédula"}`}
                  required
                />
                <button type="button" onClick={handleValidation} className={Styles.validationButton}>
                  Validar
                </button>
              </div>
          {/* Mensajes de validación que desaparecen después de 3 segundos */}
          {mensajeVisible && (
          <>
            {successMessage && <div className={Styles.success}>{successMessage}</div>}
            {errorMessage && <div className={Styles.error}>{errorMessage}</div>}
          </>
        )}
        
              {isRucCedulaValid && (
                <>
                  <div className={`${Styles.inputContainer2} ${Styles.radioContainer} `}>
                    <label className={Styles.alineado}>Nombre Asociado: </label>
                    <label className={Styles.readOnly}>
                   {nombreRegistrado}
                  </label>
                  </div>

                  <div className={Styles.radioContainer}>
                    <label className={Styles.alineado}>¿Los datos son correctos?</label>
                    <label>
                      <input
                        type="radio"
                        checked={datosCorrectos === true}
                        onChange={() => handleDatosCorrectos(true)}
                      />
                      Sí
                    </label>
                    <label>
                      <input
                        type="radio"
                        checked={datosCorrectos === false}
                        onChange={() => handleDatosCorrectos(false)}
                      />
                      No
                    </label>
                  </div>
                  {errorMessage2 && <div className={Styles.error}>{errorMessage2}</div>} {/* Mostrar mensaje de error */}
                </>
              )}
            </>
          )}

{mostrarFormularioCompleto && (
                <>
                  <h2 className={Styles.h2}>Complete los siguientes datos:</h2>
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

                  <label>Celular</label>
                  <input
                    className={Styles.input}
                    type="text"
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                    placeholder="Ingrese su número de celular"
                    required
                  />

                  <label>Email</label>
                  <input
                    className={Styles.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingrese su email"
                    required
                  />

                  <label>Password</label>
                  <input
                    className={Styles.input}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese su contraseña"
                    required
                  />

                  <label>Especialidad</label>
                  <select
                    className={Styles.input}
                    value={especialidadSeleccionada}
                    onChange={(e) => setEspecialidadSeleccionada(e.target.value)}
                    required
                  >
                    <option value="">Seleccione una especialidad</option>
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

                  <label>Fecha de nacimiento</label>
                  <input
                    className={Styles.input}
                    type="date"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    required
                  />

                  <label>Departamento</label>
                  <select
                    className={Styles.input}
                    value={departamentoSeleccionado}
                    onChange={(e) => setDepartamentoSeleccionado(e.target.value)}
                    required
                  >
                    <option value="">Seleccione un departamento</option>
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
                    <option value="">Seleccione un municipio</option>
                    {municipios.map((municipio) => (
                      <option key={municipio.id_municipio} value={municipio.id_municipio}>
                        {municipio.nombre_municipio}
                      </option>
                    ))}
                  </select>

                  <button className={Styles.submitButton} type="submit">
                    Registrarme en plataforma 
                  </button>
                </>
                
              )}
              {confirmationMessage && (
    <div className={Styles['confirmation-message']}>
        {confirmationMessage}
      </div>
    )}
     {errorMessages && (
        <div className={Styles['error-message']}>
        {errorMessages}
        </div>
              )}
        </form>
      </div>
    </div>
  );
}
