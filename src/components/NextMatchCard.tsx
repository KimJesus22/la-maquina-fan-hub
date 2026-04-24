import Image from "next/image";

export default function NextMatchCard() {
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
          <div className="relative w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-2 overflow-hidden border-2 border-primary/20">
            <Image
              alt="Minimalist abstract crest logo featuring a blue cross on a white shield background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa71dKoI04gNw9-gFV5f73PYTW5wvG1BrUmu2mkmiY0Y8qu8V-SeuH3a7ygJOIyK21aVohg4Ych_suujLbb7UOesjdUwhxIxLJhO5Md7edc8sXgaNy_-dUXhi1nBKww1-40w0aeb_ZvVIByX6QswSFcIZyvP4qurwEKHjPxpyKK8wwGCPj9GE9dXPRmetxWd_6EjTFL0rrSDSNEJKgDl3RubWcE3Q3ClvsH02WmDUiOZ8m5bg3_l_Xt-CgmWLxvOXRI8gWcj-RJxpX"
              fill
              className="object-contain p-2"
            />
          </div>
          <span className="font-headline-md text-headline-md text-primary font-lexend font-semibold">
            Cruz Azul
          </span>
        </div>
        {/* Match Info & Countdown */}
        <div className="flex flex-col items-center gap-unit flex-1 text-center border-y md:border-y-0 md:border-x border-outline-variant py-gutter md:py-0 px-gutter">
          <span className="font-label-md text-label-md text-secondary">
            Liga MX - Jornada 12
          </span>
          <span className="font-stat-lg text-stat-lg text-on-background my-2 font-lexend font-black">
            VS
          </span>
          <span className="font-body-md text-body-md text-on-surface-variant">
            Estadio Azteca
          </span>
          <div className="mt-element-gap flex gap-4">
            <div className="flex flex-col items-center">
              <span className="font-headline-lg text-headline-lg text-primary font-lexend font-bold">
                03
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
                14
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
                59
              </span>
              <span className="font-label-md text-label-md text-secondary text-[10px]">
                MIN
              </span>
            </div>
          </div>
        </div>
        {/* Away Team */}
        <div className="flex flex-col items-center gap-unit flex-1">
          <div className="relative w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-2 overflow-hidden border-2 border-outline-variant">
            <Image
              alt="Abstract eagle crest logo in yellow and blue colors on a white background"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7WouaNHj__haDm40ClzPObcv0EQZhk9yJHhdpPgaXW8GKjb8hsUAdvmuhgkCE70xRWy6lU_Gqek-PirFUKzHbwSp4gJDs_S7ycLdXsyPHWXuKz0ZDV2F-haSS97N30bV42gx0zrxUVu8GdZd1WydM1_5hsBDUwB8MSCw8JWRxOYz2EP0srgCzMGBBdRWVq9T37Txpd6G8sFE3AZaUCxqHvVIsOCKai3Ue3_AKy6I7Z5IrM_wnbXZEzIsolog9ejsXISGNl6PDKXXu"
              fill
              className="object-contain opacity-80 p-2"
            />
          </div>
          <span className="font-headline-md text-headline-md text-on-surface-variant font-lexend font-semibold">
            Club América
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
