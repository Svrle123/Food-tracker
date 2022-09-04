import React from 'react'
import { IInputProps } from '../interfaces'

const Input: React.FC<IInputProps> = ({ className, placeholder, onChange, value, type, label, id, ref, required }) => {
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
                ref={ref}
                required={required}
            />
        </React.Fragment>
    )
}

export default Input