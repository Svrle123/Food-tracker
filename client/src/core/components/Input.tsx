import { FC, Fragment } from 'react'
import { IInputProps } from '../interfaces'

const Input: FC<IInputProps> = ({ className, placeholder, onChange, value, type, label, id, ref, required }) => {
    return (
        <Fragment>
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
        </Fragment>
    )
}

export default Input