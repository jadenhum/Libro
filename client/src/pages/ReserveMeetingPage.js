
import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { reserveAppointment } from "../util/reserveAppointment";
import { getApppointmentsAtHour } from "../util/getAppointmentsAtHour";
import { toStringCustom } from "../util/dateUtils";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const ReserveMeetingPage = () => {

    const { meetingId, dateparam } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [goTo404, setGoTo404] = useState(false);
    const [manualReload, setManualReload] = useState(true);
    const [renderData, setRenderData] = useState([]);
    const [selectedButton, setSelectedButton] = useState(null);
    const [name, setName] = useState("");
    const [studentCode, setStudentCode] = useState("");
    const [contact, setContact] = useState("");

    const navigate = useNavigate();

    const updateSelected = (e) => {
        setSelectedButton(e.target.value);
        console.log(e.target.value);
    }

    const updateName = (e) => {
        setName(e.target.value);
    }

    const updateStudentCode = (e) => {
        setStudentCode(e.target.value);
    }

    const updateContact = (e) => {
        setContact(e.target.value);
    }

    const mySubmit = async () => {
        console.log(selectedButton);

        if (selectedButton === null) {
            window.alert("You must select an appointment")
        } 
        else if (name === "") {
            window.alert("You must enter a name");
        } else {
            var success = await reserveAppointment(selectedButton, name, studentCode, contact);
            if (success) {
                console.log("successfully booked!");
                navigate("/")
            } else {
                window.alert("Error 500 : Server Error, unable to reserve appointment");
                console.log(success);
                console.log("sad!");
            }
        }

        setManualReload(!manualReload);

        return;
    }

    useEffect(() => {
        const dataInit = async () => {

            const timeparams = dateparam.split("-").map((d) => Number(d));
            var mydate = new Date();
            mydate.setMonth(timeparams[0]);
            mydate.setDate(timeparams[1]);

            mydate.setHours(0);
            mydate.setMinutes(0);
            mydate.setSeconds(0);
            mydate.setMilliseconds(0);
            mydate.setHours(mydate.getHours() -5);

            var apps_to_show = await getApppointmentsAtHour(meetingId, timeparams[2], mydate);

            if (apps_to_show === 400 || apps_to_show === 404 || apps_to_show === 500) {
                setGoTo404(true);
                apps_to_show = [];
            }

            console.log(apps_to_show);
            var myRenderData = [];
            
            for (var i =0; i < apps_to_show.length; i++) {
                const cur_app = apps_to_show[i];

                const startTimeVals = cur_app.startTime.split(":").map((d)=>Number(d));
                const appDuration = cur_app.appointmentDuration;
                var endTimes = [0,0];

                if (startTimeVals[1]+appDuration >= 60) {
                    endTimes[0] = startTimeVals[0]+1;
                    endTimes[1] = (startTimeVals[1]+Number(appDuration)) % 60;

                } else {
                    endTimes[0] = startTimeVals[0];
                    endTimes[1] =  startTimeVals[1] + Number(appDuration);

                }

                var endTime;
                if (endTimes[1] < 10) {

                    endTime = endTimes[0].toString()+ ":0"+endTimes[1].toString();

                } else endTime = endTimes[0].toString()+ ":"+endTimes[1].toString();

                const myobj = { appId: cur_app._id, startTime: cur_app.startTime, endTime: endTime, booked: cur_app.booked, date: cur_app.date }
                myRenderData.push(myobj);
                console.log("my render data is: ");
                console.log(myRenderData);
                setRenderData(myRenderData);

                setName("");
                setContact("");
                setStudentCode("");

                setIsLoading(false);
            }
    
        }
        dataInit();
    }, [manualReload]);

if (goTo404) {
    return <Navigate to="/404" replace />;
}

if (!(renderData.filter((d) => !d.booked).length === 0)) {
    return (
        <div className="w-full h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-md" >

                    <div className="mb-5">
                        <label>Please select your appointment
                            <select onChange={updateSelected} className="w-full px-4 py-2 border rounded">
                            <option selected value={null} >Please select an appointment</option>
                            {renderData.filter((d) => !d.booked).map((d, id) => (
                            <option value={d.appId} required={true}>{d.startTime} to {d.endTime} on {d.date.toString().split('T')[0]}</option>
                            ))}
                            </select> 
                        </label>
                    </div>

                    <div className="mb-5">
                        <label className="block text-gray-700 mb-2">
                        Name <input className="w-full px-4 py-2 border rounded" name="name" value={name} required={true} onChange={updateName} />
                        </label>
                    </div>


                    <div className="mb-5">
                        <label className="block text-gray-700">
                        <div className="flex flex-row">Student Code &nbsp;<i className="block text-gray-600">(opt.) </i></div>
                        <input className="w-full px-4 py-2 border rounded" name="studentCode" value={studentCode} onChange={updateStudentCode} />
                        </label>
                    </div>

                    <div className="mb-5">
                        <label className="block text-gray-700">
                            <div className="flex flex-row">Contact &nbsp;<i className="block text-gray-600">(opt.) </i></div>
                         <input className="w-full px-4 py-2 border rounded" name="contact" value={contact} onChange={updateContact}/>
                        </label>
                    </div>

                    <div className="flex flex-col">
                        <div onClick={mySubmit} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-400">
                            Submit
                        </div>
                    </div>
                
                </div>

            </div>
        <Footer />
    </div>
    );
}
    else return (
        <div className="w-full h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                
            <p className="block text-gray-700">No available appointments at this time. They have all been taken or the appointment has passed. Please select another hour. </p>

            </div>
        <Footer />
    </div>
        
    );
}