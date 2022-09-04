import React from 'react'
import { IButtonProps } from '../interfaces'

const Button: React.FC<IButtonProps> = ({ className, onClick, label }) => {
    return (
        <button className={className} onClick={onClick}>{label}</button>
    )
}

export default Button