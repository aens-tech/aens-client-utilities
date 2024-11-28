import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"

const AuthComponent = () => {
    return (

        <div className=" flex flex-row w-screen h-[100vh]">
            <div className=" flex flex-col w-[600px] h-full p-12 space-y-3 items-end justify-center">
                <h1 className=" flex w-full font-semibold text-3xl">Inicia Sesión</h1>
                <p className=" flex w-full text-black/80 font-light pb-4">Introduce tus credenciales para acceder al panel de control.</p>
                <div className=" flex flex-col w-full space-y-3">
                    <Input label="Correo" type="email"/>
                    <Input label="Contraseña" type="password"/>
                </div>
                <Button color="primary" className="font-semibold">Iniciar</Button>
            </div>
            <div className=" flex flex-col w-full h-full p-8 bg-primary">
            </div>
        </div>
    )
}

export default AuthComponent