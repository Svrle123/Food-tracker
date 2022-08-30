import React from 'react'
import { IInputProps } from './interfaces/IInputProps'

const Input: React.FC<IInputProps> = ({ className, placeholder, onChange, value, type, label, id }) => {
    return (
        <div className={className}>
            <label htmlFor={id}>{label}</label>
            <input
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                type={type}
                id={id}
            />
        </div>
    )
}

export default Input