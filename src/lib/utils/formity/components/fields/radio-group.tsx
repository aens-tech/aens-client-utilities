import { useId } from "react";
// import { Radio, RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

import { cn } from "@/lib/utils";

import Field from "../user-interface/field";
import Input from "../user-interface/input";
import { Radio, RadioGroup as NURadioGroup } from "@nextui-org/radio";

interface RadioGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  direction: "x" | "y";
  error: { message: string } | undefined;
}

export default function RadioGroup({ label, value, onChange, options, direction, error }: RadioGroupProps) {
  const id = useId();
  return (
    // <Field id={id} label={label} error={error}>
    //   <HeadlessRadioGroup
    //     value={value}
    //     onChange={onChange}
    //     className={cn("peer grid grid-cols-1 gap-4", {
    //       "grid-cols-[repeat(auto-fit,minmax(theme(spacing.40),1fr))]": direction === "x",
    //     })}
    //   >
    //     {options.map((option) => (
    //       <Input
    //         key={option.value}
    //         as={Radio}
    //         props={{ value: option.value }}
    //         className={cn(
    //           "group flex cursor-pointer items-center gap-2 focus:outline-none data-[checked]:border-neutral-500",
    //           { "border-red-500 data-[checked]:border-red-500": error },
    //         )}
    //       >
    //         {option.label}
    //         <CheckIcon className="pointer-events-none ml-auto size-5 fill-white/50 group-data-[checked]:fill-white/100" />
    //       </Input>
    //     ))}
    //   </HeadlessRadioGroup>
    // </Field>

    <Field
      id={id}
      label={""}
      labelClassName={cn(
        "peer-placeholder-shown:top-[17px] peer-placeholder-shown:before:bg-transparent peer-focus:before:bg-neutral-950",
        "peer-placeholder-shown:text-base peer-focus:-top-[11px] peer-focus:text-sm",
      )}
      error={error}
    >
      <div className="flex flex-col gap-3">
        <NURadioGroup
          label={label}
          value={value}
          onValueChange={onChange}
        >
          {
            options.map((v) => {
              return (
                <Radio
                  key={v.value}
                  value={v.value}
                  classNames={{
                    base: cn(
                      "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                      "flex-row-reverse min-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                  }}
                >
                  {v.label}
                </Radio>
              )
            })
          }
        </NURadioGroup>
        {/* <p className="text-default-500 text-small">Selected: {value}</p> */}
      </div>
    </Field>
  );
}
