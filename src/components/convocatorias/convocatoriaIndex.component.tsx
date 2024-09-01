import type { IUtilityResponse } from "@/interfaces/summons"
import { API } from "@/lib/utils/env";
import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";

interface Props {
    slug: string;
}

const ConvocatoriaIndexComponent: React.FC<Props> = (props) => {

    const [convocatoria, setConvocatoria] = useState<IUtilityResponse | null>(null)

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

    return (
        <>
            {
                convocatoria
                    ?
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
                        {JSON.stringify(convocatoria.userAlreadyIn)}
                        <a className=" bg-primary text-white flex flex-row items-center justify-center px-6 py-3 rounded-xl text-xs font-bold" href={`/convocatorias/${props.slug}/form`} target="_self">
                            <Icon icon="solar:document-add-bold" className=" mr-1 text-lg" />
                            Registrarme ahora
                        </a>
                    </div>
                    :
                    <></>
            }
        </>
    )
}

export default ConvocatoriaIndexComponent