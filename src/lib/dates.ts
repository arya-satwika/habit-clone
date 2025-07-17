export const dictDate = new Map<number, string>([
        [1, "Monday"],
        [2, "Tuesday"],
        [3, "Wednesday"],
        [4, "Thursday"],
        [5, "Friday"],
        [6, "Saturday"],
        [7, "Sunday"]
    ]);

    
export interface RoutineData {
        name: string,
        id: string,
        startDate: string,
        checkedBlocks: {},
}

export function getArrOfDates( start:Date, end:Date ): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(start);
    if (start.getDay() !== 1) {
        currentDate.setDate(start.getDate()-start.getDay()+1)
    }
    while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

export function saveAllRoutine(routineData: RoutineData[]): void {
    localStorage.setItem('routineData', JSON.stringify(routineData));
}