import { FC } from 'react'
import { IButtonProps } from 'core/interfaces'

import { Button as MuiButton } from '@mui/material';

const Button: FC<IButtonProps> = ({ className, onClick, label, variant, type, sx }) => {
    return (
        <MuiButton sx={sx} className={className} type={type} variant={variant} onClick={onClick}>{label}</MuiButton>
    )
}

export default Button