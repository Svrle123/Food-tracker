import { FC, memo } from 'react'
import { IDropdownProps } from './interfaces/IDropdownProps';

const Dropdown: FC<IDropdownProps> = memo(({ options, onSelect }) => {
    return (
        <select>
            {options.map((opt) => (
                <option key={opt} onSelect={onSelect}>{opt}</option>
            ))}
        </select>
    )
})

export default Dropdown;