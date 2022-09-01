export default interface IFoodTableRow {
    onClick: () => void,
    name: string,
    type: string,
    calories: number,
    carbohydrates: number,
    fat: number,
    protein: number,
    fiber: number,
}