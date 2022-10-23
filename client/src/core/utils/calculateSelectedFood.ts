import { IFood } from "../interfaces";

const calculateSelectedFood = (selected: IFood, amount: number) => {
    if (!selected._id) {
        return selected;
    }

    const decimal = (amount / 100);
    let recalculated = { ...selected };

    for (let key in recalculated) {
        if (typeof recalculated[key] == 'number') {
            recalculated[key] *= decimal;
            recalculated[key] = Number(recalculated[key].toFixed(2));
        }
    }

    return recalculated;
}

export default calculateSelectedFood;