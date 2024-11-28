import { useFormContext, Controller } from "react-hook-form";

import BaseTextField from "../fields/text-field";


interface NumberFieldProps {
  name: string;
  label: string;
}

export default function SecretField({ name, label }: NumberFieldProps) {
  const { control, formState } = useFormContext();
  const error = formState.errors[name] as { message: string } | undefined;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <BaseTextField type="password" label={label} value={field.value} onChange={field.onChange} error={error} />
      )}
    />
  );
}
