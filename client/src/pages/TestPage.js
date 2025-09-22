import { useEffect } from "react";

import { initAppointmentData } from "../util/initAppointmentData";
import { getApppointmentsAtHour } from "../util/getAppointmentsAtHour";
import { fetchMeetingInfo } from "../util/fetchMeetingInfo";
import { reserveAppointment } from "../util/reserveAppointment";

export const TestPage = () => {
    const meetingId = "675cf9650963621d86577fce";
    const hour = 8;
    const date = Date.parse("2024-12-13T08:00:00.000+00:00")
    
    const appId = "675efa68562c9d05ac124bf2";

    useEffect(() => {
        const test = async () => {
            var mytest = await reserveAppointment(appId, "mytest123", "test456", "");
            if (mytest) 
                console.log("yay")
            else console.log("no")
        }
        test();
}, [])
        
        

    return <p>hi!!!!1</p>;
}