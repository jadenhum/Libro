
import config from "../config/config";
import apiRequest from "./api";

const initAppointmentData = async (meetingId) => {
  const url = config.appointmentCreate(meetingId);
  const method = "POST";
  const myobj = { meetingId: meetingId };

  try {
    const response = await apiRequest(url, {
      method,
      body: JSON.stringify(myobj),
    });

    const data = await response.json();

    if (response.ok) {
      if (response.status === 200) {
        console.log("yaaaaay yippeeeee");
        return data;
      } else {
        console.log("error: " + response.status);
        return "bad";
      }
    } else {
      if (response.status === 404 || response.status === 500) {
        return "bad";
      }
    }
  } catch (error) {
  } finally {
  }
};

export { initAppointmentData };
