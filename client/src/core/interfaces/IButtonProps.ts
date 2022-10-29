import { SxProps, Theme } from "@mui/material";

export default interface IButtonProps {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    label: string,
    variant?: "text" | "outlined" | "contained",
    type?: "button" | "submit" | "reset",
    className?: string,
    sx?: SxProps<Theme> | undefined
}
