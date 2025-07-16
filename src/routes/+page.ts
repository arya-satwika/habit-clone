import type { PageLoad } from "./$types"

export const load: PageLoad = () => {
    return {
        routineData: JSON.parse(localStorage.getItem('routineData') ?? "[]")
    };
}
