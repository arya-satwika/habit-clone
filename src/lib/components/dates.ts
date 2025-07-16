export interface CheckedBlocksMap {
    [date: string]: boolean;
}
export interface RoutineData {
        name: string,
        id: string,
        startDate: string,
        checkedBlocks: CheckedBlocksMap
}

export function getArrOfDates( start:Date, end:Date ): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}