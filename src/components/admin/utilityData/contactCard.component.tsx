import { IContactActionData } from "@/interfaces/models/contactAction.model"
import { ageCalculation } from "@/lib/utils"

interface CustomProps {
    contactActionData: IContactActionData
}

const ContactCardComponent: React.FC<CustomProps> = ({
    contactActionData: data
}) => {
    return (
        <div className=" flex flex-col w-full p-4 bg-default-100 border border-default-200 rounded-lg">
            <h1 className=" font-semibold text-primary text-xl">{data.user.name} <span className=" text-sm font-medium text-default-800">({ageCalculation(data.user!.birthday ?? "")} años)</span></h1>
            <h2 className=" text-default-500 font-light">{data.user.email} - {data.user.phone}</h2>
            <p className=" font-light text-default-400 text-sm">Cantidad de veces registrado: {data.timesPerformed}</p>
            <small className=" text-default-500 font-light text-right">{data.date.split("T")[0]}</small>
        </div>
    )
}

export default ContactCardComponent