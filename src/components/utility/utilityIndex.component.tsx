import type { IUtilityResponse } from "@/interfaces/utility"
import { API } from "@/lib/utils/env";
import { useEffect, useState } from "react";

import { Icon } from '@iconify/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { getActionFromUtilityType, getUtilityTypeFromLocalType } from "@/lib/utils";

interface Props {
    slug: string;
    utilityType: string;
}

const ConvocatoriaIndexComponent: React.FC<Props> = (props) => {
    const [convocatoria, setConvocatoria] = useState<IUtilityResponse | null>(null)
    const [stateFetch, setStateFetch] = useState<'idle' | 'isLoading' | 'succeeded' | 'error'>('idle');
    const [state, setState] = useState<'idle' | 'isLoading' | 'succeeded' | 'error'>('idle');

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        const handleGetConvocatoria = async () => {
            try {
                setStateFetch("isLoading")

                const response = await fetch(`${API}/utility?slug=${props.slug}&type=${getUtilityTypeFromLocalType(props.utilityType)}&userEmail=${localStorage.getItem("userEmail")}`, {
                    method: "GET"
                })

                if (!response.ok) {
                    setState('error');
                    throw new Error("Failed to submit");
                }

                const conv = await response.json()

                if (!conv) return;

                setStateFetch("succeeded")
                setConvocatoria(conv)

            } catch (err) {

            }
        }

        handleGetConvocatoria()
    }, [])

    const handleInscribirseOnOneClick = async () => {
        try {
            setState('isLoading');

            console.log(convocatoria!.interests)

            const response = await fetch(`${API}/utility/action`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: localStorage.getItem("userEmail"),
                    interests: convocatoria!.interests,
                    action: getActionFromUtilityType(props.utilityType),
                    utilityType: getUtilityTypeFromLocalType(props.utilityType),
                    slug: props.slug
                })
            });

            if (!response.ok) {
                setState('error');
                throw new Error("Failed to submit");
            }

            setState('succeeded');

            window.location.href = `/${props.utilityType}/${props.slug}/succeeded`

        } catch (error) {
            setState('error');
            console.error("Error submitting form:", error);
        }

    }

    if (state === "error") {
        return <p className=" font-bold">
            ¡Ups! No hemos podido encontrar lo que buscabas
        </p>
    }

    return (
        <>
            {
                convocatoria
                    ?
                    <>
                        <div className=" flex flex-col items-end">
                            {
                                props.utilityType === "convocatoria"
                                    ?
                                    <Icon
                                        icon="solar:square-academic-cap-bold"
                                        className="text-primary text-[60px] mb-2 w-full"
                                    />
                                    :
                                    <Icon
                                        icon="solar:download-square-bold"
                                        className="text-primary text-[60px] mb-2 w-full"
                                    />
                            }
                            <h1 className="font-extrabold text-xl text-center mb-4">
                                {convocatoria.name}
                            </h1>
                            <p className=" text-base mb-4">
                                {convocatoria!.description ?? "test"}
                            </p>
                            <a
                                className=" bg-primary text-white flex flex-row items-center justify-center px-6 py-3 rounded-xl text-xs font-bold"
                                href={localStorage.getItem("userEmail") ? undefined : `/${props.utilityType}/${props.slug}/form`}
                                target="_self"
                                onClick={localStorage.getItem("userEmail") ? onOpen : undefined}
                            >
                                <Icon icon={props.utilityType === "convocatoria" ? "solar:document-add-bold" : "solar:file-download-bold"} className=" mr-1 text-lg" />
                                {
                                    localStorage.getItem("userEmail")
                                        ? props.utilityType === "convocatoria"
                                            ? "Inscribirme Ahora"
                                            : "Descargar ahora"
                                        : "Registrarme"
                                }
                            </a>
                        </div>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="sm">
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Confirmemos tu información.</ModalHeader>
                                        <ModalBody>
                                            <p className=" flex flex-row flex-wrap">
                                                ¿Tu correo es <span className=" font-semibold italic mx-[3px]">{localStorage.getItem("userEmail")}</span>?
                                            </p>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={() => window.location.href = `/convocatoria/${props.slug}/form`}>
                                                Usar otra información
                                            </Button>
                                            <Button color={state === "idle" ? "primary" : "default"} disabled={state === "idle" ? false : true} onClick={() => handleInscribirseOnOneClick()}>
                                                {
                                                    props.utilityType === "convocatoria"
                                                        ? "Si, inscribirme"
                                                        : "Si, descargar"
                                                }
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </>
                    :
                    <></>
            }
        </>
    )
}

export default ConvocatoriaIndexComponent