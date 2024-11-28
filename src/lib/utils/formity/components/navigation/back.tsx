import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import type { OnBack } from "formity";

import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";


interface BackProps {
  onBack: OnBack;
}

export default function Back({ onBack }: BackProps) {
  const { getValues } = useFormContext();

  const handleClick = useCallback(() => {
    onBack(getValues());
  }, [onBack, getValues]);

  return (
    <Button
      type="button"
      onClick={handleClick}
      // className={cn(
      //   "block rounded-full bg-primary-500 px-6 py-2 hover:bg-primary",
      //   "focus:outline-none focus:ring-2 focus:ring-white/10 focus:ring-offset-2 focus:ring-offset-black",
      //   "disabled:bg-neutral-950 disabled:opacity-60",
      // )}
    >
      <ChevronLeftIcon className="pointer-events-none size-5" />
    </Button>
  );
}
