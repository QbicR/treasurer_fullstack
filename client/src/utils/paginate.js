export const paginate = (items, page, limit) => {
    if (items) {
        const startIndex = (page - 1) * limit
        return [...items].splice(startIndex, limit)
    }
}