import React from 'react'
import { IButtonProps } from './interfaces/IButtonProps'

const Button: React.FC<IButtonProps> = ({ onClick, label }) => {
    return (
        <button onClick={onClick}>{label}</button>
    )
}

export default Button