// src/app/store/catalogosStore.ts
import { create } from 'zustand';

interface CatalogosState {
  departamentos: { id_departamento: number; nombre_departamento: string }[];
  municipios: { id_municipio: number; nombre_municipio: string }[];
  especialidades: { id_especialidad: number; nombre_especialidad: string }[];
  sexos: { id_sexo: number; sexo: string }[];
  loading: boolean;
  setCatalogos: (
    departamentos: { id_departamento: number; nombre_departamento: string }[],
    municipios: { id_municipio: number; nombre_municipio: string }[],
    especialidades: { id_especialidad: number; nombre_especialidad: string }[],
    sexos: { id_sexo: number; sexo: string }[]
  ) => void;
  setLoading: (loading: boolean) => void;
}

const useCatalogosStore = create<CatalogosState>((set) => ({
  departamentos: [],
  municipios: [],
  especialidades: [],
  sexos: [],
  loading: false,
  setCatalogos: (
    departamentos: { id_departamento: number; nombre_departamento: string }[],
    municipios: { id_municipio: number; nombre_municipio: string }[],
    especialidades: { id_especialidad: number; nombre_especialidad: string }[],
    sexos: { id_sexo: number; sexo: string }[]
  ) =>
    set({ departamentos, municipios, especialidades, sexos }),
  setLoading: (loading: boolean) => set({ loading }),
}));

export default useCatalogosStore;
