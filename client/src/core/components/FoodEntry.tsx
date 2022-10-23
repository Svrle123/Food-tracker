import { ChangeEvent, FC, Fragment, useEffect, useState } from "react"
import { Input, Button } from "./";
import { addEntry } from "../../features/foodEntries/foodEntriesSlice";
import { removeSelected } from "../../features/food/foodSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IFood } from "../interfaces";
import { calculateSelectedFood } from "../utils";
import { TableEntry, TableHeader } from "./table";
import { toast } from 'react-toastify';

const calculatedInitialState: IFood = {
    name: "",
    _id: "",
    __v: "",
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    protein: 0,
    fiber: 0
}

const FoodEntry: FC = () => {
    const [amount, setAmount] = useState<number>(100);
    const [calculated, setCalculated] = useState<IFood>(calculatedInitialState);

    const selected = useAppSelector(state => state.food.selectedFood);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setAmount(100);
    }, [selected])

    useEffect(() => {
        const recalculated = calculateSelectedFood(selected, amount);
        setCalculated(recalculated);
    }, [amount, selected])

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (isNaN(parseInt(event.currentTarget.value))) {
            setAmount(0);
            return;
        }
        setAmount(parseInt(event.currentTarget.value));
    }

    const handleCancelSelect = () => {
        dispatch(removeSelected())
    }

    const handleSubmitSelected = () => {
        if (!calculated._id) {
            toast.info("Please select a food first!")
            return;
        }
        dispatch(addEntry({ ...calculated, amount }));
        dispatch(removeSelected());
    }

    return (
        <Fragment>
            <div>
                <h3>{selected?.name || "Select a food"}</h3>
                <Input
                    className="amount__input"
                    placeholder="Amount in grams"
                    onChange={(e) => handleAmountChange(e)}
                    value={amount}
                    type="text"
                    id="amount"
                />
                <Button
                    onClick={() => handleSubmitSelected()}
                    className={""}
                    label={"Add to log"}
                />
                <Button
                    onClick={() => handleCancelSelect()}
                    className={""}
                    label={"X"} />
                <table>
                    <TableHeader isSelected={true} />
                    <tbody>
                        <TableEntry {...calculated} />
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default FoodEntry;