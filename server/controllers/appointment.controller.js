import Appointment from "../models/appointment.model.js";
import Booking from "../models/booking.model.js";

export const createAppointmentsFromBooking = async (req, res) => {

    const bookingId  = req.body;
  
    try {
      const mybooking = await Booking.findById(bookingId.meetingId);
  
      if (!mybooking) {
        console.log("pee0");
        res.status(404).json({ message: 'booking not found' });
      } else {
        const mybookingobj = mybooking.toObject();
        const type = mybookingobj.type;
        
        if (type === "recurring") {
            if ( await recurringCreateAppointments(mybooking, res) === 200) {
                console.log("pee1");
                res.status(200).json({message: "all appointments created"});
            } else {
                res.status(400).json({ message: 'bad request' });
            }
                
        } 
        else if (type === "equipment") {
            if (await equipmentBookings(mybooking) === 200) {
                res.status(200).json({message: "all appointments created"});
            } else {
                res.status(400).json({ message: 'bad request' });
            }
          
        }
        else if (type === "one-time") {
            if (await equipmentBookings(mybooking) === 200) {
                console.log("pee3")
                res.status(200).json({message: "all appointments created"});
            }
            else 
            {
                console.log("pee4");
                res.status(400).json({ message: 'bad request' });
            }
        }
  
        else res.status(400).json({ message: 'bad booking type' });
      }
    } catch (error ){
        console.log(error);
        console.log("pee6");
       res.status(500).json({ message: 'server error' });
    }
  }
  
  const recurringCreateAppointments = async (mybooking, res) => {
    const mybookingid = mybooking._id;
    const startDate = new Date(mybooking["startDate"]);
    const endDate = new Date(mybooking["endDate"]);
    const startTime = (mybooking["startTime"].split(":")).map((d) => Number(d));
    const endTime = (mybooking["endTime"].split(":")).map((d) => Number(d));
    const appDuration = mybooking["appointmentDuration"];
    var daysOfWeek = mybooking["daysOfWeek"];

    startDate.setHours(startDate.getHours()+5);
    endDate.setHours(endDate.getHours()+5);
    console.log("start date is:")
    console.log(startDate);
    endDate.setMinutes(0);

    var meetinglength = 0;

    if (endTime[1] >= startTime[1]) 
        meetinglength = (endTime[0] - startTime[0])*60 + endTime[1] - startTime[1];
    else 
        meetinglength = (endTime[0] - startTime[0])*60 + (-startTime[1]) + endTime[1];

    var appointmentsPerMeetingSlot = meetinglength / appDuration;

    var appointment_days = [];
    var counting_Date = structuredClone(startDate);
    var appointment_slots = [];

    while ((counting_Date <=  endDate)){
        var cur_day_of_week = counting_Date.getDay();
        var cur_day = structuredClone(counting_Date);


        //if not a match of one of the days
        if (daysOfWeek.indexOf(cur_day_of_week) !== -1) {
            appointment_days.push(cur_day);
        }

        counting_Date.setDate(counting_Date.getDate() + 1);
    }

    
    console.log(appointment_days);

    var cur_hour = startTime[0];
    var cur_min = startTime[1];

    for (var i = 0; i < Math.floor(appointmentsPerMeetingSlot); i++) {
        var cur_string;
        if (cur_min < 10) {
            cur_string = cur_hour.toString()+":0"+cur_min.toString();
        } else cur_string = cur_hour.toString()+":"+cur_min.toString();

        var next_hour;
        var next_min;

        if (cur_min + appDuration >= 60) {
            next_hour = cur_hour+1;
            next_min = (cur_min + appDuration) % 60;
        } else {
            next_min = cur_min + appDuration;
            next_hour = cur_hour;
        }
        var end_string;
        if (next_min < 10) 
            end_string = next_hour.toString()+":0"+next_min.toString();
        else 
            end_string = next_hour.toString()+":"+next_min.toString();

        cur_hour = next_hour;
        cur_min = next_min;
        
        appointment_slots.push({startTime: cur_string, endTime: end_string});

    }


    for (var i = 0; i < appointment_days.length; i++) {
        for (var j = 0; j < appointment_slots.length; j++) {
            try {
                
            var update = {
                bookingId: mybookingid,
                startTime: appointment_slots[j].startTime,
                endTime: appointment_slots[j].endTime,
                date: appointment_days[i],
                appointmentDuration: appDuration,
                multipleAtOnce: false,
                booked: false,
                reserverIdentifier: "",
                studentCode: "",
                reserverContact: "", 
            }

            var checkIfexists = {bookingId: mybookingid, startTime: appointment_slots[j].startTime,
                endTime: appointment_slots[j].endTime, date: appointment_days[i]}

            var options = { upsert: true, new: true}

            const thebooking = await Appointment.exists(checkIfexists)
            if (thebooking) {

            } else {
                await Appointment.findOneAndUpdate(update, {}, options);
            }

            } catch (error) {
                return 500
            }
        }
    }

    return 200;
    
}

