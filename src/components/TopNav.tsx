"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function TopNav() {
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm docked full-width top-0 sticky z-50 border-b border-slate-100 dark:border-slate-800 flat no-shadow">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-element-gap">
          <span className="font-headline-xl text-blue-800 dark:text-blue-400 font-lexend tracking-tight text-2xl font-black">
            CRUZ AZUL
          </span>
          <nav className="hidden md:flex gap-gutter ml-8">
            <Link
              href="/matches"
              className="text-slate-500 dark:text-slate-400 font-label-md text-label-md hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Partidos
            </Link>
            <Link
              href="#"
              className="text-blue-800 dark:text-blue-400 border-b-2 border-red-600 pb-1 font-label-md text-label-md hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Noticias
            </Link>
            <Link
              href="/squad"
              className="text-slate-500 dark:text-slate-400 font-label-md text-label-md hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Plantilla
            </Link>
            <Link
              href="#"
              className="text-slate-500 dark:text-slate-400 font-label-md text-label-md hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Boletos
            </Link>
            <Link
              href="/comunidad"
              className="text-slate-500 dark:text-slate-400 font-label-md text-label-md hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Comunidad
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-element-gap">
          {!user ? (
            <Link
              href="?auth=login"
              scroll={false}
              className="hidden md:flex bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded border-r-2 border-transparent hover:border-tertiary transition-all shadow-sm"
            >
              Únete
            </Link>
          ) : null}
          <div className="flex gap-4">
            <ThemeToggle />
            {user ? (
              <>
                <button className="text-primary hover:text-primary-container dark:text-slate-400 dark:hover:text-white transition-colors duration-200">
                  <span className="material-symbols-outlined" data-icon="notifications">
                    notifications
                  </span>
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-primary hover:text-primary-container dark:text-slate-400 dark:hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined" data-icon="person">
                      person
                    </span>
                    <span className="hidden md:block text-xs font-bold font-lexend uppercase tracking-wide">
                      {user.email.split("@")[0]}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant/20 dark:border-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col z-50">
                      <div className="px-4 py-3 border-b border-outline-variant/20 dark:border-slate-800">
                        <p className="text-[10px] uppercase font-bold text-outline dark:text-slate-500 tracking-wider">Conectado como</p>
                        <p className="text-xs font-medium text-on-surface dark:text-slate-300 truncate" title={user.email}>
                          {user.email}
                        </p>
                      </div>
                      <button 
                        onClick={() => {
                          setDropdownOpen(false);
                          signOut();
                        }}
                        className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-tertiary-container dark:text-red-400 hover:bg-error-container/10 dark:hover:bg-red-900/20 transition-colors text-left w-full"
                      >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
