import { type ReactElement, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { DefaultValues, Resolver, OnNext, Variables } from "formity";

interface FormProps {
  defaultValues: DefaultValues;
  resolver: Resolver;
  onNext: OnNext;
  children: ReactElement;
}

export default function Form({
  defaultValues,
  resolver,
  onNext,
  children,
}: FormProps) {
  const form = useForm({ defaultValues, resolver });

  const handleSubmit = useCallback(
    (formData: Variables) => {
      onNext(formData);
    },
    [onNext],
  );

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex w-full h-full">
      <FormProvider {...form}>{children}</FormProvider>
    </form>
  );
}
