export const generateTimeframe = (): { startsAt: number; endsAt: number } => {
    const now = new Date()
    const start = new Date(now)
    start.setDate(start.getDate() - Math.floor(Math.random() * 30))

    const end = new Date(now)
    end.setDate(end.getDate() + Math.floor(Math.random() * 14) + 1)

    return {
        startsAt: start.getTime(),
        endsAt: end.getTime()
    }
}
