import React from 'react'

interface ButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    label: string
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
    return (
        <button onClick={onClick}>{label}</button>
    )
}

export default Button