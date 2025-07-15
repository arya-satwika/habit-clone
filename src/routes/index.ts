export function getCurrentDate(): string {
    const date = new Date();
    return date.toString(); // Returns date in YYYY-MM-DD format
}

export function getCurrentDay(): number {
    const date = new Date();
    return date.getDay(); // Returns the current day of the week
}

