import { Fragment } from "react";
import type {
  Components,
  Step,
  DefaultValues,
  Resolver,
  OnNext,
  OnBack,
} from "formity";
import type { Value } from "expry";

import Form from "@/lib/utils/formity/components/form";
import FormLayout from "@/lib/utils/formity/components/form-layout";
import Next from "@/lib/utils/formity/components/navigation/next";
import Back from "@/lib/utils/formity/components/navigation/back";
import TextField from "@/lib/utils/formity/components/react-hook-form/text-field";
import NumberField from "@/lib/utils/formity/components/react-hook-form/number-field";
import YesNo from "@/lib/utils/formity/components/react-hook-form/yes-no";
import MultiSelect from "./components/react-hook-form/multi-select";
import Select from "./components/react-hook-form/select";
import Row from "./components/user-interface/row";
import FormityProgressLayout from "./components/layouts/progressLayout.formityComponent";
import FormityDateInputComponent from "./components/fields/dateInput";
import DateField from "./components/fields/dateInput";
import SecretField from "./components/react-hook-form/secretField";
import ConditionalField from "./components/react-hook-form/conditionalField";

type Parameters = {
  form: {
    step: Step;
    defaultValues: DefaultValues;
    resolver: Resolver;
    onNext: OnNext;
    children: Value;
  };
  formLayout: {
    heading: string;
    description: string;
    fields: Value[];
    button: Value;
    back?: Value;
  };
  next: {
    text: string;
  };
  back: {
    onBack: OnBack;
  };
  textField: {
    name: string;
    label: string;
  };
  numberField: {
    name: string;
    label: string;
  };
  secretField: {
    name: string;
    label: string;
  };
  yesNo: {
    name: string;
    label: string;
  };
  multiSelect: {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    direction: "x" | "y";
  };
  select: {
    name: string;
    label: string;
    options: { value: string; label: string }[];
    direction: "x" | "y";
  }
  row: {
    items: React.ReactNode[];
  }
  progressLayout: {
    progress: { total: number; current: number };
    barName: string;
    heading: string;
    description: string;
    fields: string;
    children: React.ReactNode[];
    button: React.ReactNode;
    back?: React.ReactNode;
  }
  dateInput: {
    name: string;
    label: string;
  };
  conditionalField: {
    condition: Value;
    values: string[];
    children: Value;
  };
};

const components: Components<Parameters> = {
  form: ({ step, defaultValues, resolver, onNext, children }, render) => (
    <Form
      key={step}
      defaultValues={defaultValues}
      resolver={resolver}
      onNext={onNext}
    >
      {render(children)}
    </Form>
  ),
  formLayout: ({ heading, description, fields, button, back }, render) => (
    <FormLayout
      heading={heading}
      description={description}
      fields={fields.map((field, index) => (
        <Fragment key={index}>{render(field)}</Fragment>
      ))}
      button={render(button)}
      back={back ? render(back) : undefined}
    />
  ),
  next: ({ text }) => <Next>{text}</Next>,
  back: ({ onBack }) => <Back onBack={onBack} />,

  textField: ({ name, label }) => <TextField name={name} label={label} />,
  numberField: ({ name, label }) => <NumberField name={name} label={label} />,
  secretField: ({ name, label }) => <SecretField name={name} label={label} />,

  yesNo: ({ name, label }) => <YesNo name={name} label={label} />,
  select: ({ direction, label, name, options }) => <Select name={name} label={label} direction={direction} options={options} />,
  multiSelect: ({ direction, label, name, options }) => <MultiSelect name={name} label={label} direction={direction} options={options} />,
  row: ({ items }) => <Row items={items} />,

  progressLayout: ({ progress, barName, children, button, back, description, fields, heading, }, render) => <FormityProgressLayout
    progress={progress}
    barName={barName}
    children={children.map((field, index) => (
      <Fragment key={index}>{render(field)}</Fragment>
    ))}
    button={render(button)}
    back={back ? render(back) : undefined}
    description={description}
    fields={fields}
    heading={heading}
  />,
  dateInput: ({ name, label, }) => <DateField name={name} label={label} />,
  conditionalField: ({ condition, values, children }, render) => (
    <ConditionalField condition={condition} values={values}>
      {render(children)}
    </ConditionalField>
  ),
};

export default components;