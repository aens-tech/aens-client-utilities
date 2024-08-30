import { Button, Input } from "@nextui-org/react"
import type { IConvocatoria } from "@/content/conv"
import { Icon } from '@iconify/react';


interface Props {
    conv: IConvocatoria | undefined;
    path: string;
}

const MainFormComponent : React.FC<Props> = (props) => {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        console.log(event.currentTarget.elements)
        event.preventDefault()
    }

    return (

        <form action="" className=" flex flex-col w-full h-full justify-center items-end" onSubmit={(e) => handleSubmit(e)}>
            {
                props.conv?.data_screen.fields.map((v) => {
                    return <Input label={v.label} className="mb-2" type={v.type}/>
                })
            }
            <button type="submit" className=" bg-primary w-fit text-white flex flex-row items-center justify-center px-4 py-3 rounded-xl text-xs font-bold">
                <Icon icon={props.conv!.first_screen.call_to_action_icon} className=" mr-1 text-lg"></Icon>
                {props.conv?.first_screen.call_to_action}
                {/* <!-- {`${currentPath}/form`} --> */}
            </button>
        </form>
    )
}

export default MainFormComponent