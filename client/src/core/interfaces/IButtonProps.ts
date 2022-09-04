export default interface IButtonProps {
    className: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    label: string
    type?: "button" | "submit" | "reset" | undefined
}
