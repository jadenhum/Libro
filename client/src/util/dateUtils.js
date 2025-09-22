
const addDays = (date_initial, days_to_add) => {
    const day_copy = structuredClone(date_initial);
    day_copy.setDate(date_initial.getDate() + days_to_add);
    
    return day_copy;
}

const getRelativeMonday = (day) => {
    const day_of_week = day.getDay();
    const date_diff = 1 - day_of_week;
    
    const return_day = addDays(day, date_diff);

    return_day.setHours(0);
    return_day.setMinutes(0);
    return_day.setSeconds(0);
    return_day.setMilliseconds(0);


    return return_day
    
}

const getRelativeNextSunday = (day) => {
    const day_of_week = day.getDay();
    const day_offset = 7 - day_of_week;

    return addDays(day, day_offset);

}

const get1WeekLater = (day) => {
    return addDays(day, 7);

}

const get1WeekEarlier  = (day) => {
    return addDays(day, -7);
}

const toStringCustom = (day) => {
    const str = day.toString();
    const words = str.split(' ');
    const output_str = words[0]+" "+words[1]+" "+words[2];

    return output_str;

}

const checkIfInWeek = (day, monday) => {
    if (day > addDays(monday, -1) && day < addDays(getRelativeNextSunday(monday), 1)) 
        return true;
    else return false;
}

const convertToLocalTime = (date) => {
    let newObj = Intl.DateTimeFormat('en-US', { timeZone: "America/New_York"})
    let newDate = newObj.format(date);
    return newDate;
}

export { addDays, getRelativeMonday, getRelativeNextSunday, get1WeekLater, get1WeekEarlier, toStringCustom, checkIfInWeek };