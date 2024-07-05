import irrmbConf from "@/configuration/irrmb";
import type { IuseStoreTest } from "@/types/index";
import { create } from "zustand";

// TODO
// Crear otra variable global, la cual cargara la configuracion global, al otro estado global
// es decir dos botones que pueden setear un storeglobal para que el otro utilize ese mismo valor
// Ejemplo : irrmbConf | PcaasConf

const { testQueue } = irrmbConf;
const useStoreTest = create<IuseStoreTest>()((set) => ({
  index: 0,
  results: [],
  config: testQueue,
  increaseIndex: () => {
    set((state) => {
      return { index: state.index + 1 };
    });
  },
  updateResults: (newResults) => {
    set((state) => {
      return { results: [...state.results, newResults] };
    });
  },
}));

export { useStoreTest };
