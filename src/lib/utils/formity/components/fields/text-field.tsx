import { type ChangeEvent, useId } from "react";

import { cn } from "@/lib/utils";

import Field from "../user-interface/field";
import { Input } from "@nextui-org/input";
// import Input from "../user-interface/input";

interface TextFieldProps {
  type: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error: { message: string } | undefined;
}

export default function TextField({ type, label, value, onChange, error }: TextFieldProps) {
  const id = useId();
  return (

    <Field
      id={id}
      label={""}
      labelClassName={cn(
        "peer-placeholder-shown:top-[17px] peer-placeholder-shown:before:bg-transparent peer-focus:before:bg-neutral-950",
        "peer-placeholder-shown:text-base peer-focus:-top-[11px] peer-focus:text-sm",
      )}
      error={error}
    >
      <Input
        // as="input"
        // props={{
        //   id: id,
        //   type: type,
        //   value: value,
        //   onChange: (e: ChangeEvent<HTMLInputElement>) => {
        //     onChange(e.target.value);
        //   },
        //   placeholder: label,
        // }}
        id={id}
        type={type}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
        isInvalid={!!error}
        label={label}
        className={cn(
          "peer placeholder-transparent focus:border-default-400 focus:outline-none focus:ring-transparent",
          { "border-red-500 focus:border-red-500": error },
        )}
      />
    </Field>

  );
}
