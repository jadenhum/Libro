
import config from "../config/config";
import apiRequest from "./api";

const reserveAppointment = async (app_id, reserverIdentifier, studentCode, reserverContact) => {
  const url = config.reserveAppointment(app_id);
  const method = "POST";
  const myobj = {
    appId: app_id,
    reserverIdentifier: reserverIdentifier,
    studentCode: studentCode,
    reserverContact: reserverContact,
  };

  try {
    const response = await apiRequest(url, {
      method,
      body: JSON.stringify(myobj),
    });

    const data = await response.json();

    if (response.ok) {
      if (response.status === 200) {
        return true;
      } else {
        console.log("error: " + response.status);
        return false;
      }
    } else {
      if (response.status === 400) {
        console.log("error: " + response.status);
        return false;
      } else {
        console.log("error: " + response.status);
        return false;
      }
    }
  } catch (error) {
    return false;
  }
};

export { reserveAppointment };
