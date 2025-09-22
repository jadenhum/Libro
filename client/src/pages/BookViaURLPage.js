
import { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";

import { fetchMeetingInfo, returnFirstGoodIndex } from "../util/fetchMeetingInfo";
import { UrlBookingCalendar } from "../components/UrlBookingCalendar";
import { initAppointmentData } from "../util/initAppointmentData";
import { getBookingFromUrl } from "../util/getBookingFromUrl";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BookViaURLPage = () => {

  const [myloading, setMyLoading] = useState(true);
  const [meetingData, setMeetingData] = useState("tree");
  const [meetingId, setMeetingId] = useState(null);
  const { url } = useParams();

  const navigate = useNavigate();
  function goToAlternateBooking() {
    navigate("/book/requestAltBooking/"+meetingId);
  }

  useEffect(() => {
    const getData = async () => {

      console.log(url);
      var meeting = await getBookingFromUrl(url);

      if (meeting === 404 || meeting === 500) {
        setMeetingData("bad");
        setMyLoading(false);
        return;
      }

      setMeetingId(meeting[0]._id);

      await initAppointmentData(meeting[0]._id);
      
      
      var mydata = await fetchMeetingInfo(meeting[0]._id);

      console.log("my-data is");
      console.log(mydata);

      setMyLoading(false);
      setMeetingData(mydata);      

  };
    getData();

  }, []);

  
  //in case still loading, safeguard against loading before db responds
  if (myloading) {
    return <p>Loading</p>
  }
  //if could not find data for meeting, redirect to 404 not found
  if (((meetingData === "bad"))) {
    return (  
      <Navigate to="/404" replace />
    );
  }

  //main page
  else {
    return (
      <div className="w-full h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
          <UrlBookingCalendar apps={meetingData}  meetingId={meetingId} />
        </div>
        <Footer />
      </div>
  );}
};

export default BookViaURLPage;