const equipmentBookings = async(mybooking) => {
    const mybookingid = mybooking._id;
    const startDate = new Date(mybooking["startDate"]);
    const endDate = new Date(mybooking["endDate"]);
    const startTime = (mybooking["startTime"].split(":")).map((d) => Number(d));
    const endTime = (mybooking["endTime"].split(":")).map((d) => Number(d));
    const appDuration = mybooking["appointmentDuration"];
    var daysOfWeek = [0,1,2,3,4,5,6];

    startDate.setHours(startDate.getHours()+5);
    endDate.setHours(endDate.getHours()+5);
    endDate.setMinutes(0);

    var meetinglength = 0;

    if (endTime[1] >= startTime[1]) 
        meetinglength = (endTime[0] - startTime[0])*60 + endTime[1] - startTime[1];
    else 
        meetinglength = (endTime[0] - startTime[0])*60 + (-startTime[1]) + endTime[1];

    var appointmentsPerMeetingSlot = meetinglength / appDuration;

    var appointment_days = [];
    var counting_Date = structuredClone(startDate);
    var appointment_slots = [];

    while ((counting_Date <= endDate)){
        var cur_day_of_week = counting_Date.getDay();
        var cur_day = structuredClone(counting_Date);


        //if not a match of one of the days
        if (daysOfWeek.indexOf(cur_day_of_week) !== -1) {
            appointment_days.push(cur_day);
        }

        counting_Date.setDate(counting_Date.getDate() + 1);
    }

    var cur_hour = startTime[0];
    var cur_min = startTime[1];

    console.log(appointment_days);

    for (var i = 0; i < Math.floor(appointmentsPerMeetingSlot); i++) {
        var cur_string;
        if (cur_min < 10) {
            cur_string = cur_hour.toString()+":0"+cur_min.toString();
        } else cur_string = cur_hour.toString()+":"+cur_min.toString();

        var next_hour;
        var next_min;

        if (cur_min + appDuration >= 60) {
            next_hour = cur_hour+1;
            next_min = (cur_min + appDuration) % 60;
        } else {
            next_min = cur_min + appDuration;
            next_hour = cur_hour;
        }
        var end_string;
        if (next_min < 10) 
            end_string = next_hour.toString()+":0"+next_min.toString();
        else 
            end_string = next_hour.toString()+":"+next_min.toString();

        cur_hour = next_hour;
        cur_min = next_min;
        
        appointment_slots.push({startTime: cur_string, endTime: end_string});

    }


    for (var i = 0; i < appointment_days.length; i++) {
        for (var j = 0; j < appointment_slots.length; j++) {
            try {
                
            var update = {
                bookingId: mybookingid,
                startTime: appointment_slots[j].startTime,
                endTime: appointment_slots[j].endTime,
                date: appointment_days[i],
                appointmentDuration: appDuration,
                multipleAtOnce: false,
                booked: false,
                reserverIdentifier: "",
                studentCode: "",
                reserverContact: "", 
            }
            var checkIfexists = {bookingId: mybookingid, startTime: appointment_slots[j].startTime,
                endTime: appointment_slots[j].endTime, date: appointment_days[i]}

            var options = { upsert: true, new: true}

            const thebooking = await Appointment.exists(checkIfexists)
            if (thebooking) {

            } else {
                await Appointment.findOneAndUpdate(update, {}, options);
            }

            } catch (error) {
                return 500
            }
        }
    }

    return 200;
    
}

