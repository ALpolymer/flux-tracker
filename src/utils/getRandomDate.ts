export const getRandomDate = (daysBack: number) : string => {
    const now = new Date().getTime();
    const randomDays: number = Math.floor(Math.random() * daysBack);
    const date = new Date(now - randomDays *24 * 60 * 60 * 1000);
    return date.toISOString()
}