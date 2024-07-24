import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

export const Context = createContext(-1);

export function ThemeProvider({ children} : {children : ReactNode}) {
  const [theme, setTheme] = useState("light");
//   return (
//     <Context.Provider value={[theme, setTheme]}>{children}</Context.Provider>
//   );
}

export function useThemeContext() {
  return useContext(Context);
}