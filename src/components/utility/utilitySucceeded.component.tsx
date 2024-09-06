import type { IUtilityResponse } from '@/interfaces/utility';
import { getUtilityTypeFromLocalType } from '@/lib/utils';
import { API } from '@/lib/utils/env';
import { Icon } from '@iconify/react';
import { Button } from "@nextui-org/button";
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

        handleGetConvocatoria()
    }, [])

    if (stateFetch === "error") {
        return <p>Hubo un error con lo que estas pidiendo a la plataforma.</p>
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
                    color={stateFetch === "isLoading" ? "default" : "primary"}
                    isDisabled={stateFetch === "isLoading"}
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