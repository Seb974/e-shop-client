export const isDefined = variable => variable !== undefined && variable !== null;

export const isDefinedAndNotVoid = variable => Array.isArray(variable) ? 
    isDefined(variable) && variable.length > 0 : 
    isDefined(variable);

export const getDateFrom = (date, nbDaysToAdd = 0, hour = 9) => {
    return new Date(date.getFullYear(), date.getMonth(), (date.getDate() + nbDaysToAdd), hour, 0, 0);
}

export const getAmericanStringDate = date => {
    return date.getFullYear() + "-" + getTwoDigits(date.getMonth() + 1) + "-" + getTwoDigits(date.getDate());
}

export const getFrenchStringDate = date => {
    return getTwoDigits(date.getDate()) + "/" + getTwoDigits(date.getMonth() + 1) + "/" + date.getFullYear();
}

export const getTwoDigits = number => number < 10 ? '0' + number : number;

export const isSameDate = (date1, date2) => date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();

export const isPastHour = date => {
    const now = new Date();
    const originalDate = new Date(date);
    const compare = new Date(now.getFullYear(), now.getMonth(), now.getDate(), originalDate.getHours(), originalDate.getMinutes(), 0);
    return compare.getTime() < now.getTime();
};