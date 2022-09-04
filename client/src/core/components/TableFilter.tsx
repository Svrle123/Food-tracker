import { FC, useEffect, useState, useMemo, Fragment, ChangeEvent } from 'react'
import Dropdown from './Dropdown'
import Input from './Input'
import { useService } from '../contexts/ServiceProvider'
import { IFoodResponse } from '../interfaces'
import { useAppDispatch } from '../../store/hooks'
import { setFood } from '../../features/food/foodSlice'

const TableFilter: FC = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedType, setSelectedType] = useState<string>("");
    const [dropdownData, setDropdownData] = useState<string[]>([]);
    const { foodRouteService } = useService();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const initDropdown = async () => {
            const response = await foodRouteService.getTypes()
            setDropdownData(response)
        }
        initDropdown();
    }, []);

    useEffect(() => {
        const fetchOnSearch = async () => {
            const response: IFoodResponse = await foodRouteService.get({ searchQuery: searchValue.trim(), type: selectedType, page: 1, rpp: 20 });
            dispatch(setFood(response));
        }
        fetchOnSearch();
    }, [searchValue, selectedType]);

    const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value);
    }

    const handleSelect = (event: ChangeEvent<HTMLSelectElement>): void => {
        setSelectedType(event.currentTarget.value);
    }

    //Prevent component re-rendering on input change
    const DropdownComponent = useMemo(() => <Dropdown options={dropdownData} onChange={handleSelect} />, [dropdownData]);

    return (
        <div>
            {dropdownData.length > 0 &&
                <Fragment>
                    <Input
                        className='table__filter'
                        placeholder='Search'
                        onChange={(e) => handleSearch(e)}
                        value={searchValue}
                        label=''
                        type='text'
                        id='filter'
                    />
                    {DropdownComponent}
                </Fragment>
            }
        </div>
    )
}

export default TableFilter