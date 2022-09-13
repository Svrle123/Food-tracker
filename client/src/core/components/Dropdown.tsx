import { FC } from 'react'
import { IDropdownProps } from '../interfaces';

const Dropdown: FC<IDropdownProps> = ({ options, onChange }) => {
    return (
        <select onChange={(e) => onChange('type', e)}>
            <option></option>
            {options.map((opt) => (
                <option key={opt}>{opt}</option>
            ))}
        </select>
    )
}

export default Dropdown;