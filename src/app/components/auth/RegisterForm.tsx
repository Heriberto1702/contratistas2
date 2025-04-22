"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

interface Cargo {
  id_cargo: number;
  nombre_cargo: string;
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
  const [cedula_logueado, setCedulaLogueado] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState<number | string>("");
  const [sexos, setSexos] = useState<Sexo[]>([]);
  const [sexoSeleccionado, setSexoSeleccionado] = useState<number | string>("");
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState<number | string>("");
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState<number | string>("");
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [cargoSeleccionado, setCargoSeleccionado] = useState<number | string>("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [mensajeVisible, setMensajeVisible] = useState(false); // Control de visibilidad del mensaje
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<string | null>(null);
  const [nombreRegistrado, setNombreRegistrado] = useState("");
  const [datosCorrectos, setDatosCorrectos] = useState<boolean | null>(null);
  const [mostrarFormularioCompleto, setMostrarFormularioCompleto] = useState(false);

  // Cargar todos los catálogos desde la API en una única llamada
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/usuario/catalogo");
        const data = await response.json();

        setEspecialidades(data.especialidades);
        setSexos(data.sexos);
        setDepartamentos(data.departamentos);
        setMunicipios(data.municipios); // Ahora traemos los municipios desde el mismo API
        setCargos(data.cargos);
      } catch (error) {
        setErrorMessage("Error al cargar los datos");
      }
    };

    fetchData();
  }, []);

  // Función de validación
  const handleValidation = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    const response = await fetch("/api/usuario/validar-contratista", {
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
      setNombreRegistrado(data.nombre_registrado);
      setErrorMessage("");
    } else {
      setIsRucCedulaValid(false);
      setErrorMessage("El RUC o Cédula no está activo o no existe en la base de datos.");
      setSuccessMessage("");
    }

    setMensajeVisible(true);
    setTimeout(() => {
      setMensajeVisible(false);
    }, 3000);
  };

  const handleDatosCorrectos = (respuesta: boolean) => {
    setDatosCorrectos(respuesta);
    if (respuesta) {
      setMostrarFormularioCompleto(true);
      setErrorMessage2("");
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
            nombres,
            apellidos,
            cedula: isJuridico ? "" : cedula,
            RUC: isJuridico ? ruc : "",
            celular,
            cedula_logueado,
            id_sexo: parseInt(sexoSeleccionado as string),
            id_especialidad: parseInt(especialidadSeleccionada as string),
            id_cargo: parseInt(cargoSeleccionado as string),
            fecha_nacimiento: fechaNacimiento,
            id_departamento: parseInt(departamentoSeleccionado as string),
            id_municipio: parseInt(municipioSeleccionado as string),
            id_tipo_contratista: isJuridico ? 2 : 1,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setConfirmationMessage("¡Registro exitoso! Ahora puedes iniciar sesión.");
          setTimeout(() => {
            router.push("/login");
         }, 2000);
        } else {
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
         <form className={Styles.formulariodivision} onSubmit={handleSubmit}>
        
        <div className={Styles.leftColumn}>
        <h2 className={Styles.titulos}>Registro de Contratista</h2>
        
          <div className={Styles.radioContainer}>
            <label className={Styles.label}>
              ¿Ya eres parte del club contratistas de SINSA?
            </label>
            <label className={Styles.label}>
              <input
                className={Styles.radiobutton}
                type="radio"
                checked={isContratistaActivo === true}
                onChange={() => setIsContratistaActivo(true)}
              />
              Sí
            </label>
            <label className={Styles.label}>
              <input
                className={Styles.radiobutton}
                type="radio"
                checked={isContratistaActivo === false}
                onChange={() => {
                  setIsContratistaActivo(false);
                  window.location.href =
                    "https://form.jotform.com/sinsadigital/admisin-contratista";
                }}
              />
              No
            </label>
          </div>

          {isContratistaActivo === true && (
            <>
              <div className={Styles.radioContainer}>
                <label className={Styles.label}>
                  Seleccione el tipo de contratista:
                </label>
                <label className={Styles.label}>
                  <input
                    className={Styles.radiobutton}
                    type="radio"
                    checked={!isJuridico}
                    onChange={() => setIsJuridico(false)}
                  />
                  Persona Natural
                </label>
                <label className={Styles.label}>
                  <input
                    className={Styles.radiobutton}
                    type="radio"
                    checked={isJuridico}
                    onChange={() => setIsJuridico(true)}
                  />
                  Persona Jurídica
                </label>
              </div>

              <div className={Styles.inputContainer}>
                <label className={Styles.label}>
                  {isJuridico ? "RUC" : "Cédula"}
                </label>
                <input
                  className={Styles.input}
                  type="text"
                  value={isJuridico ? ruc : cedula}
                  onChange={(e) =>
                    isJuridico
                      ? setRuc(e.target.value)
                      : setCedula(e.target.value)
                  }
                  placeholder={`Ingrese su ${isJuridico ? "RUC" : "cédula"}`}
                  required
                />
                <button
                  type="button"
                  onClick={handleValidation}
                  className={Styles.validationButton}
                >
                  Validar
                </button>
              </div>
              {/* Mensajes de validación que desaparecen después de 3 segundos */}

              {mensajeVisible && (
                <>
                  {successMessage && (
                    <div className={Styles.success}>{successMessage}</div>
                  )}
                  {errorMessage && (
                    <div className={Styles.error}>{errorMessage}</div>
                  )}
                </>
              )}

              {isRucCedulaValid && (
                <>
                  <br></br>
                  <div
                    className={`${Styles.inputContainer2} ${Styles.radioContainer} `}
                  >
                    <label className={`${Styles.alineado} ${Styles.label}`}>
                      Nombre Asociado:{" "}
                    </label>
                    <label className={Styles.readOnly}>
                      {nombreRegistrado}
                    </label>
                  </div>
                  <div className={Styles.radioContainer}>
                    <label className={`${Styles.alineado} ${Styles.label}`}>
                      ¿Los datos son correctos?
                    </label>
                    <label className={Styles.label}>
                      <input
                        className={Styles.radiobutton}
                        type="radio"
                        checked={datosCorrectos === true}
                        onChange={() => handleDatosCorrectos(true)}
                      />
                      Sí
                    </label>
                    <label className={Styles.label}>
                      <input
                        className={Styles.radiobutton}
                        type="radio"
                        checked={datosCorrectos === false}
                        onChange={() => handleDatosCorrectos(false)}
                      />
                      No
                    </label>
                  </div>
                  {errorMessage2 && (
                    <div className={Styles.error}>{errorMessage2}</div>
                  )}{" "}
                  {/* Mostrar mensaje de error */}
                </>
              )}
            </>
            )}
            
        </div>

        
        {mostrarFormularioCompleto && (
           <>
             <div className={Styles.rightColumn}>
             <h2 className={Styles.titulos}>
               Complete los siguientes datos:
             </h2>
             <div className={Styles.formGrid}>
               <div className={Styles.formGroup}>
                 <label className={Styles.label}>Nombres</label>
                 <input
                   className={Styles.input}
                   type="text"
                   value={nombres}
                   onChange={(e) => setNombres(e.target.value)}
                   placeholder="Ingrese su(s) nombre(s)"
                   required
                 />
               </div>
               <div className={Styles.formGroup}>
                 <label className={Styles.label}>Apellidos</label>
                 <input
                   className={Styles.input}
                   type="text"
                   value={apellidos}
                   onChange={(e) => setApellidos(e.target.value)}
                   placeholder="Ingrese su(s) apellido(s)"
                   required
                 />
               </div>

               {isJuridico && isRucCedulaValid && (
               <>
        <div className={Styles.formGroup}>
  <label className={Styles.label}>Cédula</label>
  <input
    className={Styles.input}
    type="text"
    value={cedula_logueado}
    inputMode="text"
    maxLength={14}
    onChange={(e) => {
      let rawValue = e.target.value;

      // Elimina cualquier caracter que no sea letra o número
      let cleaned = rawValue.replace(/[^0-9a-zA-Z]/g, '');

      // Separa los primeros 13 dígitos y la posible letra al final
      let digits = cleaned.slice(0, 13).replace(/\D/g, ''); // solo números
      let letter = cleaned.charAt(13).match(/[a-zA-Z]/) ? cleaned.charAt(13).toUpperCase() : '';

      setCedulaLogueado(digits + letter);
    }}
    pattern="\d{13}[A-Za-z]"
    onInvalid={(e) =>
      e.currentTarget.setCustomValidity("Debe tener exactamente 13 números y una letra al final (ej: 1234567890123A)")
    }
    onInput={(e) => e.currentTarget.setCustomValidity("")}
    placeholder="Ingrese su número de cédula"
    required
  />
</div>



               <div className={Styles.formGroup}>
                 <label className={Styles.label}>Cargo</label>
                 <select
                   className={Styles.input}
                   value={cargoSeleccionado}
                   onChange={(e) => setCargoSeleccionado(e.target.value)}
                   
                 >
                   <option value="">Seleccione su cargo</option>
                   {cargos.map((cargo) => (
                     <option key={cargo.id_cargo} value={cargo.id_cargo}>
                       {cargo.nombre_cargo}
                     </option>
                   ))}
                 </select>
               </div>
               </>
)}

<div className={Styles.formGroup}>
  <label className={Styles.label}>Celular</label>
  <input
    className={Styles.input}
    type="text"
    inputMode="numeric"
    pattern="\d{8}"
    maxLength={8}
    value={celular}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, ""); // Elimina todo lo que no es número
      setCelular(value);
    }}
    placeholder="Ingrese su número de celular"
    required
  />
</div>


               <div className={Styles.formGroup}>
                 <label className={Styles.label}>Email</label>
                 <input
                   className={Styles.input}
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Ingrese su email"
                   required
                 />
               </div>

               <div className={Styles.formGroup}>
                 <label className={Styles.label}>Password</label>
                 <input
                   className={Styles.input}
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="Ingrese su contraseña"
                   required
                 />
               </div>

               <div className={Styles.formGroup}>
                 <label className={Styles.label}>Especialidad</label>
                 <select
                   className={Styles.input}
                   value={especialidadSeleccionada}
                   onChange={(e) =>
                     setEspecialidadSeleccionada(e.target.value)
                   }
                   required
                 >
                   <option value="">Seleccione una especialidad</option>
                   {especialidades.map((especialidad) => (
                     <option
                       key={especialidad.id_especialidad}
                       value={especialidad.id_especialidad}
                     >
                       {especialidad.nombre_especialidad}
                     </option>
                   ))}
                 </select>
               </div>
               <div className={Styles.formGroup}>
                 <label className={Styles.label}>Sexo</label>
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
               </div>

               <div className={Styles.formGroup}>
                 <label className={Styles.label}>Fecha de nacimiento</label>
                 <input
                   className={Styles.input}
                   type="date"
                   value={fechaNacimiento}
                   onChange={(e) => setFechaNacimiento(e.target.value)}
                   required
                 />
               </div>

               <div className={Styles.formGroup}>
                 <label className={Styles.label}>Departamento</label>
                 <select
                   className={Styles.input}
                   value={departamentoSeleccionado}
                   onChange={(e) =>
                     setDepartamentoSeleccionado(e.target.value)
                   }
                   required
                 >
                   <option value="">Seleccione un departamento</option>
                   {departamentos.map((departamento) => (
                     <option
                       key={departamento.id_departamento}
                       value={departamento.id_departamento}
                     >
                       {departamento.nombre_departamento}
                     </option>
                   ))}
                 </select>
               </div>
               <div className={Styles.formGroup}>
                 <label className={Styles.label}>Municipio</label>
                 <select
                   className={Styles.input}
                   value={municipioSeleccionado}
                   onChange={(e) => setMunicipioSeleccionado(e.target.value)}
                   required
                 >
                   <option value="">Seleccione un municipio</option>
                   {municipios.map((municipio) => (
                     <option
                       key={municipio.id_municipio}
                       value={municipio.id_municipio}
                     >
                       {municipio.nombre_municipio}
                     </option>
                   ))}
                 </select>
               </div>
             </div>
             <button className={Styles.submitButton} type="submit">
               Registrarme en plataforma
             </button>
             </div>
           </>
         
         )}
   
       {confirmationMessage && (
         <div className={Styles["confirmation-message"]}>
           {confirmationMessage}
         </div>
       )}
       {errorMessages && (
         <div className={Styles["error-message"]}>{errorMessages}</div>
       )}
         
        </form>
      </div>

      </div>

 
  );
}

