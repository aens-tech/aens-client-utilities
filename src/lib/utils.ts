import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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