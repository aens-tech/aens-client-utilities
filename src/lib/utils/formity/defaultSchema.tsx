import type { Schema } from "formity";

const schema: Schema = [
  {
    form: {
      defaultValues: {
        name: ["", []],
        surname: ["", []],
        age: ["", []],
      },
      resolver: {
        name: [
          [{ "#$ne": ["#$name", ""] }, "El valor es Requerido"],
          [{ "#$lt": [{ "#$strLen": "#$name" }, 20] }, "Max 20 chars"],
        ],
        surname: [
          [{ "#$ne": ["#$surname", ""] }, "El valor es Requerido"],
          [{ "#$lt": [{ "#$strLen": "#$surname" }, 20] }, "Max 20 chars"],
        ],
        age: [
          [{ "#$ne": ["#$age", ""] }, "El valor es Requerido"],
          [{ "#$gte": ["#$age", 10] }, "You must be at least 10 years old"],
          [{ "#$lte": ["#$age", 100] }, "You must be at most 100 years old"],
        ],
      },
      render: {
        form: {
          step: "$step",
          defaultValues: "$defaultValues",
          resolver: "$resolver",
          onNext: "$onNext",
          children: {
            formLayout: {
              heading: "Tell us about yourself",
              description: "We would want to know a little bit more about you",
              fields: [
                {
                  textField: {
                    name: "name",
                    label: "Name",
                  },
                },
                {
                  textField: {
                    name: "surname",
                    label: "Surname",
                  },
                },
                {
                  numberField: {
                    name: "age",
                    label: "Age",
                  },
                },
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
    form: {
      defaultValues: {
        sex: ["", []],
        surname: ["", []],
        age: ["", []],
      },
      resolver: {
        sex: [
          [{ "#$ne": ["#$sex", ""] }, "El valor es Requerido"],
          [{ "#$lt": [{ "#$strLen": "#$sex" }, 20] }, "Max 20 chars"],
        ],
        surname: [
          [{ "#$ne": ["#$surname", ""] }, "El valor es Requerido"],
          [{ "#$lt": [{ "#$strLen": "#$surname" }, 20] }, "Max 20 chars"],
        ],
        age: [
          [{ "#$ne": ["#$age", ""] }, "El valor es Requerido"],
          [{ "#$gte": ["#$age", 10] }, "You must be at least 10 years old"],
          [{ "#$lte": ["#$age", 100] }, "You must be at most 100 years old"],
        ],
      },
      render: {
        form: {
          step: "$step",
          defaultValues: "$defaultValues",
          resolver: "$resolver",
          onNext: "$onNext",
          children: {
            formLayout: {
              heading: "Tell us about yourself",
              description: "We would want to know a little bit more about you",
              fields: [
                {
                  select: {
                    name: "sex",
                    label: "Género",
                    options: [
                      { 
                        value: "male", 
                        label: "Hombre"
                      },
                      { 
                        value: "female", 
                        label: "Mujer"
                      },
                    ]
                  },
                },
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
    return: {
      name: "$name",
      surname: "$surname",
      age: "$age",
    },
  },
];


export default schema;
