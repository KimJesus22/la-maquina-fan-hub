export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      {/* Spinner azul/blanco */}
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500" />
        <div
          className="absolute inset-2 animate-spin rounded-full border-2 border-white/10 border-b-white/70"
          style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
        />
      </div>
      <p className="text-sm font-medium text-zinc-400">Cargando…</p>
    </div>
  );
}
