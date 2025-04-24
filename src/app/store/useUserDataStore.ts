import { create } from "zustand";

interface Departamento {
  id_departamento: number;
  nombre_departamento: string;
}

interface Municipio {
  id_municipio: number;
  nombre_municipio: string;
}

interface Especialidad {
  id_especialidad: number;
  nombre_especialidad: string;
}

interface Sexo {
  id_sexo: number;
  sexo: string;
}

interface UserData {
  id_contratista: number; 
  nombres_contratista: string;
  apellidos_contratista: string;
  cedula: string;
  celular: string;
  ruc: string;
  email: string;
  telefono_fijo: string;
  fecha_nacimiento: string;
  tipo_contratista: string;
  id_tipo_contratista: string;
  nombre_club: string | null;
  departamento: Departamento | null;
  municipio: Municipio | null;
  especialidad: Especialidad | null;
  sexo: Sexo | null;
  nombre_registrado: string;

}

interface UserDataState {
  userData: UserData | null;
  loading: boolean;
  isLoaded: boolean;
  especialidades: Especialidad[];
  departamentos: Departamento[];
  municipios: Municipio[];
  sexos: Sexo[];
  fetchUserData: () => Promise<void>;
  updateUserData: (newData: UserData) => void;
  getState: () => UserDataState;  // Métodos para obtener el estado
}

const useCatalogosStore = create<UserDataState>((set, get) => ({
  userData: null,
  loading: false,
  isLoaded: false,
  especialidades: [],
  departamentos: [],
  municipios: [],
  sexos: [],

  // Método para obtener el estado completo
  getState: () => get(),  // Acceder al estado usando get()

  // Función para obtener los datos del usuario y los catálogos
  fetchUserData: async () => {
    try {
      set({ loading: true });

      const currentState = get().userData;
      if (currentState) {
        // Si ya tenemos los datos del usuario, no hacemos la llamada
        set({ loading: false });
        return;
      }

      const response = await fetch("/api/usuario/data");
      const data = await response.json();
      console.log("Datos de usuario recibidos:", data);

      if (response.ok) {
        // Almacenamos los datos del usuario y los catálogos
        set({
          userData: {
            id_contratista: data.id_contratista,
            nombres_contratista: data.nombres_contratista,
            apellidos_contratista: data.apellidos_contratista,
            cedula: data.cedula,
            celular: data.celular,
            telefono_fijo: data.telefono_fijo,
            email: data.email,
            fecha_nacimiento: data.fecha_nacimiento,
            ruc: data.ruc,
            nombre_club: data.nombre_club || null,
            id_tipo_contratista: data.id_tipo_contratista,
            tipo_contratista: data.tipo_contratista,
            departamento: data.usuario_filtrado?.departamento || null,
            municipio: data.usuario_filtrado?.municipio || null,
            especialidad: data.usuario_filtrado?.especialidad || null,
            sexo: data.usuario_filtrado?.sexo || null,
            nombre_registrado: data.nombre_registrado,

          },
          especialidades: data.catalogos?.especialidades || [],
          departamentos: data.catalogos?.departamentos || [],
          municipios: data.catalogos?.municipios || [],
          sexos: data.catalogos?.sexos || [],
          isLoaded: true,
        });
      } else {
        console.error("Error al obtener datos del usuario:", data.message);
      }
    } catch (error) {
      console.error("Error en fetchUserData:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Función para actualizar los datos del usuario
  updateUserData: (newData) => set({ userData: newData, isLoaded: true }),
}));

export default useCatalogosStore;
