import React from 'react'
import { IInputProps } from '../interfaces'

const Input: React.FC<IInputProps> = ({ className, placeholder, onChange, value, type, label, id }) => {
    return (
        <React.Fragment>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                className={className}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                type={type}
                id={id}
            />
        </React.Fragment>
    )
}

export default Input