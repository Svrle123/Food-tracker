import { FC } from 'react'
import { IInputProps } from '../interfaces'
import { Input as MuiInput } from '@mui/material';

const Input: FC<IInputProps> = ({ inputProps, className, placeholder, onChange, value, type, id, ref, required, ...otherProps }) => {
    return (
        <MuiInput
            className={className}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            type={type}
            id={id}
            ref={ref}
            required={required}
            inputProps={inputProps}
            fullWidth={true}
            {...otherProps}
        />
    )
}

export default Input