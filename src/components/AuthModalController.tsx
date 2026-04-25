"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const AuthModal = dynamic(() => import("./AuthModal"), {
  ssr: false, // Opcionalmente false para modales para garantizar hidratación sin mismatch
});

export default function AuthModalController() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Si la URL tiene el parámetro ?auth, abrimos el modal
  const isOpen = searchParams.has("auth");

  const handleClose = () => {
    // Al cerrar el modal, removemos el parámetro de la URL sin hacer scroll
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("auth");
    const newUrl = newParams.toString() ? `${pathname}?${newParams.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
  };

  return <AuthModal open={isOpen} onClose={handleClose} />;
}
