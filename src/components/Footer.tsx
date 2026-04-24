import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 w-full rounded-none flat mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col gap-element-gap">
          <span className="font-bold text-blue-800 dark:text-blue-400 font-lexend text-sm">
            CRUZ AZUL
          </span>
          <p className="font-body-md text-body-md text-slate-500 dark:text-slate-400 max-w-sm">
            © 2026 Cruz Azul. La Pasión Nos Une.
          </p>
        </div>
        <div className="flex flex-col md:items-end gap-element-gap">
          <nav className="flex flex-wrap gap-x-gutter gap-y-unit">
            <Link
              href="#"
              className="text-blue-800 font-semibold font-lexend text-sm hover:text-red-600 transition-colors opacity-90 hover:opacity-100"
            >
              Información del Club
            </Link>
            <Link
              href="#"
              className="text-slate-500 dark:text-slate-400 font-lexend text-sm hover:text-red-600 transition-colors opacity-90 hover:opacity-100"
            >
              Tienda Oficial
            </Link>
            <Link
              href="#"
              className="text-slate-500 dark:text-slate-400 font-lexend text-sm hover:text-red-600 transition-colors opacity-90 hover:opacity-100"
            >
              Aviso de Privacidad
            </Link>
            <Link
              href="#"
              className="text-slate-500 dark:text-slate-400 font-lexend text-sm hover:text-red-600 transition-colors opacity-90 hover:opacity-100"
            >
              Atención a Aficionados
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
