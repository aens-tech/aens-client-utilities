import type { IUtilityResponse } from "@/interfaces/utility"
import { API } from "@/lib/utils/env";
import { useEffect, useState } from "react";

import { Icon } from '@iconify/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

interface Props {
    slug: string;
    utlityType: string;
}

const ConvocatoriaIndexComponent: React.FC<Props> = (props) => {
    const [convocatoria, setConvocatoria] = useState<IUtilityResponse | null>(null)
    const [state, setState] = useState<'idle' | 'isLoading' | 'succeeded' | 'error'>('idle');

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        const handleGetConvocatoria = async () => {
            const req = await fetch(`${API}/utility?slug=${props.slug}&userEmail=${localStorage.getItem("userEmail")}`, {
                method: "GET"
            })

            const conv = await req.json()

            if (!conv) return;

            setConvocatoria(conv)
        }

        handleGetConvocatoria()
    }, [])

    const getUtilityTypeFromLocalType = () => {
        switch (props.utlityType){
            case "convocatoria":
                return "SUMMON"
                break;
            case "descarga":
                return "DOWNLOAD"
                break;
        }
    }

    const getActionFromUtilityType = () => {
        switch (props.utlityType){
            case "convocatoria":
                return "JOIN_SUMMON"
                break;
            case "descarga":
                return "DOWNLOAD_ELEMENT"
                break;
        }
    }

    const handleInscribirseOnOneClick = async () => {
        try {
            setState('isLoading');

            const response = await fetch(`${API}/utility/action`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: localStorage.getItem("userEmail"),
                    interests: convocatoria?.interests,
                    action: getActionFromUtilityType(),
                    utilityType: "SUMMON",
                    slug: props.slug
                })
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            setState('succeeded');

            window.location.href = `/convocatorias/${props.slug}/succeeded`

        } catch (error) {
            setState('error');
            console.error("Error submitting form:", error);
        } finally {
            setState('idle');
        }

    }

    return (
        <>
            {
                convocatoria
                    ?
                    <>
                        <div className=" flex flex-col items-end">
                            <Icon
                                icon="solar:square-academic-cap-bold"
                                className="text-primary text-[60px] mb-2 w-full"
                            />
                            <h1 className="font-extrabold text-xl text-center mb-4">
                                {convocatoria.name}
                            </h1>
                            <p className=" text-base mb-4">
                                {convocatoria!.description ?? "test"}
                            </p>
                            <a
                                className=" bg-primary text-white flex flex-row items-center justify-center px-6 py-3 rounded-xl text-xs font-bold"
                                href={convocatoria.userAlreadyIn ? undefined : `/convocatorias/${props.slug}/form`}
                                target="_self"
                                onClick={convocatoria.userAlreadyIn ? onOpen : undefined}
                            >
                                <Icon icon="solar:document-add-bold" className=" mr-1 text-lg" />
                                {convocatoria.userAlreadyIn ? "Inscribirme Ahora" : "Registrarme ahora"}
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
                                            <Button color="danger" variant="light" onPress={() => window.location.href = `/convocatorias/${props.slug}/form`}>
                                                Usar otra información
                                            </Button>
                                            <Button color={state === "idle" ? "primary" : "default"} disabled={state === "idle" ? false : true} onClick={() => handleInscribirseOnOneClick()}>
                                                Si, inscribirme
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