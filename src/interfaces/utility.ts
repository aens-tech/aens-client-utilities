export interface IUtilityResponse {
    name: string;
    description: string;
    date: string;
    isEnabled: boolean;
    slug: string;
    type: string;
    interests: string[];
    userAlreadyIn: boolean;
    url?: string;
}

export type TStatus = "IDLE" | "LOADING" | "SUCCEDED" | "ERROR"



export enum INTERESTS {
    EDUCATION_TECH = "EDUCATION_TECH",
    TEACHER_TECH = "TEACHER_TECH",
    EDUCATION_BUSINESS = "EDUCATION_BUSINESS",
    EDUCATION_AI = "EDUCATION_AI",
    EMAIL_MARKETING = "EMAIL_MARKETING",
    DESIGN = "DESIGN",
    DISCOUNTS = "DISCOUNTS",
}

export enum CONTACT_ACTIONS {
    JOIN_SUMMON = "JOIN_SUMMON",
    LEFT_SUMMON = "LEFT_SUMMON",
    DOWNLOAD_ELEMENT = "DOWNLOAD_ELEMENT",
}

export enum UTILITY_TYPES {
    SUMMON = "SUMMON",
    DOWNLOAD = "DOWNLOAD",
}

export interface IUtility {
    name: string; // Propiedad obligatoria
    description?: string; // Propiedad opcional
    date?: string; // Propiedad opcional
    isEnabled: boolean; // Propiedad obligatoria
    url?: string; // Propiedad opcional
    slug: string; // Propiedad obligatoria, única (controlado a nivel de lógica externa)
    type: UTILITY_TYPES; // Propiedad obligatoria, restringida a valores del enum UTILITY_TYPES
    interests: INTERESTS[]; // Propiedad obligatoria, array de valores restringidos a INTERESTS
}