import { Button, Checkbox, Input } from "@nextui-org/react";
import type { IConvocatoria, IFormField } from "@/content/conv";
import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import zod, { date } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { API } from "@/lib/utils/env";
import type { IUtilityResponse } from "@/interfaces/utility";
import { getActionFromUtilityType, getUtilityTypeFromLocalType } from "@/lib/utils";

interface Props {
    conv: IUtilityResponse | undefined;
    path: string;
    interests: any;
    slug?: string;
    utilityType: string;
}

const MainFormComponent: React.FC<Props> = (props) => {
    const [formState, setFormState] = useState<'idle' | 'isLoading' | 'succeeded' | 'error'>('idle');
    const [acceptedTerms, setAcceptedTerms] = useState<boolean>(true);

    const RegisterSchema = zod.object({
        name: zod.string().min(3, { message: "Tu nombre tiene que tener por lo menos 3 letras." }),
        email: zod.string().email({ message: "No es un correo electrónico válido." }),
        phone: zod.string().min(1, { message: "El número de teléfono debe tener algún valor." }),
        birthday: zod.string().date("No es una fecha válida."),
    });

    const formInstance = useForm({
        resolver: zodResolver(RegisterSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            birthday: "",
        },
        criteriaMode: "all",
        shouldFocusError: true,
    });

    useEffect(() => {
        formInstance?.reset();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            setFormState('isLoading');

            // Crear una instancia de FormData
            console.log(data)

            const response = await fetch(`${API}/utility/action`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    userEmail: data.email,
                    userName: data.name,
                    userBirthday: data.birthday,
                    userPhone: data.phone,
                    interests: props.interests,
                    action: getActionFromUtilityType(props.utilityType),
                    utilityType: getUtilityTypeFromLocalType(props.utilityType),
                    slug: props.slug
                })
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            localStorage.setItem("userEmail", data.email)

            setFormState('succeeded');

            window.location.pathname = `/${props.utilityType}/${props.slug}/succeeded`

            console.log("data", data);
        } catch (error) {
            setFormState('error');
            console.error("Error submitting form:", error);
        } finally {
            setFormState('idle');
        }
    };

    return (
        <form
            className="flex flex-col w-full h-full justify-center items-end"
            onSubmit={formInstance?.handleSubmit(onSubmit)}
        >
            {
                ([
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
                ] as IFormField[]).map((v) => (
                    <>
                        <Input
                            label={v.label}
                            key={"input-" + v.name}
                            className="mb-2"
                            type={v.type}
                            {...formInstance?.register(v.name)}
                        />

                        {formInstance?.formState.errors[v.name] && (
                            <span className="text-xs text-red-500 w-full pb-3 -mt-1">
                                {formInstance?.formState.errors[v.name]?.message}
                            </span>
                        )}
                    </>
                ))
            }

            <Checkbox className=" mr-auto my-2" isSelected={acceptedTerms} onValueChange={(e) => setAcceptedTerms(e)}><small>Acepto la <a className=" text-primary font-bold" href="/tyc">política de tratamiento de datos, los términos, condiciones y restricciones</a>.</small></Checkbox>

            {/* {formState === 'isLoading' && <p>Enviando...</p>} */}
            {formState === 'succeeded' && <p>¡Formulario enviado con éxito!</p>}
            {formState === 'error' && <p className="text-red-500">Error al enviar el formulario, inténtalo de nuevo.</p>}

            <button
                disabled={!formInstance?.formState?.isValid || formState === 'isLoading' || !acceptedTerms}
                type="submit"
                className={`w-fit flex flex-row items-center justify-center px-4 py-3 rounded-xl text-xs font-bold text-white ${(!formInstance?.formState?.isValid || formState === 'isLoading' || !acceptedTerms) ? "bg-primary/20" : "bg-primary"
                    }`}
            >
                <Icon icon="solar:document-add-bold" className="mr-1 text-lg"></Icon>
                {formState === 'isLoading' ? "Enviando..." : "Inscribirme"}
            </button>
        </form>
    );
}


export default MainFormComponent;