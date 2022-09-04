type Entries = {
    foodType: string,
    amount: number,
}

export default interface IFoodEntry {
    entries: Entries[]
}
