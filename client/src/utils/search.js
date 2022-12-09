export const search = (operations, search) => {
    if (operations) {
        return operations?.filter(oper => oper.category.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }
}