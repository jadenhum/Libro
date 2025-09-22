
import config from "../config/config";
import apiRequest from "./api";

async function fetchMeetingInfo(meetingId) {
  const url = config.appointmentsByBookingId(meetingId);
  const method = "POST";
  const myobj = { meetingId };

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
        return "bad1";
      }
    } else {
      if (response.status === 404 || response.status === 500) {
        console.log(response.status);
        return "bad2";
      }
    }
  } catch (error) {
    console.log(error);
    return "bad3";
  }
}

const returnFirstGoodIndex = (appointments) => {
  const cur_date = new Date();
  const cur_day_of_month = cur_date.getDate();
  const cur_date_month = cur_date.getMonth();

  for (var i = 0; i < appointments.length; i++) {
    var cur_appointment = appointments[i];

    if (cur_appointment["date"].getMonth() > cur_date_month) return i;
    if (cur_appointment["date"].getMonth() < cur_date_month) continue;
    if (cur_appointment["date"].getDate() >= cur_day_of_month) return i;
  }

  //if never returnd
  return -1;
};

const checkIfAppInWeek = (appointment, startingMonday) => {
  const cur_year = startingMonday.getYear();
  var month_lengths;

  if (cur_year % 4) {
    month_lengths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  } else month_lengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const day_of_month_ref = startingMonday.getDate();
  const day_of_month_app = new Date(appointment["date"]).getDate();
  const month_ref = startingMonday.getMonth();
  const month_app = new Date(appointment["date"]).getMonth();

  if (month_ref > month_app) return false;

  if (month_ref === month_app && day_of_month_ref + 7 > day_of_month_app) return true;

  if (month_ref + 1 < month_app) return false;

  const length_ref_month = month_lengths[month_ref];
  const end_month_diff = length_ref_month - day_of_month_ref;

  if (day_of_month_app + end_month_diff > 7) return false;
  else return true;
};

export { fetchMeetingInfo, returnFirstGoodIndex, checkIfAppInWeek };
