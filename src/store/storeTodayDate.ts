import { getTodayDate } from "../utils/utils";

export const updateTodayDateStore = (): boolean => {
    const today = getTodayDate();
    let lastDate = "";

    if (localStorage.getItem("todoLastDate")) {
        const storeDate = localStorage.getItem("todoLastDate");
        if (storeDate) {
            lastDate = JSON.parse(storeDate);
        }
        if (lastDate !== today) {
            localStorage.setItem("todoLastDate", JSON.stringify(today));
            return true;
        }
    } else {
        localStorage.setItem("todoLastDate", JSON.stringify(today));
        return true;
    }

    return false;
}