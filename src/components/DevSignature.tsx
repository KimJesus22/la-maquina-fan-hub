"use client";

import { useEffect } from "react";

export function DevSignature() {
  useEffect(() => {
    console.log(
      "%c¡Bienvenido al código! Construido con la precisión de La Máquina y la dedicación de un BTS ARMY. Open to work.",
      "background: #0d285c; color: #ffffff; font-size: 14px; font-weight: bold; padding: 12px 16px; border-radius: 6px; border-left: 4px solid #b10024;"
    );
  }, []);

  return null;
}
