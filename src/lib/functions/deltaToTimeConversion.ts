export const deltaToDays = (delta: number) => {
    return Math.floor(delta / 86400)
}

export const deltaToHours = (delta: number) => {
    return Math.floor(delta % 86400 / 3600)
}

export const deltaToMinutes = (delta: number) => {
    return Math.floor(delta % 86400 % 3600 / 60)
}

export const deltaToSeconds = (delta: number) => {
    return Math.floor(delta % 86400 % 3600 % 60)
}

export const daysToPercent = (delta: number) => {
    return (delta / 86400) / 7
}

export const hoursToPercent = (delta: number) => {
    return (delta % 86400 / 3600) / 24
}

export const minutesToPercent = (delta: number) => {
    return (delta % 86400 % 3600 / 60) / 60
}

export const secondsToPercent = (delta: number) => {
    return (delta % 86400 % 3600 % 60) / 60
}