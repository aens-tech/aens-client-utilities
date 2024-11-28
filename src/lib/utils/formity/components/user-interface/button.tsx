import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Button as NUIButton } from "@nextui-org/button";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ children, disabled, onClick }: ButtonProps) {
  const handleSubmit = () => {
    console.log(onClick)

    if (!onClick) return

    console.log("onClick Exits on button!, ", onClick)
    onClick()
  }

  return (
    <NUIButton
      // className={cn(
      //   "block w-full rounded-full bg-indigo-500 px-6 py-4 text-base text-white hover:bg-indigo-400",
      //   "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-black",
      //   "disabled:bg-indigo-500 disabled:opacity-60",
      // )}
      disabled={disabled}
      onClick={onClick}
      type="submit"
      className=" text-white bg-primary w-full"
    >
      {children}
    </NUIButton>
  );
}
