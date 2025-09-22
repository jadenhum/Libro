
import config from "../config/config";
import apiRequest from "./api";

async function getApppointmentsAtHour(meetingId, hour, date) {
  const url = config.appointmentsByHour(meetingId, hour.toString());
  const method = "POST";
  const myobj = { bookingId: meetingId, hour: hour, date: date };

  try {
    const response = await apiRequest(url, {
      method,
      body: JSON.stringify(myobj),
    });

    const data = await response.json();

    if (response.ok) {
      if (response.status === 200) {
        console.log(data);
        return data;
      } else {
        console.log("error: " + response.status);
        return 404;
      }
    } else {
      if (response.status === 400) {
        return 400;
      }
      if (response.status === 404) {
        return 404;
      } else {
        console.log("error: " + response.status);
        return 404;
      }
    }
  } catch (error) {
    return 500;
  }
}

export { getApppointmentsAtHour };
