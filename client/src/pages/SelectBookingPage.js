
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import config from "../config/config";

const SelectBookingPage = () => {

    const [bookingLink, setBookingLink] = useState("");
    const navigate = useNavigate();

    const updateBookingLink = (e) => {
        setBookingLink(e.target.value);
    }

    const goToBooking = () => {
        const re1 = /book/;
        const re2 = /libro\.works/;


        if (bookingLink === "" || re1.test(bookingLink) === false || re2.test(bookingLink) === false) {
            window.alert("Please enter a valid booking url");
        } else {
            const urlparts = bookingLink.split("/");
            var myindex = 0;
            for (var i = 0; i < urlparts.length; i++) {

                if (re1.test(urlparts[i])) {
                    myindex = i+1;
                    break;
                }
            }

            if  (myindex === 0 || myindex >= urlparts.length) {
                window.alert("Please enter a valid booking url");
            } else {
                navigate("/book/"+urlparts[myindex])
            }
            
        }
    }
    return (
        <div className="w-full h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            
            <div className="bg-white p-6 rounded shadow-lg mx-5" >

            <div className="mb-5">
                        <label className="block text-gray-700">
                        <div className="flex flex-row">Booking Link: </div>
                        <input className="w-full px-4 py-2 border rounded" name="bookingLink" value={bookingLink} onChange={updateBookingLink} />
                        </label>
                    </div>


                <div className="flex space-x-4 justify-between mt-5">

                    <div
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-gray-400"
                        onClick={goToBooking}
                    > Go to booking
                    </div>
                </div>
                
            </div>
        </div>
    <Footer />
</div>
    );
}

export { SelectBookingPage };