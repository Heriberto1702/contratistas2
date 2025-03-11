import { create } from "zustand";

interface CatalogosState {
  departamentos: any[];
  municipios: any[];
  especialidades: any[];
  sexos: any[];
  isLoaded: boolean;
  loading: boolean;
  setCatalogos: (departamentos: any[], municipios: any[], especialidades: any[], sexos: any[]) => void;
  setLoading: (loading: boolean) => void;
}

const useCatalogosStore = create<CatalogosState>((set) => ({
  departamentos: [],
  municipios: [],
  especialidades: [],
  sexos: [],
  isLoaded: false,
  loading: false,
  setCatalogos: (departamentos, municipios, especialidades, sexos) =>
    set({ departamentos, municipios, especialidades, sexos, isLoaded: true }),
  setLoading: (loading) => set({ loading }),
}));

export default useCatalogosStore;
