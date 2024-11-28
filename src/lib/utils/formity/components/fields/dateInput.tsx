import { useId } from "react";
import Field from "../user-interface/field";
import { DateInput } from "@nextui-org/date-input";
import { CalendarDate, getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { Controller, useFormContext } from "react-hook-form";
import { DatePicker } from "@nextui-org/date-picker";
import {NextUIProvider} from "@nextui-org/react";

export interface IFormityCalendarProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error: { message: string } | undefined;
}

function FormityDateInputComponent({ value, error, label, onChange }: IFormityCalendarProps) {
    const id = useId();

    return (
        <Field
            id={id}
            label={""}
            error={error}
        >
            <NextUIProvider locale="es-ES">
                <DatePicker
                    
                    showMonthAndYearPickers
                    label={label}
                    placeholderValue={
                        parseDate(today(getLocalTimeZone()).toString())
                    }
                    value={
                        // new CalendarDate(
                        //     new Date(value).getFullYear(),
                        //     new Date(value).getMonth() + 1,
                        //     new Date(value).getDay()
                        // )
                        parseDate(value)
                    }
                    onChange={(v) => {
                        console.log(v)
                        console.log(v.toString())
                        console.log(v.toDate(getLocalTimeZone()).toISOString())
                        console.log(value)
                        onChange(v.toDate(getLocalTimeZone()).toISOString().split("T")[0])
                    }}
                    className="w-full"
                />
            </NextUIProvider>
        </Field>
    )
}


interface DateFieldProps {
    name: string;
    label: string;
}

export default function DateField({ name, label }: DateFieldProps) {
    const { control, formState } = useFormContext();
    const error = formState.errors[name] as { message: string } | undefined;
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <FormityDateInputComponent label={label} value={field.value} onChange={field.onChange} error={error} />
            )}
        />
    );
}