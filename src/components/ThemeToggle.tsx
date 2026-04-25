"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Placeholder para evitar errores de hidratación
  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full text-primary hover:text-primary-container dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300 flex items-center justify-center min-w-[44px] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-container focus:ring-offset-2"
      aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        {theme === "dark" ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
