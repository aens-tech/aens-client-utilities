import { Value, expry } from "expry";
import { useFormContext } from "react-hook-form";

interface ConditionalFieldProps {
  condition: Value;
  values: string[];
  children: React.ReactNode;
}

export default function ConditionalField({
  condition,
  values,
  children,
}: ConditionalFieldProps) {
  const { watch } = useFormContext();
  const variables = watch(values).reduce(
    (acc, value, index) => ({ ...acc, [values[index]]: value }),
    {},
  );
  if (expry(condition, variables)) {
    return children;
  }
  return null;
}