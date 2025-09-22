
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
    },
    startTime: {
        type: String,
        required: true,
      },
    endTime: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    appointmentDuration: {
        type: Number,
        required: true,
    },
    multipleAtOnce: {
        type: Boolean,
        required: true,
    },
    booked: {
        type: Boolean,
        required: true,
    },
    reserverIdentifier: {
        type: String,
        required: true,
    },
    studentCode: {
        type: String,
        required: false,
    },
    reserverContact: {
        type: String,
        required: false,
    },
});

const Appointment = mongoose.model(
    "Appointment",
    appointmentSchema
);
export default Appointment;