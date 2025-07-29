export const dictDate = new Map<number, string>([
        [1, "Monday"],
        [2, "Tuesday"],
        [3, "Wednesday"],
        [4, "Thursday"],
        [5, "Friday"],
        [6, "Saturday"],
        [7, "Sunday"]
    ]);

export type IconType = 'psychology' | 'pill' | 'self_improvement' | 'vape_free' | 'account_balance_wallet';

export const iconsList: IconType[] = [
    "psychology",
    "pill",
    "self_improvement",
    "vape_free",
    "account_balance_wallet"
];


export interface RoutineData {
        id: number,
        title: string,
        startAt: string,
        userId: string,
        checkedBlocks: Map<string, boolean>,
        icon: IconType,
}

export function getArrOfDates( yesterday:Date ): Date[] {
    const dates: Date[] = [];
    let max = new Date(yesterday);
    max.setDate(yesterday.getDate() - 91);
    if (yesterday.getDay() !== 6) {
        max.setDate(max.getDate() - yesterday.getDay() + 1);
    }
    while (max <= yesterday) {
        dates.push(new Date(max));
        max.setDate(max.getDate() + 1);
    }
    return dates;
}
