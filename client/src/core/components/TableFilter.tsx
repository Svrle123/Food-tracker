import React, { FC, useContext, useEffect, useState, useMemo } from 'react'
import Dropdown from './Dropdown'
import Input from './Input'
import { ServiceContext } from '../contexts/ServiceProvider'

const TableFilter: FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedType, setSelectedType] = useState<string>("");
    const [dropdownData, setDropdownData] = useState<string[]>([]);
    const { foodRouteService } = useContext(ServiceContext);

    useEffect(() => {
        const initDropdown = async () => {
            const response = await foodRouteService.getTypes()
            setDropdownData(response)
        }
        initDropdown();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value);
    }

    const handleSelect = (event: React.MouseEvent<HTMLOptionElement>): void => {
        setSelectedType(event.currentTarget.value);
    }

    //Prevent component re-rendering on input change
    const DropdownComponent = useMemo(() => <Dropdown options={dropdownData} onSelect={handleSelect} />, [dropdownData]);

    return (
        <div>
            {dropdownData.length > 0 &&
                <React.Fragment>
                    <Input
                        className='table__filter'
                        placeholder='Minimum 3 letters for search'
                        onChange={(e) => handleSearch(e)}
                        value={searchValue}
                        label=''
                        type='text'
                        id='filter'
                    />
                    {DropdownComponent}
                </React.Fragment>
            }
        </div>
    )
}

export default TableFilter