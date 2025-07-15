export function getArrOfDates( start:Date, end:Date ): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}