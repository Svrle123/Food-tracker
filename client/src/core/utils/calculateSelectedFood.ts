import { IFood } from "../interfaces";

const calculateSelectedFood = (selected: IFood, amount: number) => {
    if (!selected._id) {
        return selected;
    }

    let recalculated = { ...selected };

    if (selected.amount !== 100) {
        const multiplier = 1 / ((selected.amount || 100) / 100);

        for (let key in recalculated) {
            if (typeof selected[key] == 'number') {
                recalculated[key] *= multiplier;
                recalculated[key] = Number(recalculated[key].toFixed(2));
            }
        }
    }

    const decimal = (amount / 100);

    for (let key in recalculated) {
        if (typeof recalculated[key] == 'number') {
            recalculated[key] *= decimal;
            recalculated[key] = Number(recalculated[key].toFixed(2));
        }
    }

    return recalculated;
}

export default calculateSelectedFood;