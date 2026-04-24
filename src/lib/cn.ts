import { clsx, type ClassValue } from "clsx";

/**
 * Combina clases de Tailwind de forma segura.
 *
 * Usa `clsx` internamente para combinar clases condicionales,
 * arrays y objetos en un string de clases limpio.
 *
 * @example
 * cn("p-4", isActive && "bg-blue-500", "text-white")
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
