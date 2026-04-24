"use client";

import { useState, useActionState } from "react";
import { signIn, signUp, type AuthState } from "@/app/actions/auth";
import { cn } from "@/lib/cn";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  // Estados locales para Poka-yoke
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword = password.length >= 6;
  const isFormValid = isValidEmail && isValidPassword;

  // Estados asíncronos para interactuar con Server Actions (InsForge)
  const [loginState, loginAction, loginPending] = useActionState<
    AuthState | undefined,
    FormData
  >(signIn, undefined);

  const [registerState, registerAction, registerPending] = useActionState<
    AuthState | undefined,
    FormData
  >(signUp, undefined);

  const isPending = mode === "login" ? loginPending : registerPending;
  const currentState = mode === "login" ? loginState : registerState;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
      onClick={onClose}
    >
      {/* Auth Card */}
      <div
        className="bg-surface dark:bg-slate-900 w-full max-w-md rounded-xl shadow-[0_20px_50px_rgba(0,27,61,0.5)] overflow-hidden flex flex-col relative border border-outline-variant/30 dark:border-slate-800 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-outline dark:text-slate-400 hover:text-on-surface dark:hover:text-white transition-colors p-2 rounded-full hover:bg-surface-variant dark:hover:bg-slate-800 z-10"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Header */}
        <div className="px-8 pt-10 pb-6 text-center">
          <div className="w-16 h-16 mx-auto bg-primary-container dark:bg-primary rounded-full flex items-center justify-center mb-6 shadow-md border-2 border-surface dark:border-slate-800">
            <span
              className="material-symbols-outlined text-on-primary dark:text-white text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              sports_soccer
            </span>
          </div>
          <h2 className="font-headline-md text-headline-md text-primary dark:text-white tracking-tight font-lexend font-bold transition-colors">
            {mode === "login" ? "Bienvenido de nuevo" : "Únete a La Máquina"}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400 mt-2 transition-colors">
            {mode === "login"
              ? "Ingresa a tu cuenta para continuar"
              : "Crea tu cuenta oficial de fan"}
          </p>
        </div>

        {/* Form */}
        <div className="px-8 pb-8 flex-1">
          <form
            action={mode === "login" ? loginAction : registerAction}
            className="flex flex-col gap-5"
          >
            {mode === "register" && (
              <div className="flex flex-col gap-1">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-outline dark:text-slate-500 group-focus-within:text-primary-container dark:group-focus-within:text-primary transition-colors">
                    <span className="material-symbols-outlined text-xl">person</span>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    className="block w-full pl-12 pr-4 py-4 bg-surface-container-low dark:bg-slate-950 border border-outline-variant dark:border-slate-800 rounded-lg text-on-surface dark:text-slate-100 font-body-md focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-primary focus:border-transparent transition-all peer placeholder-transparent"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-12 top-4 text-on-surface-variant dark:text-slate-400 font-body-md transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-surface dark:peer-focus:bg-slate-900 peer-focus:px-1 peer-focus:text-primary-container dark:peer-focus:text-primary peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:bg-surface dark:peer-[&:not(:placeholder-shown)]:bg-slate-900 peer-[&:not(:placeholder-shown)]:px-1"
                  >
                    Nombre (opcional)
                  </label>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-outline dark:text-slate-500 group-focus-within:text-primary-container dark:group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">mail</span>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  placeholder="Correo Electrónico"
                  className={cn(
                    "block w-full pl-12 pr-4 py-4 rounded-lg text-on-surface dark:text-slate-100 font-body-md focus:outline-none transition-all peer placeholder-transparent",
                    emailTouched && !isValidEmail
                      ? "bg-error-container/20 dark:bg-red-900/20 border-2 border-error focus:ring-2 focus:ring-error focus:border-transparent"
                      : "bg-surface-container-low dark:bg-slate-950 border border-outline-variant dark:border-slate-800 focus:ring-2 focus:ring-primary-container dark:focus:ring-primary focus:border-transparent"
                  )}
                />
                <label
                  htmlFor="email"
                  className={cn(
                    "absolute left-12 top-4 font-body-md transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-surface dark:peer-focus:bg-slate-900 peer-focus:px-1 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:bg-surface dark:peer-[&:not(:placeholder-shown)]:bg-slate-900 peer-[&:not(:placeholder-shown)]:px-1",
                    emailTouched && !isValidEmail
                      ? "text-error"
                      : "text-on-surface-variant dark:text-slate-400 peer-focus:text-primary-container dark:peer-focus:text-primary"
                  )}
                >
                  Correo Electrónico
                </label>
              </div>
              {emailTouched && !isValidEmail && (
                <span className="text-error text-xs ml-1 font-label-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  Ingresa un correo válido (ej: aficionado@cruzazul.mx)
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <div className="relative group">
                <div
                  className={cn(
                    "absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors",
                    passwordTouched && !isValidPassword
                      ? "text-error group-focus-within:text-error"
                      : currentState?.error
                        ? "text-error group-focus-within:text-error"
                        : "text-outline dark:text-slate-500 group-focus-within:text-primary-container dark:group-focus-within:text-primary"
                  )}
                >
                  <span className="material-symbols-outlined text-xl">lock</span>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                  placeholder="Contraseña"
                  className={cn(
                    "block w-full pl-12 pr-12 py-4 rounded-lg text-on-surface dark:text-slate-100 font-body-md focus:outline-none transition-all peer placeholder-transparent",
                    passwordTouched && !isValidPassword
                      ? "bg-error-container/20 dark:bg-red-900/20 border-2 border-error focus:ring-2 focus:ring-error focus:border-transparent"
                      : currentState?.error
                        ? "bg-error-container/20 dark:bg-red-900/20 border-2 border-error focus:ring-2 focus:ring-error focus:border-transparent"
                        : "bg-surface-container-low dark:bg-slate-950 border border-outline-variant dark:border-slate-800 focus:ring-2 focus:ring-primary-container dark:focus:ring-primary focus:border-transparent"
                  )}
                />
                <label
                  htmlFor="password"
                  className={cn(
                    "absolute left-12 top-4 font-body-md transition-all peer-focus:-top-2 peer-focus:text-xs peer-focus:bg-surface dark:peer-focus:bg-slate-900 peer-focus:px-1 peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:bg-surface dark:peer-[&:not(:placeholder-shown)]:bg-slate-900 peer-[&:not(:placeholder-shown)]:px-1",
                    passwordTouched && !isValidPassword
                      ? "text-error"
                      : currentState?.error
                        ? "text-error"
                        : "text-on-surface-variant dark:text-slate-400 peer-focus:text-primary-container dark:peer-focus:text-primary"
                  )}
                >
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-outline dark:text-slate-500 hover:text-on-surface dark:hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
              {passwordTouched && !isValidPassword && (
                <span className="text-error text-xs ml-1 font-label-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  Debe tener al menos 6 caracteres
                </span>
              )}
            </div>

            {/* Error Hint de InsForge (ej. credenciales inválidas) */}
            {currentState?.error && (
              <p className="font-label-md text-label-md text-error flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[14px]">
                  error
                </span>
                {currentState.error}
              </p>
            )}

            {mode === "login" && (
              <div className="flex justify-end">
                <a
                  href="#"
                  className="font-label-md text-label-md text-primary-container dark:text-primary hover:text-primary dark:hover:text-primary-fixed-dim underline-offset-2 hover:underline transition-all"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending || !isFormValid}
              className={cn(
                "w-full py-4 rounded-lg font-headline-lg text-headline-lg text-[18px] uppercase tracking-wide shadow-md transition-all mt-2 flex items-center justify-center gap-2 border-r-4",
                isPending || !isFormValid
                  ? "bg-outline-variant text-outline cursor-not-allowed border-transparent opacity-70 dark:bg-slate-800 dark:text-slate-500"
                  : "bg-primary-container dark:bg-primary text-on-primary dark:text-white hover:bg-primary hover:-translate-y-1 active:translate-y-0 border-tertiary-container dark:border-tertiary"
              )}
            >
              {isPending
                ? mode === "login"
                  ? "Iniciando..."
                  : "Creando..."
                : mode === "login"
                  ? "Iniciar Sesión"
                  : "Crear Cuenta"}
              {!isPending && (
                <span className="material-symbols-outlined">arrow_forward</span>
              )}
              {isPending && <Spinner />}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-surface-container-low dark:bg-slate-950 p-6 text-center border-t border-outline-variant/30 dark:border-slate-800 transition-colors">
          <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">
            {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setEmailTouched(false);
                setPasswordTouched(false);
              }}
              className="font-label-md text-label-md text-primary-container dark:text-primary hover:text-tertiary-container dark:hover:text-tertiary hover:underline transition-colors ml-1"
            >
              {mode === "login" ? "Regístrate" : "Inicia Sesión"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Mini componente spinner ───────────────────────────── */

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