const oneTimeCreateAppointments = async (mybooking, res) => {
    const mybookingid = mybooking._id;
    var date = mybooking["date"];
    const startTime = (mybooking["startTime"].split(":")).map((d) => Number(d));
    const endTime = (mybooking["endTime"].split(":")).map((d) => Number(d));
    const appDuration = mybooking["appointmentDuration"];

    if (date.getHours() != 0) {
        date.setHours(0);
        date.setHours(date.getHours() -5);
    }
    
    date.setMinutes(0);
    
    var meetinglength = 0;

    if (endTime[1] >= startTime[1]) 
        meetinglength = (endTime[0] - startTime[0])*60 + endTime[1] - startTime[1];
    else 
        meetinglength = (endTime[0] - startTime[0])*60 + (-startTime[1]) + endTime[1];

    var appointmentsPerMeetingSlot = meetinglength / appDuration;
    var appointment_slots = [];

    var cur_hour = startTime[0];
    var cur_min = startTime[1];
    
    for (var i = 0; i < Math.floor(appointmentsPerMeetingSlot); i++) {
        var cur_string;
        if (cur_min < 10) {
            cur_string = cur_hour.toString()+":0"+cur_min.toString();
        } else cur_string = cur_hour.toString()+":"+cur_min.toString();

        var next_hour;
        var next_min;

        if (cur_min + appDuration >= 60) {
            next_hour = cur_hour+1;
            next_min = (cur_min + appDuration) % 60;
        } else {
            next_min = cur_min + appDuration;
            next_hour = cur_hour;
        }
        var end_string;
        if (next_min < 10) 
            end_string = next_hour.toString()+":0"+next_min.toString();
        else 
            end_string = next_hour.toString()+":"+next_min.toString();

        cur_hour = next_hour;
        cur_min = next_min;
        
        appointment_slots.push({startTime: cur_string, endTime: end_string});

    }


    for (var j = 0; j < appointment_slots.length; j++) {
        try {

            var update = {
                bookingId: mybookingid,
                startTime: appointment_slots[j].startTime,
                endTime: appointment_slots[j].endTime,
                date: date,
                appointmentDuration: appDuration,
                multipleAtOnce: false,
                booked: false,
                reserverIdentifier: "",
                studentCode: "",
                reserverContact: "", 
            }

            var checkIfexists = {bookingId: mybookingid, startTime: appointment_slots[j].startTime,
                endTime: appointment_slots[j].endTime, date: date,}

            var options = { upsert: true, new: true}

            const thebooking = await Appointment.exists(checkIfexists)
            if (thebooking) {

            } else {
                await Appointment.findOneAndUpdate(update, {}, options);
            }

           
        } catch (error) {
            console.log(error);
            return 500;
        }
    }

    return 200;

}

export const createAppointment = async (req, res) => {

}

export const getAppoinmentsFromBooking = async (req, res) => {
    console.log("hello i am here");
    const { bookingId } = req.params;
  
    try {
      const appointments = await Appointment.find({ bookingId: bookingId });
      res.status(200).json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "Failed to retrieve appointments." });
    }
}

export const findIfAppointmentsAtHourInBooking = async (req, res) => {
    const data = req.body;
    const bookingId = data.bookingId;
    const date = data.date;
    const mydate = new Date(date)
    mydate.setHours(mydate.getHours()+5);
    const hour = data.hour;
    console.log("iam here");
    console.log(bookingId);
    console.log(date);
    console.log(hour);

    try {
        var results = await Appointment.find({bookingId: bookingId, startTime: {  $regex: `^${hour.toString()}:`}});

        if (results.length === 0)  {
            console.log("!!!!!!!!!!!!!!!!!!!");
            res.status(400).json({ message: 'could not find any appointments' });

        } else {
        
        console.log(mydate);
        console.log(mydate.getDate());
        console.log(results[0].date.getDate());

        var my_return = []
        for (var i = 0; i < results.length; i++){
            var cur_item = results[i];
            var cur_item_date_real = structuredClone(cur_item.date);
            cur_item_date_real.setHours(cur_item_date_real.getHours()+5);


            if (cur_item_date_real.getDate() == mydate.getDate()) {
                console.log("shoot me in the head now!!!!!");
                my_return.push(cur_item);
            }
        }
            
        console.log(my_return);
        res.status(200).json(my_return);
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error'});
    }
}

export const reserveBooking = async (req, res) => {

    console.log("helloooooo")
    const data = req.body;
    const appId = data.appId;
    const reserverIdentifier = data.reserverIdentifier;
    const studentCode = data.studentCode;
    const reserverContact = data.reserverContact;

    try {
        const appointmentToUpdate = await Appointment.findById(appId);

        if (!appointmentToUpdate) {
            res.status(400).json({ message: 'appointment does not exist'});
        } else {
            const appointmentObj = appointmentToUpdate.toObject();
            console.log(appointmentObj);
            const isBooked = appointmentObj.booked;
            console.log(isBooked);
    
            if (isBooked) {
                res.status(400).json({ message: 'appointment is already booked'});
            } else {
                
                await Appointment.findOneAndUpdate({_id: appId}, {$set: {booked: true, reserverContact: reserverContact, reserverIdentifier: reserverIdentifier, studentCode: studentCode }});
                console.log("appointment saved!");
                res.status(200).json({ message: 'update good'});
            }

        }



    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error'});
    }
}

export const getStudentAppointments = async (req, res) => {
    const { studentCode } = req.params;
    try {
        const appointments = await Appointment.find({ 
            studentCode: studentCode,
            booked: true 
        }).populate('bookingId');

        if (!appointments) {
            return res.status(404).json({ message: 'no appointments found' });
        }
        res.status(200).json({ appointments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'server error' });
    }
};
