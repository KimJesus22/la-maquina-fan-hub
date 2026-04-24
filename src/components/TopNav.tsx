import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function TopNav() {
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
          <Link
            href="?auth=login"
            scroll={false}
            className="hidden md:flex bg-primary text-on-primary font-label-md text-label-md px-6 py-2 rounded border-r-2 border-transparent hover:border-tertiary transition-all"
          >
            Únete
          </Link>
          <div className="flex gap-4">
            <ThemeToggle />
            <button className="text-primary hover:text-primary-container dark:text-slate-400 dark:hover:text-white transition-colors duration-200">
              <span className="material-symbols-outlined" data-icon="notifications">
                notifications
              </span>
            </button>
            <button className="text-primary hover:text-primary-container transition-colors duration-200">
              <span className="material-symbols-outlined" data-icon="person">
                person
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
