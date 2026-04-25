"use client";

import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function TopNav() {
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm docked full-width top-0 sticky z-50 border-b border-slate-100 dark:border-slate-800 flat no-shadow">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-margin-mobile md:px-6 py-4">
        <div className="flex items-center gap-element-gap">
          {/* Hamburger Menu Toggle (Mobile Only) */}
          <button 
            className="md:hidden text-primary dark:text-white p-2 min-h-[44px] min-w-[44px] flex items-center justify-center -ml-2 focus:outline-none focus:ring-2 focus:ring-primary-container focus:ring-offset-2 rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
          
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
              className="hidden md:flex bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded min-h-[44px] items-center justify-center border-r-2 border-transparent hover:border-tertiary transition-all shadow-sm"
            >
              Únete
            </Link>
          ) : null}
          <div className="flex gap-2 md:gap-4 items-center">
            <ThemeToggle />
            {user ? (
              <>
                <button 
                  className="text-primary hover:text-primary-container dark:text-slate-400 dark:hover:text-white transition-colors duration-200 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-container focus:ring-offset-2 rounded-full"
                  aria-label="Notificaciones"
                >
                  <span className="material-symbols-outlined" data-icon="notifications" aria-hidden="true">
                    notifications
                  </span>
                </button>
                <div className="relative">
                  <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-primary hover:text-primary-container dark:text-slate-400 dark:hover:text-white transition-colors duration-200 flex items-center justify-center gap-2 p-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-container focus:ring-offset-2 rounded"
                    aria-label="Abrir menú de perfil"
                    aria-expanded={dropdownOpen}
                  >
                    <span className="material-symbols-outlined" data-icon="person" aria-hidden="true">
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
                        className="flex items-center gap-2 px-4 py-3 min-h-[44px] text-sm font-semibold text-tertiary-container dark:text-red-400 hover:bg-error-container/10 dark:hover:bg-red-900/20 transition-colors text-left w-full focus:outline-none focus:bg-error-container/10 dark:focus:bg-red-900/20"
                      >
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">logout</span>
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

      {/* Mobile Menu Content (Full Screen Drawer) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg pt-24 px-6 flex flex-col md:hidden animate-in fade-in duration-200">
          <nav className="flex flex-col gap-2">
            <Link href="/matches" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-4 font-label-md text-lg text-slate-600 dark:text-slate-300 min-h-[44px] border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors">
              Partidos
            </Link>
            <Link href="#" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-4 font-label-md text-lg text-blue-800 dark:text-blue-400 font-bold bg-blue-50 dark:bg-slate-800 rounded min-h-[44px] hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors">
              Noticias
            </Link>
            <Link href="/squad" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-4 font-label-md text-lg text-slate-600 dark:text-slate-300 min-h-[44px] border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors">
              Plantilla
            </Link>
            <Link href="#" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-4 font-label-md text-lg text-slate-600 dark:text-slate-300 min-h-[44px] border-b border-outline-variant/20 hover:bg-surface-container-low transition-colors">
              Boletos
            </Link>
            <Link href="/comunidad" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-4 font-label-md text-lg text-slate-600 dark:text-slate-300 min-h-[44px] hover:bg-surface-container-low transition-colors">
              Comunidad
            </Link>
            
            {!user && (
              <Link
                href="?auth=login"
                onClick={() => setMobileMenuOpen(false)}
                scroll={false}
                className="w-full mt-6 bg-primary text-on-primary font-label-md text-center py-4 text-lg rounded-lg min-h-[44px] shadow-sm hover:bg-primary-container transition-colors"
              >
                Únete
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
