import { FC } from 'react'
import { IButtonProps } from '../interfaces'

const Button: FC<IButtonProps> = ({ className, onClick, label, type }) => {
    return (
        <button type={type} className={className} onClick={onClick}>{label}</button>
    )
}

export default Button