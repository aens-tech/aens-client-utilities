import { API_URL } from "@/lib/utils/env";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/button";
import { Tabs, Tab } from "@nextui-org/tabs";
import { useEffect, useState } from "react";

const DATA: {
    categoryId: string;
    icon: string;
    categoryLabel: string;
}[] = [
        {
            categoryId: "SUMMON",
            categoryLabel: "Convocatorias",
            icon: "solar:users-group-two-rounded-bold"
        },
        {
            categoryId: "DOWNLOAD",
            categoryLabel: "Descargas",
            icon: "solar:download-square-bold"
        }
    ]

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

// Definimos las interfaces

export interface IUtility {
    name: string; // Propiedad obligatoria
    description?: string; // Propiedad opcional
    date?: Date; // Propiedad opcional
    isEnabled: boolean; // Propiedad obligatoria
    url?: string; // Propiedad opcional
    slug: string; // Propiedad obligatoria, única (controlado a nivel de lógica externa)
    type: UTILITY_TYPES; // Propiedad obligatoria, restringida a valores del enum UTILITY_TYPES
    interests: INTERESTS[]; // Propiedad obligatoria, array de valores restringidos a INTERESTS
}

const AdminDashboardComponent = () => {

    return (
        <>
            <header className=" flex flex-col w-full items-center space-y-4">
                <a
                    className=" flex w-full"
                    href="/admin/createUtility"
                >
                    <Button
                        color="primary"
                        className="w-full"
                        startContent={
                            <Icon icon={"solar:add-square-bold"} fontSize={20} />
                        }
                    >Crear Nueva Utilidad</Button>
                </a>
                <Tabs aria-label="Options" color="primary" variant="bordered" items={DATA}>
                    {(item) => (
                        <Tab
                            key={item.categoryId}
                            title={
                                <div className=" flex flex-row w-full items-center space-x-1">
                                    <Icon icon={item.icon} fontSize={18} />
                                    <span className="">{item.categoryLabel}</span>
                                </div>
                            }
                            className=" flex w-full"
                        >
                            <TabContent categoryId={item.categoryId} />
                        </Tab>
                    )}
                </Tabs>
            </header>
        </>
    )
}

const TabContent = ({ categoryId }: { categoryId: string }) => {

    const [utilityFetchState, setUtilityFetchState] = useState<"IDLE" | "LOADING" | "SUCCEDED" | "ERROR">("IDLE")
    const [utilities, setUtilities] = useState<IUtility[]>([])

    const handleFetchUtils = async () => {
        setUtilityFetchState("LOADING")

        const response = await fetch(`${API_URL}/utility/`, {
            method: "GET"
        })

        if (response.status !== 200) {
            setUtilityFetchState("ERROR")
            return
        }

        const data: {
            data: IUtility[]
        } = await (response.json())

        console.log(data)
        setUtilities([...data.data])
        setUtilityFetchState("LOADING")
    }

    useEffect(() => {
        handleFetchUtils()
    }, [])

    return (
        <div className=" flex flex-row w-full space-y-2 flex-wrap">
            {utilities.filter((v) => v.type === categoryId).map((v) =>
                <a
                    href={`/admin/${categoryId.toLowerCase()}/${v.slug}`}
                    className=" flex flex-col p-3 bg-default-100 border border-default-200 rounded-lg w-full space-y-2"
                >
                    <div>
                        <h1 className=" font-bold text-primary">{v.name}</h1>
                        <h2 className=" text-default-500 font-extralight text-sm">{v.slug}</h2>
                    </div>
                </a>
            )}
        </div>
    )
}

export default AdminDashboardComponent