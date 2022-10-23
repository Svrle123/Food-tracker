import { FC } from 'react'
import { IInputProps } from '../interfaces'

const Input: FC<IInputProps> = ({ className, placeholder, onChange, value, type, id, ref, required }) => {
    return (
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
    )
}

export default Input