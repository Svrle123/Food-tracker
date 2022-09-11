import { IFood } from "../interfaces";

export const calculateSelectedFood = (selected: IFood, amount: number) => {
    if (!selected._id) {
        return selected;
    }

    const decimal = (amount / 100);
    let recalculated: any = { ...selected };

    for (let key in recalculated) {
        if (typeof recalculated[key] == 'number') {
            recalculated[key] *= decimal;
            recalculated[key] = recalculated[key].toFixed(2);
        }
    }

    return recalculated;

}