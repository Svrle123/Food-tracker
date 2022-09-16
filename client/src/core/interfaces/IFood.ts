export default interface IFood {
    [key: string]: any,
    name: string,
    type: string,
    calories: number,
    carbohydrates: number,
    fat: number,
    protein: number,
    fiber: number,
    amount?: number,
    _id: string,
    __v: string,
}
