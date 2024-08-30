import type { IGenericInteractionData } from "../types/genericInteractionData.type";

interface IFormField {
    label: string;
    name: string;
    category: "EMAIL" | "NAME" | "PHONE" | "BIRTH";
    type?: "email" | "text" | "number" | "date";
}

export interface IConvocatoria extends IGenericInteractionData {
    first_screen: {
        icon: string;
        title: string;
        description: string;
        call_to_action: string;
        call_to_action_icon: string;
    },
    data_screen: {
        fields: IFormField[];
        call_to_action: string;
        call_to_action_icon: string;
    }
}

export const CONVOCATORIAS: IConvocatoria[] = [
    {
        base: {
            title: "Convocatoria",
            meta_description: "Convocatoria hecha para jovenes Cucuteños GRATIS en la institución X",
            category: "EDUCACION_JOVENES",
            slug: "capacitacion-estudiantes-x-1"
        },
        first_screen: {
            title: "CAPACITACIÓN IA PARA ESTUDIANTES DE LA INSTITUCIÓN EDUCATIVA X",
            description: `¡Bienvenid@ a esta convocatoria de AENS TECH! Registrarte es completamente gratis. Para tener el chance de participar, tendrás que llenar el siguiente formulario. Ten en cuenta que los cupos son limitados.`,
            icon: 'solar:square-academic-cap-bold',
            call_to_action: "Registrarme ahora",
            call_to_action_icon: "solar:document-add-bold"
        },
        data_screen: {
            fields: [
                {
                    label: "Nombre",
                    name: "name",
                    type: "text",
                    category: "NAME"
                },
                {
                    label: "Email",
                    name: "email",
                    type: "email",
                    category: "EMAIL"
                },
                {
                    label: "Número de Contacto (WhatsApp de ser posible)",
                    name: "phone",
                    type: "number",
                    category: "PHONE"
                },
                {
                    label: "Fecha de Nacimiento",
                    name: "birthday",
                    type: "date",
                    category: "BIRTH"
                },
            ],
            call_to_action: "Inscribirme",
            call_to_action_icon: "solar:document-add-bold"
        }
    }
]