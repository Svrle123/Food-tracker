import { ChangeEvent, MutableRefObject } from "react";

export default interface IInputProps {
    className: string,
    labelClassName?: string,
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    value: string | number | undefined,
    label?: string,
    type: string,
    id: string,
    ref?: MutableRefObject<HTMLInputElement> | MutableRefObject<null> | undefined,
    required?: boolean,
}