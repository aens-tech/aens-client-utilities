import { CalendarDate, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import type { Schema } from "formity";
import MultiSelect from "../components/react-hook-form/multi-select";

const fastUserRegisterSchema: Schema = [
  {
    form: {
      defaultValues: {
        name: ["$name", []],
        description: ["$description", []],
        url: ["$url", []],
        date: ["$date", []],
        slug: ["$slug", []],
        type: ["$type", []],
        interests: ["$interests", []],
      },
      resolver: {
        name: [
          [{ "#$ne": ["#$name", ""] }, "El valor es Requerido"],
          [{ "#$lt": [{ "#$strLen": "#$name" }, 200] }, "Máximo 200 caracteres"],
        ],
        description: [
          [{ "#$ne": ["#$name", ""] }, "El valor es Requerido"],
          [{ "#$lt": [{ "#$strLen": "#$name" }, 500] }, "Máximo 500 caracteres"],
        ],
        date: [
          [{ "#$ne": ["#$birthDay", ""] }, "El valor es Requerido"],
        ],
        slug: [
          [{ "#$ne": ["#$slug", ""] }, "El valor es Requerido"],
          [{ "#$regexMatch": ["#$slug", "^[a-z0-9]+(?:-[a-z0-9]+)*$"] }, "Solo se pueden usar letras minúsculas, números y '-'"],
          [{ "#$lt": [{ "#$strLen": "#$slug" }, 80] }, "Máximo 80 caracteres"],
        ],
        type: [
          [{ "#$ne": ["#$type", ""] }, "El valor es Requerido"],
        ],
        interests: [
          [{ "#$ne": ["#$interests", ""] }, "El valor es Requerido"],
        ],
        url: [
          [
            {
              "#$cond": {
                if: {"#$eq": ["#$type", "DOWNLOAD"]},
                then: {"#$ne": ["#$url", ""]},
                else: true
              }
            },
            "Valor requerido"
          ]
        ]
      },
      render: {
        form: {
          step: "$step",
          defaultValues: "$defaultValues",
          resolver: "$resolver",
          onNext: "$onNext",
          children: {
            formLayout: {
              heading: "Creación de Utilidad",
              description: "Para poder crear la utlidad de forma adecuada, necesitamos que se complete la siguiente información.",
              fields: [
                {
                  textField: {
                    name: "name",
                    label: "Nombre de la Utilidad",
                  },
                },
                {
                  textField: {
                    name: "description",
                    label: "Descripción",
                  },
                },
                {
                  dateInput: {
                    name: "date",
                    label: "Fecha (DD/MM/AAAA)",
                  },
                },
                {
                  textField: {
                    name: "slug",
                    label: "Slug",
                  },
                },
                {
                  select: {
                    name: "type",
                    label: "Tipo de Utilidad",
                    options: [
                      {
                        value: "SUMMON",
                        label: "Convocatoria"
                      },
                      {
                        value: "DOWNLOAD",
                        label: "Descarga"
                      },
                    ]
                  },
                },
                {
                  conditionalField: {
                    condition: { "#$eq": ["#$type", "DOWNLOAD"] },
                    values: ["type"],
                    children: {
                      textField: {
                        name: "url",
                        label: "Url de desarga del contenido",
                      },
                    },
                  }
                },
                {
                  multiSelect: {
                    name: "interests",
                    label: "Intereses",
                    options: [
                      {
                        value: "EDUCATION_TECH",
                        label: "Formación Tech"
                      },
                      {
                        value: "TEACHER_TECH",
                        label: "Profesor Tech"
                      },
                      {
                        value: "EDUCATION_BUSINESS",
                        label: "Formación Empresarial"
                      },
                      {
                        value: "EDUCATION_AI",
                        label: "Formación IA"
                      },
                      {
                        value: "EMAIL_MARKETING",
                        label: "Email Marketing"
                      },
                      {
                        value: "DESIGN",
                        label: "Diseño"
                      },
                      {
                        value: "DISCOUNTS",
                        label: "Descuentos"
                      },

                    ]
                  }
                }
              ],
              button: {
                next: { text: "Continuar" },
              },
            },
          },
        },

      },
    },
  },
  {
    variables: {
      url: {
        $cond: {
          if: {$eq: ["$type", "DOWNLOAD"]},
          then: "$url",
          else: null
        }
      }
    }
  },
  {
    return: {
      name: "$name",
      description: "$description",
      date: "$date",
      slug: "$slug",
      type: "$type",
      url: "$url",
      interests: "$interests",
    },
  },
];


export default fastUserRegisterSchema;
