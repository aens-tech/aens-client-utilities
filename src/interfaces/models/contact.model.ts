export enum CONTACT_ACTIONS {
    JOIN_SUMMON = "JOIN_SUMMON",
    LEFT_SUMMON = "LEFT_SUMMON",
    DOWNLOAD_ELEMENT = "DOWNLOAD_ELEMENT",
}

export interface IContact {
    name?: string; // Nombre opcional
    email: string; // Email obligatorio
    phone?: string; // Teléfono opcional
    birthday?: string; // Fecha de cumpleaños opcional
    interests: string[]; // Array de intereses obligatorio
}
