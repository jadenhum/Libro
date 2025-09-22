
import Booking from "../models/booking.model.js";
import Member from "../models/member.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const createBooking = async (req, res) => {
  const {
    title,
    description,
    type,
    date,
    startDate,
    endDate,
    startTime,
    endTime,
    daysOfWeek,
    appointmentDuration,
    URL,
  } = req.body;

  try {
    const token = req.headers.authorization.split("=")[1];
    const memberId = jwt.verify(token, process.env.JWT_SECRET).id;

    const newBooking = new Booking({
      member: memberId,
      title,
      description,
      type,
      date,
      startDate: type === "one-time" ? date : startDate,
      startTime,
      endDate: type === "one-time" ? date : endDate,
      endTime,
      daysOfWeek: type === "recurring" ? daysOfWeek : undefined,
      appointmentDuration,
      URL,
    });

    await newBooking.save();

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingsByMember = async (req, res) => {
  try {
    const token = req.headers.authorization.split("=")[1];
    const memberId = jwt.verify(token, process.env.JWT_SECRET).id;

    const bookings = await Booking.find({ member: memberId }).populate(
      "member"
    );
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  const {
    title,
    description,
    type,
    startDate,
    startTime,
    endDate,
    endTime,
    daysOfWeek,
    appointmentDuration,
    URL,
  } = req.body;

  try {
    const token = req.headers.authorization.split("=")[1];
    const memberId = jwt.verify(token, process.env.JWT_SECRET).id;

    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: bookingId, member: memberId },
      {
        title,
        description,
        type,
        startDate,
        startTime,
        endDate,
        endTime,
        daysOfWeek: type === "recurring" ? daysOfWeek : undefined,
        appointmentDuration,
        URL,
      },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const token = req.headers.authorization.split("=")[1];
    const memberId = jwt.verify(token, process.env.JWT_SECRET).id;

    const booking = await Booking.findOneAndDelete({
      _id: bookingId,
      member: memberId,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingById = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId).populate("member");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const altBookingRequest = async (req, res) => {
  const { bookingID, date, startTime, endTime } = req.body;

  try {
    // Query the database to find a the memberID of the bookingID
    const booking = await Booking.findById(bookingID);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    // Find the member who owns the booking and get their email
    const member = await Member.findById(booking.member.toString());
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASSWORD },
    });

    //Send the email to the member
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: member.email,
      subject: `Alternate Booking Request for: ${booking.title}`,
      text: `Hello! A user has requested an alternate booking time for your booking titled "${
        booking.title
      }" on ${new Date(
        date
      ).toLocaleDateString()} from ${startTime} to ${endTime}.\n\n You can respond to this request by providing an alternate booking through our website.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ email: member.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookingByUrl = async (req, res) => {
  const data = req.body;
  const url = data.myurl;

  try {
    const booking = await Booking.find({ URL: { $regex: `${url}$` } });
    const toObj = booking[0].toObject();
    console.log(toObj);
    if (booking.length === 0) {
      console.log("could not find booking");
      res.status(404).json({ message: "Booking not found" });
    } else {
      console.log("good!!");
      console.log(booking);
      res.status(200).json(booking);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
