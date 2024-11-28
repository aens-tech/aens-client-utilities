import type { IFormsFlow } from "@/interfaces/forms/flow";

export const FormHandleContinue = (STATES: IFormsFlow[], value: number, setValue: React.Dispatch<React.SetStateAction<number>>, nextForcedState?: string) => {
    if (value >= STATES.length) return;

    if (nextForcedState){
        setValue((STATES.findIndex((v) => v.id === nextForcedState)))
        return;
    }

    if (STATES[value].nextPage) {
        setValue((STATES.findIndex((v) => v.id === STATES[value].nextPage)))
        return;
    }

    setValue(value + 1)
    return;
}

export const FormHandleBack = (STATES: IFormsFlow[], value: number, setValue: React.Dispatch<React.SetStateAction<number>>) => {
    if (value < 1) return;

    if (STATES[value].backPage) {
        setValue((STATES.findIndex((v) => v.id === STATES[value].backPage)))
        return;
    }

    setValue(value - 1)
}