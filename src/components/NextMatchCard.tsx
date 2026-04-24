"use client";

import { useState, useEffect } from "react";

export default function NextMatchCard() {
  const targetDate = new Date("2026-04-26T19:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    updateCountdown(); // Ejecución inmediata
    const timerId = setInterval(updateCountdown, 60000); // Actualización cada minuto

    return () => clearInterval(timerId);
  }, [targetDate]);

  // Función para rellenar ceros a la izquierda
  const pad = (num: number) => String(num).padStart(2, "0");

  return (
    <section className="py-section-gap px-margin-mobile md:px-6 bg-surface-container-lowest border-b border-surface-variant relative z-20 -mt-16 max-w-5xl mx-auto rounded-t-xl shadow-[0_-8px_30px_rgba(0,48,99,0.1)]">
      <div className="flex flex-col items-center text-center gap-element-gap mb-gutter">
        <span className="bg-tertiary text-on-tertiary font-label-md text-label-md px-3 py-1 rounded-full uppercase tracking-widest animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 bg-on-tertiary rounded-full"></span> Próximamente
        </span>
        <h2 className="font-headline-xl text-headline-xl text-primary font-lexend font-bold">
          Próximo Partido
        </h2>
      </div>
      
      <div className="bg-white rounded-xl border border-primary/10 p-gutter flex flex-col md:flex-row items-center justify-between gap-gutter shadow-sm">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-unit flex-1">
          <img
            alt="Cruz Azul"
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Cruz_Azul_logo_%282022%29.svg"
            className="w-20 h-20 object-contain mb-2 drop-shadow-sm"
          />
          <span className="font-headline-md text-headline-md text-primary font-lexend font-semibold">
            Cruz Azul
          </span>
        </div>

        {/* Match Info & Countdown */}
        <div className="flex flex-col items-center gap-unit flex-1 text-center border-y md:border-y-0 md:border-x border-outline-variant py-gutter md:py-0 px-gutter">
          <span className="font-label-md text-label-md text-secondary">
            Liga MX - Jornada 17
          </span>
          <span className="font-stat-lg text-stat-lg text-on-background my-2 font-lexend font-black">
            VS
          </span>
          <span className="font-body-md text-body-md text-on-surface-variant">
            Estadio Ciudad de los Deportes
          </span>
          
          <div className="mt-element-gap flex gap-4">
            <div className="flex flex-col items-center">
              <span className="font-headline-lg text-headline-lg text-primary font-lexend font-bold">
                {isMounted ? pad(timeLeft.days) : "--"}
              </span>
              <span className="font-label-md text-label-md text-secondary text-[10px]">
                DÍAS
              </span>
            </div>
            <span className="font-headline-lg text-headline-lg text-outline-variant font-lexend font-bold">
              :
            </span>
            <div className="flex flex-col items-center">
              <span className="font-headline-lg text-headline-lg text-primary font-lexend font-bold">
                {isMounted ? pad(timeLeft.hours) : "--"}
              </span>
              <span className="font-label-md text-label-md text-secondary text-[10px]">
                HRS
              </span>
            </div>
            <span className="font-headline-lg text-headline-lg text-outline-variant font-lexend font-bold">
              :
            </span>
            <div className="flex flex-col items-center">
              <span className="font-headline-lg text-headline-lg text-tertiary font-lexend font-bold">
                {isMounted ? pad(timeLeft.minutes) : "--"}
              </span>
              <span className="font-label-md text-label-md text-secondary text-[10px]">
                MIN
              </span>
            </div>
          </div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-unit flex-1">
          <img
            alt="Necaxa"
            src="https://upload.wikimedia.org/wikipedia/en/2/29/Club_Necaxa_logo.svg"
            className="w-20 h-20 object-contain mb-2 drop-shadow-sm"
          />
          <span className="font-headline-md text-headline-md text-on-surface-variant font-lexend font-semibold">
            Necaxa
          </span>
        </div>
      </div>

      <div className="mt-element-gap flex justify-center">
        <button className="bg-surface-container text-primary font-label-md text-label-md px-6 py-3 rounded border border-primary/20 hover:bg-surface-container-high hover:border-primary transition-all">
          Comprar Boletos
        </button>
      </div>
    </section>
  );
}
