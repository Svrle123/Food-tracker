const constructFoodFilter = (type: string, name: RegExp | null): object => {
    const filter: any = {};

    if (type) {
        filter.type = type;
    }
    if (name) {
        filter.name = name;
    }

    return filter;
}

export default constructFoodFilter;