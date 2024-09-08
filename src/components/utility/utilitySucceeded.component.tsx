import type { IUtilityResponse } from '@/interfaces/utility';
import { getUtilityTypeFromLocalType } from '@/lib/utils';
import { API } from '@/lib/utils/env';
import { Icon } from '@iconify/react';
import { Button } from "@nextui-org/button";
import { Skeleton } from '@nextui-org/react';
import { useEffect, useState } from 'react';

interface Props {
    slug: string;
    utilityType: string;
}

const UtilitySucceededComponent: React.FC<Props> = (props) => {
    const [convocatoria, setConvocatoria] = useState<IUtilityResponse | null>(null)
    const [stateFetch, setStateFetch] = useState<'idle' | 'isLoading' | 'succeeded' | 'error'>('idle');

    useEffect(() => {
        const handleGetConvocatoria = async () => {
            try {
                setStateFetch("isLoading")

                console.log()

                const response = await fetch(`${API}/utility?slug=${props.slug}&type=${getUtilityTypeFromLocalType(props.utilityType)}&userEmail=${localStorage.getItem("userEmail")}`, {
                    method: "GET"
                })
    
                if (!response.ok) {
                    setStateFetch('error');
                    throw new Error("Failed to submit");
                }
    
                const conv = await response.json()
    
                if (!conv) return;
    
                setStateFetch("succeeded")
                setConvocatoria(conv)

            } catch (err) {

            }
        }

        if (!localStorage.getItem("userEmail")){
            window.location.href = `/${props.utilityType}/${props.slug}`
        }

        handleGetConvocatoria()
    }, [])

    if (stateFetch === "error") {
        return <p>Hubo un error con lo que estas pidiendo a la plataforma.</p>
    }

    if (stateFetch === "isLoading" || stateFetch === "idle") {
        return (
            <div className="flex flex-col items-end w-full space-y-6">
                <div className=" flex flex-col w-full items-center">
                    <Skeleton className=" flex w-[150px] h-[150px] rounded-lg"/>
                </div>
                <div className=" flex flex-col space-y-2 w-full">
                    <Skeleton className=" flex w-full h-[15px] rounded-lg"/>
                    <Skeleton className=" flex w-full h-[15px] rounded-lg"/>
                    <Skeleton className=" flex w-1/2 h-[15px] rounded-lg"/>
                </div>
                {/* <Skeleton className=" flex w-[150px] h-[40px] rounded-lg"/> */}
            </div>
        )
    }

    return (
        <div className="flex flex-col items-end h-full space-y-2">
            {
                props.utilityType === "convocatoria"
                ?
                    <Icon
                        icon="solar:check-circle-bold"
                        className="text-primary text-[200px] mb-2 w-full"
                    />
                    :
                    <Icon
                        icon="solar:check-circle-bold"
                        className="text-primary text-[200px] mb-2 w-full"
                    />
            }
            <h1 className="font-extrabold text-xl text-center w-full">
                {
                    props.utilityType === "convocatoria"
                        ?
                        "¡Quedó Listo!"
                        :
                        "¡Estas por iniciar tu descarga!"
                }
            </h1>
            {
                props.utilityType === "convocatoria"
                    ?
                    <p className="text-base">
                        Nos estaremos comunicando contigo por medio por medio de correo
                        electrónico, tu número de teléfono y por medio de videos en nuestras
                        redes sociales. ¡Mantente al tanto para no perderte nada!
                    </p>
                    :
                    <p className="text-base">
                        Haz click en el botón para iniciar con tu descarga.
                    </p>
            }

            {
                props.utilityType === "descarga" &&
                <Button 
                    className="text-base w-full"
                    // color={stateFetch === "isLoading" ? "default" : "primary"}
                    // isDisabled={stateFetch === "isLoading"}
                    color={"primary"}
                    onClick={() => {
                        window.location.href = convocatoria!.url ?? ""
                    }}
                >
                    Descargar
                </Button>
            }
        </div>
    )
}

export default UtilitySucceededComponent