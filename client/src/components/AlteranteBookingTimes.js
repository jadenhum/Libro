import { useState } from 'react';

import { addDays, getRelativeMonday, getRelativeNextSunday, get1WeekLater, get1WeekEarlier, toStringCustom } from "../util/dateUtils.js";

const AlternateBookingTimes = () => {

    const [curMonday, setCurMonday] = useState(getRelativeMonday(new Date()));
    const [curTuesday, setCurTuesday] = useState(addDays(curMonday, 1));
    const [curWednesday, setCurWednesday] = useState(addDays(curMonday, 2));
    const [curThursday, setCurThursday] = useState(addDays(curMonday, 3));
    const [curFriday, setCurFriday] = useState(addDays(curMonday, 4));
    const [curSaturday, setCurSaturday] = useState(addDays(curMonday, 5));
    const [curSunday, setCurSunday] = useState(addDays(curMonday, 6));

    const increaseWeek = () => {
        setCurMonday(get1WeekLater(curMonday));
        setCurTuesday(get1WeekLater(curTuesday));
        setCurWednesday(get1WeekLater(curWednesday));
        setCurThursday(get1WeekLater(curThursday));
        setCurFriday(get1WeekLater(curFriday));
        setCurSaturday(get1WeekLater(curSaturday));
        setCurSunday(get1WeekLater(curSunday));
    }

    const decreaseWeek = () => {
        setCurMonday(get1WeekEarlier(curMonday));
        setCurTuesday(get1WeekEarlier(curTuesday));
        setCurWednesday(get1WeekEarlier(curWednesday));
        setCurThursday(get1WeekEarlier(curThursday));
        setCurFriday(get1WeekEarlier(curFriday));
        setCurSaturday(get1WeekEarlier(curSaturday));
        setCurSunday(get1WeekEarlier(curSunday));
    }


    return (
        <div className='flex flex-row w-3/4 h-3/4'>
            <div className="advanceWeekButton">

            </div>

            <div className="weekCalendarContainer">
                <div className="calendarDateLabelsContainer">

                    <div className="calendarDateLabel">
                        <h3 className="calendarDateLabelText">{toStringCustom(curMonday)}</h3>
                    </div>

                    <div className="calendarDateLabel">
                        <h3 className="calendarDateLabelText">{toStringCustom(curTuesday)}</h3>
                    </div>

                    <div className="calendarDateLabel">
                        <h3 className="calendarDateLabelText">{toStringCustom(curWednesday)}</h3>
                    </div>

                    <div className="calendarDateLabel">
                        <h3 className="calendarDateLabelText">{toStringCustom(curThursday)}</h3>
                    </div>

                    <div className="calendarDateLabel">
                        <h3 className="calendarDateLabelText">{toStringCustom(curFriday)}</h3>
                    </div>

                    <div className="calendarDateLabel">
                        <h3 className="calendarDateLabelText">{toStringCustom(curSaturday)}</h3>
                    </div>

                    <div className="calendarDateLabel">
                        <h3 className="calendarDateLabelText">{toStringCustom(curSunday)}</h3>
                    </div>

                </div>

                <div className="calendarBox">

                </div>
            </div>

            <div className="advanceWeekButton">
                
            </div>
        </div >
    );
}

export { AlternateBookingTimes };