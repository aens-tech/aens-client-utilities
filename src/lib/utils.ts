// Tremor Raw cx [v0.0.0]
import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

// Tremor Raw focusInput [v0.0.1]

export const focusInput = [
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-blue-200 focus:dark:ring-blue-700/30",
  // border color
  "focus:border-blue-500 focus:dark:border-blue-700",
]

// Tremor Raw focusRing [v0.0.1]

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
]

// Tremor Raw hasErrorInput [v0.0.1]

export const hasErrorInput = [
  // base
  "ring-2",
  // border color
  "border-red-500 dark:border-red-700",
  // ring color
  "ring-red-200 dark:ring-red-700/30",
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUtilityTypeFromLocalType = (data: string) => {
  switch (data){
      case "convocatoria":
          return "SUMMON"
      case "descarga":
          return "DOWNLOAD"
  }
}

export const getActionFromUtilityType = (data: string) => {
  switch (data){
      case "convocatoria":
          return "JOIN_SUMMON"
      case "descarga":
          return "DOWNLOAD_ELEMENT"
  }
}

export function ageCalculation(fechaNacimientoISO: string): number {
  const fechaNacimiento = new Date(fechaNacimientoISO);
  const hoy = new Date();

  const diferenciaAnios = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mesActual = hoy.getMonth();
  const diaActual = hoy.getDate();

  // Ajusta si el cumpleaños aún no ha ocurrido este año
  if (
    mesActual < fechaNacimiento.getMonth() || 
    (mesActual === fechaNacimiento.getMonth() && diaActual < fechaNacimiento.getDate())
  ) {
    return diferenciaAnios - 1;
  }

  return diferenciaAnios;
}