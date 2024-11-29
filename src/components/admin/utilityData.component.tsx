import { API_URL } from "@/lib/utils/env";
import { useEffect, useRef, useState } from "react";
import { BarChart } from "../tremor/components/barChar";
import { IContactActionData, IContactActionGraphData } from "@/interfaces/models/contactAction.model";
import ContactCardComponent from "./utilityData/contactCard.component";
import { Button } from "@nextui-org/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/modal";
import { IUtility, UTILITY_TYPES } from "@/interfaces/utility";
import API from "@/API/API";
import { Spinner } from "@nextui-org/react";

import generatePDF from 'react-to-pdf';
import { download, generateCsv, mkConfig } from "export-to-csv";

interface CustomProps {
  slug: string;
  type: string;
}

interface IContactActionAnswer {
  graphData: IContactActionGraphData[]
  data: IContactActionData[]
}

const UtilityDataComponent: React.FC<CustomProps> = ({
  slug,
  type
}) => {
  const pdfRef = useRef<HTMLDivElement>(null)

  const [contactActionData, setContactActionData] = useState<IContactActionAnswer | null>(null)
  const [stateFetch, setStateFetch] = useState<'idle' | 'isLoading' | 'succeeded' | 'error'>('idle');

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [utilityFetchState, setUtilityFetchState] = useState<"IDLE" | "LOADING" | "SUCCEDED" | "ERROR">("IDLE")
  const [utility, setUtilities] = useState<IUtility | null>(null)

  const handleFetchUtils = async () => {
    setUtilityFetchState("LOADING")

    const response = await fetch(`${API_URL}/utility/${slug}`, {
      method: "GET"
    })

    if (response.status !== 200) {
      setUtilityFetchState("ERROR")
      return
    }

    const data: IUtility = await (response.json())

    console.log(data)
    setUtilities(data)
    setUtilityFetchState("SUCCEDED")
  }


  const handleGetConvocatoria = async () => {
    try {
      setUtilityFetchState("LOADING")

      console.log()

      const response = await API.getContactActions(slug)

      if (response.status !== 200) {
        setUtilityFetchState('ERROR');
        throw new Error("Failed to submit");
      }

      const conv: IContactActionAnswer | null = await response.data

      if (!conv) return;

      setUtilityFetchState("SUCCEDED")
      setContactActionData(conv)

    } catch (err) {

    }
  }

  const handleRemoveUtility = async () => {
    setUtilityFetchState("LOADING")

    const temp = await API.deleteUtility(slug)

    if (temp.status !== 200) {
      setUtilityFetchState('ERROR');
      return
    }

    setUtilityFetchState("SUCCEDED")
  }

  useEffect(() => {
    handleGetConvocatoria()
    handleFetchUtils()
  }, [])

  const generateExcel = () => {
    const csvConfig = mkConfig({ useKeysAsHeaders: true });

    // Converts your Array<Object> to a CsvOutput string based on the configs
    // @ts-ignore
    const csv = generateCsv(csvConfig)([...contactActionData!.data.map((v) => {

      v = {
        ...v,
        ...v.user,
        // @ts-ignore
        interests: v.user.interests.join(',')
      }

      // @ts-ignore
      v.user = undefined
      return v
    }
    )] ?? []);

    // Get the button in your HTML
    download(csvConfig)(csv)
  }

  const renderer = () => {
    switch (utilityFetchState) {
      case "IDLE":
      case "ERROR":
      case "LOADING":
        return <Spinner />
      case "SUCCEDED":
        return <div className=" flex flex-col w-full space-y-2">
          <p className=" flex text-sm text-default-600">Sobre esta utilidad</p>
          <div className=" flex flex-row w-full justify-end space-x-2">
            <a
              className=" w-full"
              href={`/admin/createUtility/${slug}`}
            >
              <Button
                color="primary"
                className=" text-white w-full"
                startContent={
                  <Icon icon={"solar:pen-new-square-bold"} fontSize={25} />
                }
              >Editar
              </Button>
            </a>
            <a
              className=" w-full"
              href={`/${utility!.type === UTILITY_TYPES.DOWNLOAD ? "descarga" : "convocatoria"}/${slug}`}
            >
              <Button
                color="primary"
                className=" text-white w-full"
                startContent={
                  <Icon icon={"solar:eye-bold"} fontSize={25} />
                }
              >Visualizar
              </Button>
            </a>
          </div>
          <div className=" flex flex-col w-full">
            <Button color="danger" onClick={onOpen} startContent={<Icon icon={"solar:trash-bin-trash-bold"} fontSize={25} />}>Eliminar Utilidad</Button><Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" size="sm">
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-row gap-1">Confirmar <span className=" text-danger-500 font-bold">Eliminar</span>.</ModalHeader>
                    <ModalBody>
                      <p className=" flex flex-row flex-wrap">
                        ¿Estas seguro de que quieres borrar esa utilidad?
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={() => { }}>
                        Cancelar
                      </Button>
                      <Button color={"danger"} onClick={() => {
                        handleRemoveUtility()
                        onClose()
                      }}>
                        Eliminar
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
          <p className=" flex pt-4 text-sm text-default-600">Zona de Descargas</p>
          <div className=" flex flex-row w-full justify-end space-x-2">
            <a
              className=" w-full"
            >
              <Button
                color="primary"
                className=" text-white w-full"
                startContent={
                  <Icon icon={"solar:document-bold"} fontSize={25} />
                }
                onClick={() => generatePDF(pdfRef, { filename: 'page.pdf' })}
              >PDF
              </Button>
            </a>
            <Button
              color="primary"
              className=" text-white w-full"
              startContent={
                <Icon icon={"solar:widget-bold"} fontSize={25} />
              }
              onClick={() => generateExcel()}
            >Excel
            </Button>
          </div>
          <div ref={pdfRef}>

            {
              contactActionData?.graphData &&
                contactActionData.graphData.length > 0
                ?
                <BarChart
                  className="h-80"
                  data={contactActionData?.graphData.toReversed()}
                  index="_id"
                  categories={['cantidad']}
                />
                : <div className=" flex h-80 w-full animate-pulse bg-default-200 rounded-md items-center justify-center text-default-500">No se encontraron datos para mostrar.</div>
            }
            {
              contactActionData?.data &&
                contactActionData.data.length > 0
                ?
                <div className=" flex flex-col w-full space-y-2">
                  {
                    contactActionData.data.map((v) => <ContactCardComponent contactActionData={v} />)
                  }
                </div>
                :
                <p className=" text-default-700 font-light">Aun nadie ha usado esta utilidad.</p>
            }
          </div>
          {/* <pre>
        {JSON.stringify(contactActionData, null, 2)}
      </pre> */}


        </div>
    }
  }

  return (
    <>
      {renderer()}
    </>
  )
}

export default UtilityDataComponent