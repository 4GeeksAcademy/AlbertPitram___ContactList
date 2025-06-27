import { useContext, useReducer, createContext } from "react";

// Estado inicial ejemplo
const initialStore = {
  user: null,
  theme: "light",
  // ... otros estados globales
};

// Reducer ejemplo
function storeReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    // añade más acciones aquí
    default:
      return state;
  }
}

const StoreContext = createContext();

// Proveedor global que envuelve la app y provee store y dispatch
export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore);
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// Hook personalizado para acceder fácilmente al store global
export default function useGlobalReducer() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useGlobalReducer debe usarse dentro de StoreProvider");
  }
  return context; // { store, dispatch }
}
