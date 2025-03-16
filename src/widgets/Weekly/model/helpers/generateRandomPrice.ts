export const generateRandomPrice = (): number => {
    return Number((Math.random() * 9.5 + 0.5).toFixed(2))
}
