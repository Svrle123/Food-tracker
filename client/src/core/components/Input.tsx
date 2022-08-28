import React from 'react'

interface InputProps {
    className: string,
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string | number,
    label: string,
    type: string,
    id: string,
}

const Input: React.FC<InputProps> = ({ className, placeholder, onChange, value, type, label, id }) => {
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