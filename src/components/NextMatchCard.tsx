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
    <section className="py-section-gap px-margin-mobile md:px-6 bg-surface-container-lowest dark:bg-slate-950 border-b border-surface-variant dark:border-slate-800 relative z-20 -mt-16 max-w-5xl mx-auto rounded-t-xl shadow-[0_-8px_30px_rgba(0,48,99,0.1)] dark:shadow-none transition-colors duration-300">
      <div className="flex flex-col items-center text-center gap-element-gap mb-gutter">
        <span className="bg-tertiary text-on-tertiary font-label-md text-label-md px-3 py-1 rounded-full uppercase tracking-widest animate-pulse flex items-center gap-2">
          <span className="w-2 h-2 bg-on-tertiary rounded-full"></span> Próximamente
        </span>
        <h2 className="font-headline-xl text-headline-xl text-primary font-lexend font-bold">
          Próximo Partido
        </h2>
      </div>
      
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-primary/10 dark:border-slate-800 p-gutter flex flex-col md:flex-row items-center justify-between gap-gutter shadow-sm transition-colors duration-300">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-unit flex-1">
          <img
            alt="Cruz Azul"
            src="https://scontent.fbjx1-3.fna.fbcdn.net/v/t1.6435-9/34386199_2051058288299294_4514711669837922304_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=RtIAk7bVm9sQ7kNvwFL-n7o&_nc_oc=AdpPzbdzLO4_A9T9Q1OaA1kUQruxeecndV2KR6JM8PjLdq-KcUF_VZndyUADyr7csCU&_nc_zt=23&_nc_ht=scontent.fbjx1-3.fna&_nc_gid=JbdhpIVbqcSBIEI74TBoBw&oh=00_Af2D9oOMGXGEg9AHTch0N3ynZ7Hc7gB3ertl9UdxyyHM7g&oe=6A131EE5"
            className="w-24 h-24 object-contain mb-2 rounded-full mix-blend-multiply drop-shadow-sm"
          />
          <span className="font-headline-md text-headline-md text-primary font-lexend font-semibold">
            Cruz Azul
          </span>
        </div>

        {/* Match Info & Countdown */}
        <div className="flex flex-col items-center gap-unit flex-1 text-center border-y md:border-y-0 md:border-x border-outline-variant py-gutter md:py-0 px-gutter">
          <span className="font-label-md text-label-md text-secondary dark:text-slate-400 transition-colors">
            Liga MX - Jornada 17
          </span>
          <span className="font-stat-lg text-stat-lg text-on-background dark:text-slate-100 my-2 font-lexend font-black transition-colors">
            VS
          </span>
          <span className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 transition-colors">
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
            src="https://scontent.fbjx1-3.fna.fbcdn.net/v/t39.30808-6/441212964_850057420495855_323226466028844851_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=hPNTzpxfe9kQ7kNvwFfopaV&_nc_oc=Adoj2KlqJIXDYZZUeldXquSsiJrsoMJk0uxTB4CbvZqjoPSgU1z7gx7pcXYxHtenVMk&_nc_zt=23&_nc_ht=scontent.fbjx1-3.fna&_nc_gid=vZlQy9swojzWjkZfHGMQNg&oh=00_Af3MYRTpcdWYW2Oo38AMh6zC3Pxel-nixPgKhPNSwgkb4g&oe=69F1B086"
            className="w-24 h-24 object-contain mb-2 rounded-full mix-blend-multiply drop-shadow-sm"
          />
          <span className="font-headline-md text-headline-md text-on-surface-variant font-lexend font-semibold">
            Necaxa
          </span>
        </div>
      </div>

      <div className="mt-element-gap flex justify-center w-full md:w-auto">
        <button className="w-full md:w-auto bg-surface-container text-primary font-label-md text-label-md px-6 py-3 rounded border border-primary/20 hover:bg-surface-container-high hover:border-primary transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-container focus:ring-offset-2">
          Comprar Boletos
        </button>
      </div>
    </section>
  );
}
