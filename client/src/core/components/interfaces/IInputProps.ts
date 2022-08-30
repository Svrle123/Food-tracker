export interface IInputProps {
    className: string,
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string | number | undefined,
    label: string,
    type: string,
    id: string,
}