import API from "@/API/API"
import { IUtility, TStatus } from "@/interfaces/utility"
import { API_URL } from "@/lib/utils/env"
import components from "@/lib/utils/formity/formityComponents"
import fastUserRegisterSchema from "@/lib/utils/formity/schemas/fastUserRegister.formitySchema"
import { Icon } from "@iconify/react/dist/iconify.js"
import { getLocalTimeZone, parseDate, today } from "@internationalized/date"
import { Button, Spinner } from "@nextui-org/react"
import { Formity } from "formity"
import { useEffect, useState } from "react"

interface CustomProps {
    slug?: string
}

const CreateUtilityComponent: React.FC<CustomProps> = ({
    slug
}) => {

    const [fetchUtilityState, setFetchUtilityState] = useState<TStatus>("IDLE")
    const [utilityFetchedData, setUtilityFetchedData] = useState<IUtility | null>(null)

    const [requestState, setRequestState] = useState<TStatus>("IDLE")

    const handleReturn = async (data: unknown) => {
        setRequestState("LOADING")
        console.log("Returned!", data)

        const temp = !!slug
            ? await API.putUtility(data)
            : await API.postUtility(data as Object)

        if (temp.status !== 200) {
            setRequestState("ERROR")
        }

        setRequestState("SUCCEDED")
    }

    const handleGetUtiltityData = async () => {
        setRequestState("LOADING")

        const temp = await API.getUtility(slug)

        if (temp.status !== 200) {
            setRequestState("ERROR")
            return
        }

        setUtilityFetchedData(temp.data)
        setRequestState("IDLE")
    }

    useEffect(() => {
        if (!slug) return
        handleGetUtiltityData()
    }, [])

    const renderer = () => {
        switch (requestState) {
            case "IDLE":
            case "ERROR":
                // @ts-ignore
                return <Formity components={components} schema={fastUserRegisterSchema} variables={utilityFetchedData ?
                    {
                        ...utilityFetchedData,
                        date: parseDate((utilityFetchedData.date as string).split("T")[0]).toDate(getLocalTimeZone()).toISOString().split("T")[0],
                    }
                    : {
                        date: today(getLocalTimeZone()).toDate(getLocalTimeZone()).toISOString().split("T")[0],
                        type: [],
                        interests: [],
                    }} onReturn={handleReturn} />
            case "LOADING":
                return <Spinner />
            case "SUCCEDED":
                return <div className=" flex flex-col w-full space-y-4 text-center text-default-600 font-light">
                    {
                        !!slug
                            ?
                            <p>Se ha actualizado la utilidad de forma exitosa.</p>
                            :
                            <p>Utilidad creada exitosamente.</p>
                    }
                    <a
                        href="/admin"
                    >
                        <Button
                            color="primary"
                            className=" w-full"
                            startContent={
                                <Icon icon="solar:home-angle-bold" fontSize={20} />
                            }
                        >
                            Volver a el menú principal
                        </Button>
                    </a>
                </div>
        }
    }

    return (
        <>
            {
                renderer()
            }
            {/* {
                <pre className=" flex w-[200px] text-wrap">
                    {JSON.stringify(utilityFetchedData, null, 2)}
                </pre>
            } */}
        </>
    )
}

export default CreateUtilityComponent