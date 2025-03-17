import { create } from 'zustand';

interface Departamentos {
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
  nombres_contratista: string;
  apellidos_contratista: string;
  cedula: string;
  ruc: string;
  celular: string;
  telefono_fijo: string;
  email: string;
  fecha_nacimiento: string;
  id_sexo: number;
  id_especialidad: number;
  id_departamento: number;
  id_municipio: number;
  id_tipo_contratista: number;
  nombre_club: string;
}

interface UserDataState {
  departamentos: Departamentos[];
  municipios: Municipio[];
  especialidades: Especialidad[];
  sexos: Sexo[];
  userData: UserData | null;
  loading: boolean;
  isLoaded: boolean;
  setUserData: (user: UserData) => void;
  setCatalogosData: (catalogos: { departamentos: Departamentos[]; municipios: Municipio[]; especialidades: Especialidad[]; sexos: Sexo[] }) => void;
  setLoading: (loading: boolean) => void;
  setIsLoaded: (isLoaded: boolean) => void;
}

const useCatalogosStore = create<UserDataState>((set) => ({
  departamentos: [],
  municipios: [],
  especialidades: [],
  sexos: [],
  userData: null,
  loading: false,
  isLoaded: false,
  setUserData: (user) => set({ userData: user }), // Actualiza los datos del usuario
  setCatalogosData: (catalogos) => set({
    departamentos: catalogos.departamentos,
    municipios: catalogos.municipios,
    especialidades: catalogos.especialidades,
    sexos: catalogos.sexos,
  }), // Actualiza los catálogos
  setLoading: (loading) => set({ loading }), // Controla el estado de carga
  setIsLoaded: (isLoaded) => set({ isLoaded }), // Marca cuando los datos han sido cargados
}));

export default useCatalogosStore;
