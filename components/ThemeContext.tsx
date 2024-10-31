import { createContext, ReactNode, useContext, useState } from "react";

interface IThemeContext {
    theme?: "light" | "dark";
    toggleTheme?: (theme: "light" | "dark") => void;
};
type ThemeProviderOptions = {
    children: ReactNode;
};

const ThemeContext = createContext<IThemeContext>({});
export const ThemeProvider = ({children}: ThemeProviderOptions) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const toggleTheme = () => {
        setTheme(p => p === "dark" ? "light" : "dark");
    };
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = useContext(ThemeContext);