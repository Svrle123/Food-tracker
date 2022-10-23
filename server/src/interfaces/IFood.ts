export default interface IFood {
    [key: string]: any,
    name: string,
    calories: number,
    carbohydrates: number,
    fat: number,
    protein: number,
    fiber: number,
    creator: string,
    createdAt: Date,
}
