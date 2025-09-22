
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getRelativeMonday,
  get1WeekEarlier,
  get1WeekLater,
  toStringCustom,
  addDays,
} from "../util/dateUtils";
import { checkIfAppInWeek } from "../util/fetchMeetingInfo";
import { getApppointmentsAtHour } from "../util/getAppointmentsAtHour";
import {
  LeftPointngTriangle,
  RightPointingTriangle,
} from "../assets/triangleIcons";
import "../styles/aprilsStyles.css";

export function UrlBookingCalendar({ apps, meetingId }) {
  const [curMonday, setCurMonday] = useState(getRelativeMonday(new Date()));
  const [isAppsThisWeek, setIsAppsThisWeek] = useState(false);
  const [loading, setLoading] = useState(true);
  const [renderData, setRenderData] = useState(Array(84).fill(false));
  const [forceRender, setForceRender] = useState(false);
  const [automaticMode, SetAutomaticMode] = useState(true);

  const navigate = useNavigate();

  const increaseWeek = () => {
    setCurMonday(get1WeekLater(curMonday));
    SetAutomaticMode(false);
    setLoading(true);
    setForceRender(!forceRender);
  };

  const decreaseWeek = () => {
    setCurMonday(get1WeekEarlier(curMonday));
    setLoading(true);
    SetAutomaticMode(false);
    setForceRender(!forceRender);
  };

  function goToAlternateBooking() {
    navigate("/book/requestAltBooking/" + meetingId);
  }

  const myCallback = (renderBool, day, hour) => {
    if (renderBool) {
      const day_off_set = day - 1;
      const url_day = curMonday.getDate() + day_off_set;
      const url_hour = 8 + hour;
      const my_date = addDays(curMonday, day_off_set);
      const my_month = my_date.getMonth();

      navigate(
        "/book/" +
          meetingId +
          "/" +
          my_month.toString() +
          "-" +
          url_day.toString() +
          "-" +
          url_hour.toString()
      );
    } else return;
  };

  const mytitles_real = [1, 2, 3, 4, 5, 6, 7].map((d) => [
    d.toString() + ":8:00",
    d.toString() + ":9:00",
    d.toString() + ":10:00",
    d.toString() + ":11:00",
    d.toString() + ":12:00",
    d.toString() + ":13:00",
    d.toString() + ":14:00",
    d.toString() + ":15:00",
    d.toString() + ":16:00",
    d.toString() + ":17:00",
    d.toString() + ":18:00",
    d.toString() + ":19:00",
  ]);

  useEffect(() => {
    const myrender = async () => {
      var thisWeekApps = [];
      var thisWeek = false;

      const isInWeekArr = apps.map((d) => checkIfAppInWeek(d, curMonday));
      console.log("isInWeek array: ");
      console.log(isInWeekArr);
      console.log(curMonday);

      for (var i = 0; i < apps.length; i++) {
        if (isInWeekArr[i]) {
          thisWeekApps.push(apps[i]);
          setIsAppsThisWeek(true);
          thisWeek = true;
        }
      }

      console.log(!thisWeek && automaticMode);

      console.log(curMonday);
      console.log(thisWeekApps);

      var daysThisWeek = [];
      for (var i = 0; i < 7; i++) {
        var cur_day = addDays(curMonday, i);
        daysThisWeek.push(cur_day);
      }
      console.log(daysThisWeek);

      var appTimes = Array(7).fill({ startHour: null, endHour: null });
      console.log(thisWeekApps.length);
      console.log(appTimes);

      for (var i = 0; i < thisWeekApps.length; i++) {
        var cur_app_date = addDays(new Date(thisWeekApps[i].date), 0);
        var cur_app_startTime = thisWeekApps[i].startTime
          .split(":")
          .map((d) => Number(d));

        for (var j = 0; j < 7; j++) {
          var cur_day = daysThisWeek[j];

          if (
            cur_day.getDate() === cur_app_date.getDate() &&
            cur_day.getMonth() === cur_app_date.getMonth()
          ) {
            console.log("j is: ");
            console.log(j);
            console.log(cur_day);
            console.log(cur_app_date);

            if (appTimes[j].startHour === null) {
              appTimes[j] = {
                startHour: cur_app_startTime[0],
                endHour: cur_app_startTime[0],
              };
            } else {
              if (appTimes[j].endHour < cur_app_startTime[0])
                appTimes[j] = {
                  startHour: appTimes[j].startHour,
                  endHour: cur_app_startTime[0],
                };
            }
          }
        }
      }

      var my_render_arr = mytitles_real.flat().map((d) => false);

      for (var i = 0; i < appTimes.length; i++) {
        var curStartHour = appTimes[i].startHour;
        var curEndHour = appTimes[i].endHour;

        if (curEndHour === null || curStartHour === null) continue;

        for (var j = curStartHour; j < curEndHour + 1; j++) {
          my_render_arr[i * 12 + j - 8] = true;
        }
      }

      setRenderData(my_render_arr);
      console.log(my_render_arr);
      setLoading(false);
    };

    myrender();
  }, [forceRender]);

  if (loading) return <p></p>;
  else
    return (
      <div className="flex flex-row justify-center w-full">
        <div className="mr-5  content-center" onClick={decreaseWeek}>
          <LeftPointngTriangle />
        </div>

        <div className="flex flex-col">
          {[
            "",
            "8:00",
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
          ].map((d) => (
            <div className="h-12 content-start mr-5">
              <p className="block text-gray-700 mb-2">{d}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row mb-1 justify-space-evenly">
            {[
              "monday",
              "tuesday",
              "wednesday",
              "thursday",
              "friday",
              "saturday",
              "sunday",
            ].map((d, id) => (
              <div className="block text-gray-700 mb-2 h-12 w-36 content-end justify-center">
                <p className="block text-gray-700 mb-2 justify-center content-end text-center">
                  {toStringCustom(addDays(curMonday, id))}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-row border-t-2 border-gray-400">
            <div className="border-2 border-t-0 border-b-0 border-r-0 w-36 border-gray-400">
              {renderData.slice(0, 12).map((d, id) => (
                <div
                  onClick={() => myCallback(d, 1, id)}
                  className={
                    d
                      ? "greentimebox h-12 border-b-2 border-gray-400"
                      : "h-12 timebox border-b-2 border-gray-400"
                  }
                ></div>
              ))}
            </div>

            <div className="border-2 border-t-0 border-b-0 border-r-0 w-36 border-gray-400">
              {renderData.slice(12, 24).map((d, id) => (
                <div
                  onClick={() => myCallback(d, 2, id)}
                  className={
                    d
                      ? "h-12 greentimebox border-b-2 border-gray-400"
                      : " h-12 timebox border-b-2 border-gray-400"
                  }
                ></div>
              ))}
            </div>

            <div className="border-2 w-36 border-t-0 border-b-0  border-r-0 border-gray-400">
              {renderData.slice(24, 36).map((d, id) => (
                <div
                  onClick={() => myCallback(d, 3, id)}
                  className={
                    d
                      ? "h-12 greentimebox border-b-2 border-gray-400"
                      : "h-12 timebox border-b-2 border-gray-400"
                  }
                ></div>
              ))}
            </div>

            <div className="border-2 w-36 border-t-0 border-r-0 border-b-0 border-gray-400">
              {renderData.slice(36, 48).map((d, id) => (
                <div
                  onClick={() => myCallback(d, 4, id)}
                  className={
                    d
                      ? "h-12 greentimebox border-b-2 border-gray-400"
                      : "h-12 timebox border-b-2 border-gray-400"
                  }
                ></div>
              ))}
            </div>

            <div className="border-2 w-36 border-t-0 border-r-0 border-b-0 border-gray-400">
              {renderData.slice(48, 60).map((d, id) => (
                <div
                  onClick={() => myCallback(d, 5, id)}
                  className={
                    d
                      ? "h-12 greentimebox border-b-2 border-gray-400"
                      : "h-12 timebox border-b-2 border-gray-400"
                  }
                ></div>
              ))}
            </div>

            <div className="border-2 w-36 border-t-0 border-r-0 border-b-0 border-gray-400">
              {renderData.slice(60, 72).map((d, id) => (
                <div
                  onClick={() => myCallback(d, 6, id)}
                  className={
                    d
                      ? "h-12 greentimebox border-b-2 border-gray-400"
                      : "h-12 timebox border-b-2 border-gray-400"
                  }
                ></div>
              ))}
            </div>

            <div className="border-2 border-t-0 w-36 border-b-0 border-gray-400">
              {renderData.slice(72, 84).map((d, id) => (
                <div
                  onClick={() => myCallback(d, 7, id)}
                  className={
                    d
                      ? "h-12 greentimebox border-b-2 border-gray-400"
                      : "h-12 timebox border-b-2 border-gray-400"
                  }
                ></div>
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <div
              onClick={goToAlternateBooking}
              className="px-4 py-2 buttoncolor w-1/3 mt-5 text-white rounded"
            >
              <p className="text-center">Book Appointment at Another Time</p>
            </div>
          </div>
        </div>

        <div className="ml-5 content-center" onClick={increaseWeek}>
          <RightPointingTriangle />
        </div>
      </div>
    );
}
